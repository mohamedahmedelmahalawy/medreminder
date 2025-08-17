import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/Slices/Auth";
import doctorReducer from "@/lib/store/Slices/MedicalSlicer";
import patientReducer from "@/lib/store/Slices/PatientSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    patient: patientReducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;