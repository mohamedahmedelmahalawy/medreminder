import { Doctor } from "@/lib/interfaces/Doctor";
import { Patient } from "@/lib/interfaces/Patient";
import { Role } from "@/lib/interfaces/Role";
//   Feha doctor role w el patient role w logged user details
//   Feha doctor role w el patient role w logged user details
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { generateCode } from "@/app/components/RandomcodeGenerator";
import { toast } from "react-toastify";

const BASE_URL = "https://fast-api-dnk5.vercel.app"; //hna 7ansta5dm url beta3na

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}
export async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function patchJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

type UserDetails = Doctor | Patient | null;

interface AuthState {
  role: Role;
  code: string | null; // doctor’s code (used later by patient flow)
  userDetails: UserDetails; // logged doctor or patient
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  isLoggedIn: boolean

}

const initialState: AuthState = {
  role: null,
  code: null,
  userDetails: null,
  status: "idle",
  isLoggedIn: false
};


export const loginDoctor = createAsyncThunk<
  Doctor,
  { email: string; password: string }
>("auth/loginDoctor", async ({ email, password }) => {
  const doctors = await getJSON<Doctor[]>(`${BASE_URL}/doctors`);
  const doc = doctors.find((d) => d.email === email && d.password === password);
  if (!doc) throw new Error("Invalid email or password.");
  return doc; // includes patients + cases from your JSON
});

export type RegisterDoctorPayload = Omit<Doctor, "id" | "patient" | "code"> & {
  code?: string;
  patient?: Doctor["patient"];
};
export const registerDoctor = createAsyncThunk<
  Doctor,
  RegisterDoctorPayload,
  { rejectValue: string }
>(
  "auth/registerDoctor",
  async (payload, { rejectWithValue }) => {
    // Optional: enforce unique email
    const existing = await getJSON<Doctor>(
      `${BASE_URL}/doctors`
    );
    if (existing.email === payload.email) {
      return rejectWithValue("Email is already registered.");
    }

    const body: Doctor = {
      ...payload,
      code: generateCode({ countryCode: payload.country.slice(0, 2), kind: "alphanumeric" }),
      patient: payload.patient ?? [],
    };
    if (existing.code === body.code) {
      body.code = generateCode({ countryCode: payload.country.slice(0, 2), kind: "alphanumeric" })
    }
    const created = await postJSON<Doctor>(`${BASE_URL}/doctors`, body);
    return created;
  }
);

type DoctorEditable = Partial<Omit<Doctor, "email" | "code" | "patient" | "country" | "city">>;

export const editDoctorProfileByCode = createAsyncThunk<
  Doctor,
  { code: string; updates: DoctorEditable },
  { rejectValue: string }
>(
  "auth/editDoctorProfileByEmail",
  async ({ code, updates }, { rejectWithValue }) => {
    try {
      const needle = code

      // 1) find doctor by email
      const all = await getJSON<Doctor[]>(`${BASE_URL}/doctors`);
      const doc = all.find(d => (d.code === needle));
      if (!doc) return rejectWithValue("Doctor not found.");

      // 2) Merge while locking unchangeable fields (email, code, patient, country, city)
      const merged: Doctor = {
        ...doc,
        ...updates,
        email: doc.email,
        code: doc.code,          // ← UNCHANGEABLE
        patient: doc.patient,
        country: doc.country,
        city: doc.city,
      };

      // 3) PUT using your doctor resource key (by code per your API)
      const updated = await patchJSON<Doctor>(
        `${BASE_URL}/doctors/${encodeURIComponent(doc.code)}`,
        merged
      );
      return updated;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to update doctor profile");
    }
  }
);

export const loginPatient = createAsyncThunk<Patient, { email: string; password: string }>(
  "auth/loginPatient",
  async ({ email, password }) => {
    const patients = await getJSON<Patient[]>(`${BASE_URL}/patients`);
    const pat = patients.find((p) => p.email === email && p.password === password)
    if (!pat) throw new Error("Patient not found or wrong credentials.");
    return pat;
  }
);


export type RegisterPatientPayload = Omit<Patient, "id" | "drCodes">;

export const registerPatient = createAsyncThunk<
  Patient,                      // return type
  RegisterPatientPayload,       // arg type
  { rejectValue: string }       // thunkApi config
>(
  "auth/registerPatient",
  async (payload, { rejectWithValue }) => {
    try {

      const existing = await getJSON<Patient>(`${BASE_URL}/patients`);

      if (existing.email === payload.email) {
        return rejectWithValue("Email is already registered.");
      }

      if (existing.phone === payload.phone) {
        return rejectWithValue("Phone is already registered.");
      }

      const body: Patient = {
        ...payload,
        id: undefined,
        drCodes: []
      };

      // 4) Create
      const created = await postJSON<Patient>(`${BASE_URL}/patients`, body);
      return created;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Registration failed");
    }
  }
);

