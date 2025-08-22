import { AxiosInterceptor } from "@/interceptor/interceptor";
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

export async function getPatients(
  auth: DoctorPatient
): Promise<DoctorPatient[] | null> {
  try {
    const url = `/doctors/${auth.code}/patients`;
    const res = await AxiosInterceptor.get(url);
    console.log(res.data);
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

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Use a more consistent formatting approach
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC", // Use UTC to avoid timezone issues
    };

    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};
