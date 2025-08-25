"use client";

import MedicalProfile from "@/app/components/MedicalProfile";
import PrivateRoute from "@/app/private-route/PrivateRoutes";
export interface Experience {
  title: string;
  institution: string;
  period: string;
  description: string[];
  specializations: string[];
}

export interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export default function ProfilePage() {
  return (
    <PrivateRoute requiredRoles={["medical", "patient"]}>
      <MedicalProfile />
    </PrivateRoute>
  );
}