// Can edit everything EXCEPT: email, drCodes
type PatientEditable = Partial<Omit<Patient, "email" | "drCodes">>;

export const editPatientProfileByEmail = createAsyncThunk<
  Patient,
  { email: string; updates: PatientEditable },
  { rejectValue: string }
>(
  "auth/editPatientProfileByEmail",
  async ({ email, updates }, { rejectWithValue }) => {
    try {
      const needle = email.trim().toLowerCase();

      // 1) find patient by email
      const all = await getJSON<Patient[]>(`${BASE_URL}/patients`);
      const pat = all.find(p => (p.email ?? "").trim().toLowerCase() === needle);
      if (!pat) return rejectWithValue("Patient not found.");

      // 2) if phone changing, ensure uniqueness among other patients
      if (updates.phone) {
        const newPhone = updates.phone.trim();
        const clash = all.find(p =>
          (p.email ?? "").trim().toLowerCase() !== needle &&
          (p.phone ?? "").trim() === newPhone
        );
        if (clash) return rejectWithValue("Another patient already uses this phone.");
      }

      // 3) Merge while locking unchangeable fields
      const merged: Patient = {
        ...pat,
        ...updates,
        email: pat.email,
        drCodes: pat.drCodes ?? [],
      };

      // 4) PUT using id if available; fallback to an email-based route if your API supports it
      const target = pat.id != null
        ? `${BASE_URL}/patients/${pat.id}`
        : `${BASE_URL}/patients/${encodeURIComponent(pat.email)}`;

      const updated = await patchJSON<Patient>(target, merged);
      return updated;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to update patient profile");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      //hna 7an3mal role either doctor or patient in check page 
      state.role = action.payload;
      state.userDetails = null;
      state.status = "idle";
      state.error = undefined;
      console.log("role set to :", state.role)
    },
    setCode(state, action: PayloadAction<string | null>) {
      //hna when patient types doctor code 
      state.code = action.payload;
    },
    clearAuth(state) {
      state.role = null;
      state.code = null;
      state.userDetails = null;
      state.status = "idle";
      state.error = undefined;
      state.isLoggedIn = false;
      toast.success(`"You have successfully logged out. Stay healthy and see you soon!"`);
    },
    setUserDetails(state, action: PayloadAction<UserDetails>) {
      state.userDetails = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      // doctor
      .addCase(loginDoctor.pending, (s) => { s.status = "loading"; s.error = undefined; s.isLoggedIn = false; })
      .addCase(loginDoctor.fulfilled, (s, a) => { s.status = "succeeded"; s.userDetails = a.payload; s.role = "medical"; s.code = a.payload.code; s.isLoggedIn = true; })
      .addCase(loginDoctor.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; s.isLoggedIn = false; })
      // patient
      .addCase(loginPatient.pending, (s) => { s.status = "loading"; s.error = undefined; s.isLoggedIn = false; })
      .addCase(loginPatient.fulfilled, (s, a) => { s.status = "succeeded"; s.userDetails = a.payload; s.role = "patient"; s.isLoggedIn = true; })
      .addCase(loginPatient.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; s.isLoggedIn = false; })
      //Register Doctor
      .addCase(registerDoctor.pending, (s) => { s.status = "loading"; s.error = undefined })
      .addCase(registerDoctor.fulfilled, (s, a) => { s.status = "succeeded"; s.userDetails = a.payload; s.role = "medical"; s.code = a.payload.code })
      .addCase(registerDoctor.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message })
      //Register Patient
      .addCase(registerPatient.pending, (s) => { s.status = "loading"; s.error = undefined })
      .addCase(registerPatient.fulfilled, (s, a) => { s.status = "succeeded"; s.userDetails = a.payload; s.role = "patient" })
      .addCase(registerPatient.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message })

      .addCase(editDoctorProfileByCode.pending, (s) => { s.status = "loading"; s.error = undefined; })
      .addCase(editDoctorProfileByCode.fulfilled, (s, a) => {
        s.status = "succeeded";
        // if the logged-in user is this doctor, keep userDetails in sync
        s.userDetails = a.payload;
        s.code = a.payload.code
      })
      .addCase(editDoctorProfileByCode.rejected, (s, a) => {
        s.status = "failed";
        s.error = (a.payload as string) ?? a.error.message;
      })

      .addCase(editPatientProfileByEmail.pending, (s) => { s.status = "loading"; s.error = undefined; })
      .addCase(editPatientProfileByEmail.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.userDetails = a.payload;
      })
      .addCase(editPatientProfileByEmail.rejected, (s, a) => {
        s.status = "failed";
        s.error = (a.payload as string) ?? a.error.message;
      })
  },
});

export const { setRole, setCode, clearAuth } = authSlice.actions;
export default authSlice.reducer;
