export interface  DiagnosisEntry {
  diagnosis: string;
  "medical-report"?: string;        // will be omitted from patient-facing view
  "medical-treatment": string;
  schedule: string;                  // ISO datetime
  complaint: string;
  prognosis?: string;              // will be omitted from patient-facing view
}
  