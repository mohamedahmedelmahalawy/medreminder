import MedicalProfile from "@/app/components/MedicalProfile";
import { Activity, Stethoscope, TrendingUp, Shield } from "lucide-react";

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
  const services: Service[] = [
    {
      name: "General Medicine",
      description: "Comprehensive primary care and health assessments",
      icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Data-Driven Diagnostics",
      description:
        "Advanced diagnostic analysis using data science methodologies",
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
    },
    {
      name: "Chronic Disease Management",
      description:
        "Specialized care for diabetes, hypertension, and respiratory conditions",
      icon: <Activity className="w-8 h-8 text-red-500" />,
    },
    {
      name: "Digital Health Solutions",
      description:
        "Technology-enhanced healthcare monitoring and treatment planning",
      icon: <Shield className="w-8 h-8 text-purple-600" />,
    },
  ];

  return <MedicalProfile services={services} />;
}
