import { CaseRecord } from "./CaseRecord";

export interface DoctorPatient {
  id: string;                        // your patient id in doctor list
  name: string;
  phone: string;
  country?: string;
  gender?: string;
  profession?: string;
  age?: number;
  ["date of admission"]?: string;
  cases: CaseRecord[];               // typically 1 element array in your data
}