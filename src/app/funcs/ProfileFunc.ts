import { AxiosInterceptor } from "@/interceptor/interceptor";
import { Doctor } from "@/lib/interfaces/Doctor";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";

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

export async function updatePatient(
  auth: DoctorPatient,
  data: DoctorPatient
): Promise<DoctorPatient | null> {
  try {
    const url = `/patients/phone/${auth.userDetails?.phone}`;
    const res = await AxiosInterceptor.put(url, data);
    return res.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    return null;
  }
}

export async function updateDoctor(
  auth: DoctorPatient,
  data: DoctorPatient
): Promise<DoctorPatient | null> {
  try {
    const url = `/doctors/${auth.code}`;
    const res = await AxiosInterceptor.put(url, data);
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

export async function getPatientDoctors(phone: string): Promise<Doctor[]> {
  try {
    const patientUrl = `/patients/phone/${phone}`;
    const patientRes = await AxiosInterceptor.get(patientUrl);
    const patientData = patientRes.data;

    if (!patientData.drCodes || patientData.drCodes.length === 0) {
      console.log("No doctor codes found for patient");
      return [];
    }

    const doctorPromises = patientData.drCodes.map(
      async (doctorCode: string) => {
        try {
          return await getDoctor(doctorCode);
        } catch (doctorError) {
          console.error(`Error fetching doctor ${doctorCode}:`, doctorError);
          return null;
        }
      }
    );

    const doctors = (await Promise.all(doctorPromises)).filter(
      Boolean
    ) as Doctor[];

    console.log("All doctors fetched:", doctors);
    return doctors;
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    return [];
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
    prognosis?: string;
    "medical-report"?: string;
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

    // Step 2: Fetch all doctor schedules in parallel
    const schedulePromises = patientData.drCodes.map(
      async (doctorCode: string) => {
        try {
          // Doctor details
          const doctorUrl = `/doctors/${doctorCode}`;
          const doctorRes = await AxiosInterceptor.get(doctorUrl);
          const doctorData = doctorRes.data;

          // Patient's diagnoses for this doctor
          const diagnosisUrl = `/doctors/${doctorCode}/patients/${auth.userDetails?.phone}/diagnosis`;
          const diagnosisRes = await AxiosInterceptor.get(diagnosisUrl);
          const diagnosisData = diagnosisRes.data;

          // Extract schedule & treatment
          const doctorSchedules =
            diagnosisData.diagnoses?.map((diag: any) => ({
              schedule: diag.schedule,
              medicalTreatment: diag["medical-treatment"],
              diagnosis: diag.diagnosis,
              prognosis: diag.prognosis,
              "medical-report": diag["medical-report"],
            })) || [];

          return {
            doctorName: doctorData.name,
            doctorProfession: doctorData.profession,
            doctorSpecialty: doctorData.specialty,
            doctorCode,
            schedules: doctorSchedules,
          } as PatientSchedule;
        } catch (doctorError) {
          console.error(
            `Error fetching data for doctor ${doctorCode}:`,
            doctorError
          );
          return null; // Skip failed doctors
        }
      }
    );

    const schedules = (await Promise.all(schedulePromises)).filter(
      (item): item is PatientSchedule => item !== null
    );

    console.log("Patient schedules:", schedules);
    return schedules;
  } catch (error) {
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
    const patientURL = `/doctors/${newDrCode}/patients/${phone}`;
    const res = await AxiosInterceptor.get(patientURL);
    console.log("Patient API response:", res.data);

    if (res.data && res.data.phone === phone) {
      const addDrCodeURL = `/patients/${phone}/drCodes`;
      const addDrCodeRes = await AxiosInterceptor.post(addDrCodeURL, null, {
        params: { doctor_code: newDrCode },
      });
      console.log("Add doctor code response:", addDrCodeRes.data);
      return addDrCodeRes.data;
    } else {
      console.log("You are not found in doctor's list");
      return null;
    }
  } catch (error) {
    console.log("Error in getCode:", error);
    return null;
  }
}

interface NewDoctor {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  profession: string;
  specialty: string;
}

export async function getAllDoctors(): Promise<NewDoctor[]> {
  try {
    const patientURL = `/doctors`;
    const res = await AxiosInterceptor.get(patientURL);
    const doctors = res.data.map((doc: NewDoctor, index: number) => ({
      id: String(index + 1),
      name: doc.name,
      code: doc.code,
      city: doc.city,
      country: doc.country,
      profession: doc.profession,
      specialty: doc.specialty,
    }));

    return doctors;
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    return [];
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
