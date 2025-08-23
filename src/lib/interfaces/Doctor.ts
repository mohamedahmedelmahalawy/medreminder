import { DoctorPatient } from "./DoctorPatient";

export interface Doctor {
  id?: number;                        // REQUIRED by json-server
  code: string;
  name: string;
  Age?: number;
  phone: string;
  profession?: string;
  specialty?: string;
  gender?: string;
  email: string;
  password: string;
  country: string;
  city?: string;
  patient: DoctorPatient[];
}