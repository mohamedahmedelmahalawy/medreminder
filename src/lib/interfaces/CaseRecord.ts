import { DiagnosisEntry } from "./DiagnosisEntry";

export interface CaseRecord {
  id?: string;                        // patient phone
  diagnosis: DiagnosisEntry[];
}