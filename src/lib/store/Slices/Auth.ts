import { Doctor } from "@/lib/interfaces/Doctor";
import { Patient } from "@/lib/interfaces/Patient";
import { Role } from "@/lib/interfaces/Role";
            //   Feha doctor role w el patient role w logged user details
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


const BASE_URL = "http://localhost:3001";   //hna 7ansta5dm url beta3na

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

type UserDetails = Doctor | Patient | null;

interface AuthState {
  role: Role;
  code: string | null;             // doctor’s code (used later by patient flow)
  userDetails: UserDetails;        // logged doctor or patient
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: AuthState = {
  role: null,
  code: null,
  userDetails: null,
  status: "idle",
};

export const loginDoctor = createAsyncThunk<Doctor, { email: string; password: string }>(
  "auth/loginDoctor",
  async ({ email, password }) => {
    const matches = await getJSON<Doctor[]>(
      `${BASE_URL}/doctors?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
    const doc = matches[0];
    if (!doc) throw new Error("Doctor not found or wrong credentials.");
    return doc; // includes patients and their cases
  }
);

export const loginPatient = createAsyncThunk<Patient, { email: string; password: string }>(
  "auth/loginPatient",
  async ({ email, password }) => {
    const matches = await getJSON<Patient[]>(
      `${BASE_URL}/patients?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
    const pat = matches[0];
    if (!pat) throw new Error("Patient not found or wrong credentials.");
    return pat;
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
         // clear user when loggin out 
      state.role = null;
      state.code = null;
      state.userDetails = null;
      state.status = "idle";
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // doctor
      .addCase(loginDoctor.pending, (s) => { s.status = "loading"; s.error = undefined; })
      .addCase(loginDoctor.fulfilled, (s, a) => { s.status = "succeeded"; s.userDetails = a.payload; s.role = "medical"; })
      .addCase(loginDoctor.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })
      // patient
      .addCase(loginPatient.pending, (s) => { s.status = "loading"; s.error = undefined; })
      .addCase(loginPatient.fulfilled, (s, a) => { s.status = "succeeded"; s.userDetails = a.payload; s.role = "patient"; })
      .addCase(loginPatient.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; });
  },
});

export const { setRole, setCode, clearAuth } = authSlice.actions;
export default authSlice.reducer;
