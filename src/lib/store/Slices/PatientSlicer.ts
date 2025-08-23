import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Doctor } from "@/lib/interfaces/Doctor";
import type { CaseRecord } from "@/lib/interfaces/CaseRecord";
import type { DiagnosisEntry } from "@/lib/interfaces/DiagnosisEntry";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { Patient } from "@/lib/interfaces/Patient";

const BASE_URL = "https://fast-api-dnk5.vercel.app";

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
      const { ["medical-report"]: _omit, ...rest } = d;  //can remove medical report if needed from here
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

/** Patient: fetch docotor by code and the specified patient */
export const fetchCasesForDoctor = createAsyncThunk<
  { doc: Doctor; aCase: CaseRecord | null },
  { doctorCode: string; patientPhone: string }
>("patient/fetchCasesForDoctor", async ({ doctorCode, patientPhone }) => {
  const docs = await getJSON<Doctor[]>(`${BASE_URL}/doctors?code=${encodeURIComponent(doctorCode)}`);
  const doc = docs[0];
  if (!doc) throw new Error("Doctor not found.");
  const searchPat = (doc.patient || []).find(p => p.phone === patientPhone);
  if (!searchPat) throw new Error("This doctor does not have a patient with that phone.");
  const cases0 = searchPat.cases?.[0] ?? null;
  const sanitized = sanitizeForPatient(cases0);
  const patients = await getJSON<Patient[]>(`${BASE_URL}/patients`);
  const loggedPat = patients.find(p => p.phone === patientPhone);
  if (!loggedPat) throw new Error("You are not registered with this phone");
  if (!loggedPat.drCodes.find(c => c === doctorCode)) {
    loggedPat.drCodes.push(doctorCode);
  }
  return { doc, aCase: sanitized };
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
        s.casesByDoctorCode[a.payload.doc.code] = a.payload.aCase;
      })
      .addCase(fetchCasesForDoctor.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      });
  },
});

export default patientSlice.reducer;
