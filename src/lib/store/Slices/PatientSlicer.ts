import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Doctor } from "@/lib/interfaces/Doctor";
import type { CaseRecord } from "@/lib/interfaces/CaseRecord";
import type { DiagnosisEntry } from "@/lib/interfaces/DiagnosisEntry";

const BASE_URL = "http://localhost:3001";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

function sanitizeForPatient(cases: CaseRecord | undefined | null): CaseRecord | null {
  if (!cases) return null;
  return {
    ...cases,
    diagnosis: (cases.diagnosis || []).map((d: DiagnosisEntry) => {
      const { ["medical-report"]: _omit, ...rest } = d;
      return rest as DiagnosisEntry; // TS: medical-report omitted
    }),
  };
}

interface PatientState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  casesByDoctorCode: Record<string, CaseRecord | null>;
}
const initialState: PatientState = { status: "idle", casesByDoctorCode: {} };

/** Patient: fetch own cases for a specific doctor code */
export const fetchCasesForDoctor = createAsyncThunk<
  { doctorCode: string; cases: CaseRecord | null },
  { doctorCode: string; patientPhone: string }
>("patient/fetchCasesForDoctor", async ({ doctorCode, patientPhone }) => {
  const docs = await getJSON<Doctor[]>(`${BASE_URL}/doctors?code=${encodeURIComponent(doctorCode)}`);
  const doc = docs[0];
  if (!doc) throw new Error("Doctor not found.");
  const pat = (doc.patient || []).find(p => p.phone === patientPhone);
  if (!pat) throw new Error("This doctor does not have a patient with that phone.");
  const cases0 = pat.cases?.[0] ?? null;
  const sanitized = sanitizeForPatient(cases0);
  return { doctorCode, cases: sanitized };
});
                                // feha kolla method beta3t el patient 
const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCasesForDoctor.pending, (s) => { s.status = "loading"; s.error = undefined; })
     .addCase(fetchCasesForDoctor.fulfilled, (s, a) => {
       s.status = "succeeded";
       s.casesByDoctorCode[a.payload.doctorCode] = a.payload.cases;
     })
     .addCase(fetchCasesForDoctor.rejected, (s, a) => {
       s.status = "failed";
       s.error = a.error.message;
     });
  },
});

export default patientSlice.reducer;
