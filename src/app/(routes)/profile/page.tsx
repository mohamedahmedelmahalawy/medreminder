import MedicalProfile from "@/app/components/MedicalProfile";
import { Activity, Stethoscope, TrendingUp, Shield } from "lucide-react";

interface Patient {
	id: string;
	name: string;
	dateOfAdmission: string;
	phone: string;
	country: string;
	gender: string;
	profession: string;
	age: number;
	cases: Case[];
}

interface Case {
	diagnosis: Diagnosis[];
}

interface Diagnosis {
	diagnosis: string;
	prognosis: string;
	"medical-report": string;
	"medical-treatment": string;
	schedule: string;
	complaint: string;
}

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
			icon: <Stethoscope className='w-8 h-8 text-blue-600' />,
		},
		{
			name: "Data-Driven Diagnostics",
			description: "Advanced diagnostic analysis using data science methodologies",
			icon: <TrendingUp className='w-8 h-8 text-green-600' />,
		},
		{
			name: "Chronic Disease Management",
			description:
				"Specialized care for diabetes, hypertension, and respiratory conditions",
			icon: <Activity className='w-8 h-8 text-red-500' />,
		},
		{
			name: "Digital Health Solutions",
			description:
				"Technology-enhanced healthcare monitoring and treatment planning",
			icon: <Shield className='w-8 h-8 text-purple-600' />,
		},
	];

	const patients: Patient[] = [
		{
			id: "141516",
			name: "Mazen Ahmed",
			dateOfAdmission: "2025-08-20T10:30:00Z",
			phone: "+201205621566",
			country: "Egypt",
			gender: "male",
			profession: "frontend",
			age: 23,
			cases: [
				{
					diagnosis: [
						{
							diagnosis: "Type 2 Diabetes Mellitus",
							prognosis:
								"With adherence to medication, lifestyle modifications, and regular follow-ups, the patient can maintain good glycemic control and prevent long-term complications.",
							"medical-report":
								"Patient exhibits elevated fasting blood glucose levels over the past 3 months. HbA1c is 7.5%. No signs of diabetic retinopathy. Blood pressure is within normal range.",
							"medical-treatment":
								"Metformin 500mg twice daily, dietary modifications, regular exercise, and quarterly check-ups.",
							schedule: "2025-08-20T10:30:00Z",
							complaint: "Frequent urination, increased thirst, and fatigue.",
						},
						{
							diagnosis: "Acute Bronchitis",
							prognosis:
								"Condition is self-limiting in most cases and expected to improve within 1–3 weeks with treatment and rest. Low risk of complications if managed appropriately.",
							"medical-report":
								"Patient presents with persistent cough for the past 10 days, mild fever (37.8°C), and chest congestion. No signs of pneumonia on chest X-ray. Oxygen saturation at 98%.",
							"medical-treatment":
								"Prescribed Amoxicillin 500mg three times daily for 7 days, increased fluid intake, and rest.",
							schedule: "2025-08-22T09:15:00Z",
							complaint:
								"Persistent cough, mild fever, and difficulty breathing during physical activity.",
						},
					],
				},
			],
		},
		{
			id: "141512",
			name: "Mohammed el mahlway",
			dateOfAdmission: "2025-08-20T10:30:00Z",
			phone: "+201205621562",
			country: "France",
			gender: "male",
			profession: "backend",
			age: 22,
			cases: [
				{
					diagnosis: [
						{
							diagnosis: "Type 2 Diabetes Mellitus",
							prognosis:
								"With adherence to medication, lifestyle modifications, and regular follow-ups, the patient can maintain good glycemic control and prevent long-term complications.",
							"medical-report":
								"Patient exhibits elevated fasting blood glucose levels over the past 3 months. HbA1c is 7.5%. No signs of diabetic retinopathy. Blood pressure is within normal range.",
							"medical-treatment":
								"Metformin 500mg twice daily, dietary modifications, regular exercise, and quarterly check-ups.",
							schedule: "2025-08-20T10:30:00Z",
							complaint: "Frequent urination, increased thirst, and fatigue.",
						},
						{
							diagnosis: "Acute Bronchitis",
							prognosis:
								"Condition is self-limiting in most cases and expected to improve within 1–3 weeks with treatment and rest. Low risk of complications if managed appropriately.",
							"medical-report":
								"Patient presents with persistent cough for the past 10 days, mild fever (37.8°C), and chest congestion. No signs of pneumonia on chest X-ray. Oxygen saturation at 98%.",
							"medical-treatment":
								"Prescribed Amoxicillin 500mg three times daily for 7 days, increased fluid intake, and rest.",
							schedule: "2025-08-22T09:15:00Z",
							complaint:
								"Persistent cough, mild fever, and difficulty breathing during physical activity.",
						},
					],
				},
			],
		},
		{
			id: "142516",
			name: "Fawaz abo talia",
			dateOfAdmission: "2025-08-20T10:30:00Z",
			phone: "+201205621566",
			country: "Egypt",
			gender: "male",
			profession: "frontend",
			age: 23,
			cases: [
				{
					diagnosis: [
						{
							diagnosis: "Type 2 Diabetes Mellitus",
							prognosis:
								"With adherence to medication, lifestyle modifications, and regular follow-ups, the patient can maintain good glycemic control and prevent long-term complications.",
							"medical-report":
								"Patient exhibits elevated fasting blood glucose levels over the past 3 months. HbA1c is 7.5%. No signs of diabetic retinopathy. Blood pressure is within normal range.",
							"medical-treatment":
								"Metformin 500mg twice daily, dietary modifications, regular exercise, and quarterly check-ups.",
							schedule: "2025-08-20T10:30:00Z",
							complaint: "Frequent urination, increased thirst, and fatigue.",
						},
						{
							diagnosis: "Acute Bronchitis",
							prognosis:
								"Condition is self-limiting in most cases and expected to improve within 1–3 weeks with treatment and rest. Low risk of complications if managed appropriately.",
							"medical-report":
								"Patient presents with persistent cough for the past 10 days, mild fever (37.8°C), and chest congestion. No signs of pneumonia on chest X-ray. Oxygen saturation at 98%.",
							"medical-treatment":
								"Prescribed Amoxicillin 500mg three times daily for 7 days, increased fluid intake, and rest.",
							schedule: "2025-08-22T09:15:00Z",
							complaint:
								"Persistent cough, mild fever, and difficulty breathing during physical activity.",
						},
					],
				},
			],
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

	return (
		<MedicalProfile
			patients={patients}
			experiences={experiences}
			services={services}
		/>
	);
}
