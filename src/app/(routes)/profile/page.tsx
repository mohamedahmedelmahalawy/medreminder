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

  const experiences: Experience[] = [
    {
      title: "Medical Doctor & Data Scientist",
      institution: "Healthcare Technology Solutions",
      period: "2023 - Present",
      description: [
        "Integrating data science methodologies with clinical practice",
        "Developing predictive models for patient diagnosis and treatment outcomes",
        "Managing comprehensive patient care with focus on chronic disease management",
        "Implementing digital health solutions to improve patient monitoring",
      ],
      specializations: [
        "Data Science",
        "Digital Health",
        "Chronic Disease Management",
        "Predictive Analytics",
      ],
    },
    {
      title: "Software Engineer",
      institution: "Medical Technology Company",
      period: "2022 - 2023",
      description: [
        "Developed healthcare management systems and patient tracking applications",
        "Created data visualization tools for medical professionals",
        "Implemented machine learning algorithms for medical data analysis",
        "Collaborated with medical teams to digitize healthcare processes",
      ],
      specializations: [
        "Healthcare Software",
        "Machine Learning",
        "Medical Data Analysis",
      ],
    },
  ];

  return <MedicalProfile experiences={experiences} services={services} />;
}
