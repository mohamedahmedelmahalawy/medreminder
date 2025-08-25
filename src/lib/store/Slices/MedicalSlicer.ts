import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Doctor } from "@/lib/interfaces/Doctor";
import type { DiagnosisEntry } from "@/lib/interfaces/DiagnosisEntry";
import type { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import type { Role } from "@/lib/interfaces/Role";
import { toast } from "react-toastify";

//Hna feha doctore methods zai add patient add diagnosis w later 7anzawod 
//   add doctor and genrate new code in register
const BASE_URL = "https://fast-api-dnk5.vercel.app";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } }); 4
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}
async function postJSON<T>(url: string, body: any): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // helpful when debugging FastAPI 422 payload errors
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function patchJSON<T>(url: string, body: any): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}


async function deleteJSON<T>(url: string): Promise<T | null> {
  const res = await fetch(url, { method: "DELETE" });
  if (res.status === 204) return null; // server didn't return a body
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  // Some servers return empty string on 200—guard that too:
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : null;
}


interface DoctorState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  current?: Doctor; // optional cached doctor
}
const initialState: DoctorState = { status: "idle" };

// hna lma el patient yedawr 3la el code beta3 el doctor
async function fetchDoctorByCode(code: any): Promise<Doctor> {
  const docs = await getJSON<Doctor[]>(`${BASE_URL}/doctors?code=${encodeURIComponent(code)}`);
  const doc = docs[0];
  if (!doc) throw new Error("Doctor not found.");
  return doc;
}

/** dashboard nezawd patient */
// export const addPatient = createAsyncThunk<

//   Doctor,
//   { doctorCode: string; patient: DoctorPatient }

// >(
//   "doctor/addPatient",
//   async ({ doctorCode, patient }) => {
//     const doc = await fetchDoctorByCode(doctorCode);
//     // hna bencheck bas
//     const phone = (patient.phone ?? "").trim();
//     const exists = (doc.patient ?? []).find(
//       p => (p.phone ?? "").trim() === phone
//     );

//     if (exists) {
//       if (typeof window !== "undefined") {
//         alert("This phone exists");
//       }
//       // stop the flow so nothing is added
//       throw new Error("This phone exists");
//     }


//         const updated = await postJSON<Doctor>(
//             `${BASE_URL}/doctors/${encodeURIComponent(doctorCode)}/patients`,
//             patient
//         );
//         return updated;
//     }
// );
export const addPatient = createAsyncThunk<
  Doctor,
  { patient: DoctorPatient } // Remove doctorCode from parameters
>(
  "doctor/addPatient",
  async ({ patient }) => {
    // Get code inside the thunk
    const getDoctorCode = (): string | null => {
      if (typeof window === "undefined") return null;

      const raw = localStorage.getItem("auth");
      if (!raw) return null;

      try {
        const parsed = JSON.parse(raw);
        return parsed?.code || parsed || null;
      } catch {
        return raw;
      }
    };

    const doctorCode = getDoctorCode();

    if (!doctorCode) {
      throw new Error("Doctor code not found");
    }

    const doc = await fetchDoctorByCode(doctorCode);
    // ... rest of your existing code
    const updated = await postJSON<Doctor>(
      `${BASE_URL}/doctors/${encodeURIComponent(doctorCode)}/patients`,
      patient
    );
    
    return updated;
  }
);



/** Remove a patient by patient.phone */
//belpost
// export const removePatient = createAsyncThunk<
//   Doctor,
//   { doctorCode: string; patientPhone: string } //e.target.phone 
// >("doctor/removePatient", async ({ doctorCode, patientPhone }) => {
//   const doc = await fetchDoctorByCode(doctorCode);
//   const updatedPatients = (doc.patient || []).filter(p => p.phone !== patientPhone);
// const updated = await postJSON<Doctor>(
//   `${BASE_URL}/doctors/${encodeURIComponent(doc.code)}`,
//   { patient: updatedPatients }
// );
//   return updated; 
// });
//bel
export const removePatient = createAsyncThunk<
  Doctor,
  { doctorCode: string ; patientPhone: string }
>("doctor/removePatient", async ({ doctorCode, patientPhone }) => {
  // Optional: you can skip this fetch if doctorCode is already the code you need
  const doc = await fetchDoctorByCode(doctorCode);
  const url = `${BASE_URL}/doctors/${encodeURIComponent(doctorCode)}/patients/${patientPhone}`;
  const patient= await getJSON<DoctorPatient>(url);
  const maybeUpdated = await deleteJSON<Doctor>(url);
toast.success(`"Patient: ${patient.name} has been removed from your list ✅"`);
  if (maybeUpdated) return maybeUpdated;

  return await fetchDoctorByCode(doctorCode);
});

//edit patient
type PatientEditable = Partial<Omit<DoctorPatient, "cases">>; // allow phone edits

// export const editPatient = createAsyncThunk<
//     Doctor,
//     { doctorCode: string; currentPhone: string; updates: PatientEditable },
//     { rejectValue: string }
// >(
//     "doctor/editPatient",
//     async ({ doctorCode, currentPhone, updates }, { rejectWithValue }) => {
//         try {
//             const doc = await fetchDoctorByCode(doctorCode);

