import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Doctor } from "@/lib/interfaces/Doctor";
import type { DiagnosisEntry } from "@/lib/interfaces/DiagnosisEntry";
import type { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import type { Role } from "@/lib/interfaces/Role";

                                  //Hna feha doctore methods zai add patient add diagnosis w later 7anzawod 
                                //   add doctor and genrate new code in register
const BASE_URL = "https://fast-api-dnk5.vercel.app";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}
async function patchJSON<T>(url: string, body: any): Promise<T> {
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

interface DoctorState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  current?: Doctor; // optional cached doctor
}
const initialState: DoctorState = { status: "idle" };

// hna lma el patient yedawr 3la el code beta3 el doctor
async function fetchDoctorByCode(code: string): Promise<Doctor> {
  const docs = await getJSON<Doctor[]>(`${BASE_URL}/doctors?code=${encodeURIComponent(code)}`);
  const doc = docs[0];
  if (!doc) throw new Error("Doctor not found.");
  return doc;
}

/** dashboard nezawd patient */
export const addPatient = createAsyncThunk<
  Doctor,
  { doctorCode: string; patient: DoctorPatient }
   
>(
  "doctor/addPatient",
  async ({ doctorCode, patient }) => {
    const doc = await fetchDoctorByCode(doctorCode);
// hna bencheck bas
    const phone = (patient.phone ?? "").trim();
    const exists = (doc.patient ?? []).find(
      p => (p.phone ?? "").trim() === phone
    );

    if (exists) {
      if (typeof window !== "undefined") {
        alert("This phone exists");
      }
      // stop the flow so nothing is added
      throw new Error("This phone exists");
    }

    const updatedPatients = [...(doc.patient || []), patient];
    const updated = await patchJSON<Doctor>(
      `${BASE_URL}/doctors/${doc.code}`,
      { patient: updatedPatients }
    );
    return updated;
  }
);

/** Remove a patient by patient.phone */
export const removePatient = createAsyncThunk<
  Doctor,
  { doctorCode: string; patientPhone: string }
>("doctor/removePatient", async ({ doctorCode, patientPhone }) => {
  const doc = await fetchDoctorByCode(doctorCode);
  const updatedPatients = (doc.patient || []).filter(p => p.phone !== patientPhone);
  const updated = await patchJSON<Doctor>(`${BASE_URL}/doctors/${doc.code}`, { patient: updatedPatients });
  return updated; 
});

/** Add a diagnosis entry to a specific patient's first cases[] */
export const addDiagnosis = createAsyncThunk<
  Doctor,
  { doctorCode: string; patientPhone: string; entry: DiagnosisEntry }
>("doctor/addDiagnosis", async ({ doctorCode, patientPhone, entry }) => {
  const doc = await fetchDoctorByCode(doctorCode);
  const patients = (doc.patient || []).map(p => {
    if (p.phone !== patientPhone) return p;
    const cases0 = p.cases?.[0] ?? { id: p.phone, diagnosis: [] };
    const updatedCases0 = { ...cases0, diagnosis: [...(cases0.diagnosis || []), entry] };
    return { ...p, cases: [updatedCases0] };
  });
  const updated = await patchJSON<Doctor>(`${BASE_URL}/doctors/${doc.code}`, { patient: patients });
  return updated;
});

/** Remove diagnosis by index for a patient */
export const removeDiagnosis = createAsyncThunk<
  Doctor,
  { doctorCode: string; patientPhone: string; index: number }
>("doctor/removeDiagnosis", async ({ doctorCode, patientPhone, index }) => {
  const doc = await fetchDoctorByCode(doctorCode);
  const patients = (doc.patient || []).map(p => {
    if (p.phone !== patientPhone) return p;
    const cases0 = p.cases?.[0];
    if (!cases0) return p;
    const diag = [...cases0.diagnosis];
    if (index < 0 || index >= diag.length) return p;
    diag.splice(index, 1);
    return { ...p, cases: [{ ...cases0, diagnosis: diag }] };
  });
  const updated = await patchJSON<Doctor>(`${BASE_URL}/doctors/${doc.code}`, { patient: patients });
  return updated;
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setCurrentDoctor(state, action: PayloadAction<Doctor | undefined>) {
      state.current = action.payload;
    },
  },
//   optional for ui 
  extraReducers: (b) => {
    b.addCase(addPatient.pending, (s) => { s.status = "loading"; s.error = undefined; })
     .addCase(addPatient.fulfilled, (s, a) => { s.status = "succeeded"; s.current = a.payload; })
     .addCase(addPatient.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })

     .addCase(removePatient.pending, (s) => { s.status = "loading"; s.error = undefined; })
     .addCase(removePatient.fulfilled, (s, a) => { s.status = "succeeded"; s.current = a.payload; })
     .addCase(removePatient.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })

     .addCase(addDiagnosis.pending, (s) => { s.status = "loading"; s.error = undefined; })
     .addCase(addDiagnosis.fulfilled, (s, a) => { s.status = "succeeded"; s.current = a.payload; })
     .addCase(addDiagnosis.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })

     .addCase(removeDiagnosis.pending, (s) => { s.status = "loading"; s.error = undefined; })
     .addCase(removeDiagnosis.fulfilled, (s, a) => { s.status = "succeeded"; s.current = a.payload; })
     .addCase(removeDiagnosis.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; });
  },
});

export const { setCurrentDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
