import { AxiosInterceptor } from "@/interceptor/interceptor";
import { Doctor } from "@/lib/interfaces/Doctor";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";

// export async function getProfile(): Promise<DoctorPatient> {
// 	const auth = JSON.parse(localStorage.getItem("auth") || "{}");
// 	let code: string = "";
// 	let url: string = "";

// 	if (auth.role === "medical") {
// 		code = auth.code || "";
// 		url = "/doctors/";
// 	} else if (auth.role === "patient") {
// 		code = auth.userDetails?.phone || "";
// 		url = "/patients/";
// 	}
// 	const profile = AxiosInterceptor.get(url + code)
// 		.then((res) => {
// 			return res.data;
// 		})
// 		.catch((error) => console.log(error));
// 	return profile;
// }

export async function getProfile(
  auth: DoctorPatient
): Promise<DoctorPatient | null> {
  try {
    let url = "";

    if (auth.role === "medical") {
      url = `/doctors/${auth.code}`;
    } else if (auth.role === "patient") {
      url = `/patients/phone/${auth.userDetails?.phone}`;
    }
    const res = await AxiosInterceptor.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function getDoctor(code: string): Promise<Doctor | null> {
  try {
    let url = `/doctors/${code}`;
    const res = await AxiosInterceptor.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function getPatients(
  auth: DoctorPatient
): Promise<DoctorPatient[] | null> {
  try {
    const url = `/doctors/${auth.code}/patients`;
    const res = await AxiosInterceptor.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return null;
  }
}

export interface PatientSchedule {
  doctorName: string;
  doctorProfession: string;
  doctorSpecialty: string;
  doctorCode: string;
  schedules: Array<{
    schedule: string;
    medicalTreatment: string;
    diagnosis: string;
  }>;
}

export interface MedicalAppointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientAge: number;
  patientCountry: string;
  patientGender: string;
  patientProfession: string;
  diagnosis: string;
  medicalTreatment: string;
  schedule: string;
  complaint: string;
  prognosis?: string;
  medicalReport?: string;
}

export async function getPatientSchedule(
  auth: DoctorPatient
): Promise<PatientSchedule[] | null> {
  try {
    // Step 1: Get patient data using phone
    const patientUrl = `/patients/phone/${auth.userDetails?.phone}`;
    const patientRes = await AxiosInterceptor.get(patientUrl);
    const patientData = patientRes.data;

    if (!patientData.drCodes || patientData.drCodes.length === 0) {
      return [];
    }

    const schedules: PatientSchedule[] = [];

    // Step 2: Loop through each doctor code
    for (const doctorCode of patientData.drCodes) {
      try {
        // Step 3: Get doctor details
        const doctorUrl = `/doctors/${doctorCode}`;
        const doctorRes = await AxiosInterceptor.get(doctorUrl);
        const doctorData = doctorRes.data;

        // Step 4: Get patient's diagnoses for this doctor
        const diagnosisUrl = `/doctors/${doctorCode}/patients/${auth.userDetails?.phone}/diagnosis`;
        const diagnosisRes = await AxiosInterceptor.get(diagnosisUrl);
        const diagnosisData = diagnosisRes.data;

        // Step 5: Extract schedule and medical-treatment from diagnoses
        const doctorSchedules =
          diagnosisData.diagnoses?.map((diag: any) => ({
            schedule: diag.schedule,
            medicalTreatment: diag["medical-treatment"],
            diagnosis: diag.diagnosis,
          })) || [];

        // Create schedule object for this doctor
        const doctorSchedule: PatientSchedule = {
          doctorName: doctorData.name,
          doctorProfession: doctorData.profession,
          doctorSpecialty: doctorData.specialty,
          doctorCode: doctorCode,
          schedules: doctorSchedules,
        };

        schedules.push(doctorSchedule);
      } catch (doctorError) {
        console.error(
          `Error fetching data for doctor ${doctorCode}:`,
          doctorError
        );
        // Continue with other doctors even if one fails
      }
    }

    console.log("Patient schedules:", schedules);
    return schedules;
  } catch (error) {
    // If patient not found or endpoint missing, return empty list to avoid UI error
    if (
      typeof error === "object" &&
      error !== null &&
      (error as any).response &&
      (error as any).response.status === 404
    ) {
      console.warn(
        "Patient schedule endpoint returned 404. Returning empty list."
      );
      return [];
    }
    console.error("Error fetching patient schedule:", error);
    return null;
  }
}

export async function getMedicalSchedule(
  auth: DoctorPatient
): Promise<MedicalAppointment[] | null> {
  try {
    // Validate auth
    if (!auth || auth.role !== "medical" || !auth.code) {
      console.error("Invalid medical auth credentials");
      return null;
    }

    // Fetch patients for this doctor
    const patients = await getPatients(auth);
    if (!patients || !Array.isArray(patients)) {
      console.log("No patients found for doctor");
      return [];
    }

    // Process and validate patients
    const validPatients = patients
      .filter((p: any) => p && (p.id || p.name || p.phone))
      .map((p: any) => ({
        ...p,
        age: p.age ?? 0,
        country: p.country ?? "",
        gender: p.gender ?? "",
        profession: p.profession ?? "",
        cases: p.cases || [],
      })) as DoctorPatient[];

    // Build appointments from patient cases
    const allAppointments = validPatients.flatMap((patient) => {
      // Ensure patient has cases and they are valid
      if (!patient.cases || !Array.isArray(patient.cases)) {
        return [];
      }

      return patient.cases.flatMap((caseRecord) => {
        // Ensure caseRecord has diagnosis and it's valid
        if (
          !caseRecord ||
          !caseRecord.diagnosis ||
          !Array.isArray(caseRecord.diagnosis)
        ) {
          return [];
        }

        return caseRecord.diagnosis
          .map((diag, idx) => {
            // Ensure diagnosis entry is valid
            if (!diag || !diag.schedule) {
              return null;
            }

            return {
              id: `${patient.id || patient.phone}-${diag.schedule}-${idx}`, // safer unique ID
              patientName: patient.name || "Unknown",
              patientPhone: patient.phone || "",
              patientAge: patient.age || 0,
              patientCountry: patient.country || "",
              patientGender: patient.gender || "",
              patientProfession: patient.profession || "",
              diagnosis: diag.diagnosis || "",
              medicalTreatment: diag["medical-treatment"] || "",
              schedule: diag.schedule,
              complaint: diag.complaint || "",
              prognosis: diag.prognosis || "",
              medicalReport: diag["medical-report"] || "",
            };
          })
          .filter(
            (appointment): appointment is NonNullable<typeof appointment> =>
              appointment !== null
          ); // Remove null entries with proper typing
      });
    });

    // Sort by schedule
    allAppointments.sort(
      (a, b) => new Date(a.schedule).getTime() - new Date(b.schedule).getTime()
    );

    console.log("Medical appointments:", allAppointments);
    return allAppointments;
  } catch (error) {
    console.error("Error fetching medical schedule:", error);
    return null;
  }
}

export async function getCode(
  newDrCode: string,
  phone: string
): Promise<string | null> {
  try {
    try {
      const patientURL = `/doctors/${newDrCode}/patients/${phone}`;
      console.log(patientURL);
      const res = await AxiosInterceptor.get(patientURL);
      if (res.data.phone === phone) {
        try {
          const addDrCodeURL = `/patients/${phone}/drCodes`;
          const addDrCodeRes = await AxiosInterceptor.post(addDrCodeURL, null, {
            params: {
              doctor_code: newDrCode,
            },
          });
          return addDrCodeRes.data;
        } catch (error) {
          console.log("You are not found in doctor's list");
          return null;
        }
      }
    } catch (error) {
      console.log("You are not found in doctor's list");
      return null;
    }

    return null;
  } catch (error) {
    console.error("Error adding doctor code:", error);
    return null;
  }
}

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };

    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};