//             const cur = currentPhone.trim();
//             const idx = (doc.patient ?? []).findIndex(
//                 p => (p.phone ?? "").trim() === cur
//             );
//             if (idx === -1) return rejectWithValue("Patient not found for this doctor.");

//             const existing = doc.patient![idx];
//             const requestedPhone = (updates.phone ?? existing.phone ?? "").trim();

//             // If phone is changing, ensure no duplicate with another patient
//             if (requestedPhone !== cur) {
//                 const clash = (doc.patient ?? []).find(
//                     p => (p.phone ?? "").trim() === requestedPhone
//                 );
//                 if (clash) return rejectWithValue("Another patient already has this phone.");
//             }

//             // Merge updates; keep cases but fix their ids to match the (possibly) new phone
//             const fixedCases = (existing.cases ?? []).map(c => ({
//                 ...c,
//                 id: requestedPhone, // keep cases id aligned with phone
//             }));

//             const merged: DoctorPatient = {
//                 ...existing,
//                 ...updates,
//                 phone: requestedPhone,
//                 cases: fixedCases,
//             };

//             // PUT the single patient to /doctors/{code}/patients/{currentPhone}

//             //             const patients = [...(doc.patient ?? [])];
//             // patients[idx] = merged;
//             // const updated = await postJSON<Doctor>(`${BASE_URL}/doctors/${doc.code}`, { patient: patients });
//             // return updated;
//             const updated = await patchJSON<Doctor>(
//                 `${BASE_URL}/doctors/${encodeURIComponent(doc.code)}/patients/${encodeURIComponent(cur)}`,
//                 merged
//             );
//             return updated;
//         } catch (e: any) {
//             return rejectWithValue(e?.message ?? "Failed to edit patient");
//         }
//     }
// );



export const updatePatient = createAsyncThunk(
  "doctor/updatePatient",
  async ({ doctorCode, patientPhone, updatedData }: {
    doctorCode: string;
    patientPhone: string;
    updatedData: DoctorPatient;
  }) => {
    try {
      // First, fetch the current doctor data
      const doc = await fetchDoctorByCode(doctorCode);
      if (!doc) return;
      // Update the patient data
      const updated = await patchJSON<Doctor>(
        `${BASE_URL}/doctors/${doctorCode}/patients/${patientPhone}`,
        updatedData
      );
    toast.success(`"Patient details have been edited successfully"`);
      return updated;
    } catch (error) {
      toast.error("Something went wrong");
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const getDiagnoses = createAsyncThunk<
  DiagnosisEntry[],
  { doctorCode: string; patientPhone: string },
  { rejectValue: string }
>("doctor/getDiagnoses", async ({ doctorCode, patientPhone }, { rejectWithValue }) => {
  try {
    return await getJSON<DiagnosisEntry[]>(
      `${BASE_URL}/doctors/${encodeURIComponent(doctorCode)}/patients/${encodeURIComponent(patientPhone)}/diagnosis`
    );
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to load diagnoses");
  }
});


/** Add diagnosis (POST /doctors/{code}/patients/{phone}/diagnosis) */
export const addDiagnosis = createAsyncThunk<
  Doctor,
  { doctorCode: string; patientPhone: string; entry: DiagnosisEntry },
  { rejectValue: string }
>("doctor/addDiagnosis", async ({ doctorCode, patientPhone, entry }, { rejectWithValue }) => {
  try {

    // const payload: DiagnosisEntry = { ...entry, schedule: new Date(entry.schedule).toISOString() };

    await postJSON<void>(
      `${BASE_URL}/doctors/${encodeURIComponent(doctorCode)}/patients/${patientPhone}/diagnosis`,
      entry
    );


    return await fetchDoctorByCode(doctorCode);
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to add diagnosis");
  }
});

/** Remove diagnosis (DELETE …/diagnosis?index=N) */

export const removeDiagnosis = createAsyncThunk<
  Doctor,
  { doctorCode: string; patientPhone: string; index: number },
  { rejectValue: string }
>("doctor/removeDiagnosis", async ({ doctorCode, patientPhone, index }, { rejectWithValue }) => {
  try {
    // your API deletes by index
    await deleteJSON<void>(
      `${BASE_URL}/doctors/${encodeURIComponent(doctorCode)}/patients/${encodeURIComponent(patientPhone)}/diagnosis?index=${index}`
    );

    return await fetchDoctorByCode(doctorCode);
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to remove diagnosis");
  }
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
      .addCase(removeDiagnosis.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })

      .addCase(updatePatient.pending, (s) => { s.status = "loading"; s.error = undefined; })
      .addCase(updatePatient.fulfilled, (s, a) => { s.status = "succeeded"; s.current = a.payload; })
      .addCase(updatePatient.rejected, (s, a) => { s.status = "failed"; s.error = (a.payload as string) ?? a.error.message; })
  }
});

export const { setCurrentDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
