import MedicalProfile from "@/app/components/MedicalProfile";
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

export default async function ProfilePage() {
  return <MedicalProfile />;
}
