// app/components/MedicalProfile.tsx

import MedicalProfile from "@/app/components/MedicalProfile";

// Fake doctor profile
const profile = {
	name: "Dr. AbdElRahman Mohamed Saad-ElDin",
	title: "Medical Doctor & Software Engineer",
	specialization: "Data Science in Healthcare",
	location: "Alexandria, Egypt",
	email: "abdelrahmansaad@gmail.com",
	phone: "+201119944899",
	age: 24,
	code: "EGP12Hop676",
	bio: "Innovative medical professional combining healthcare and data science.",
	country: "Egypt",
	city: "Alexandria",
};

// Experiences
const experiences = [
	{
		role: "Frontend Developer",
		organization: "El-Rehla Educational Platform",
		years: "2024",
		description:
			"Developed the front end using React, React Router Dom, Axios, React Toastify, useState, useNavigate, and Custom CSS Modules.",
	},
	{
		role: "Hackathon Participant",
		organization: "Data Science Hackathon",
		years: "2025",
		description:
			"Achieved third place by building a data-driven healthcare analytics solution.",
	},
];

// Services offered
const services = [
	"Medical Consultations",
	"Patient Data Management",
	"Healthcare Analytics",
	"Frontend Development",
];

// Patients data
const patients = [
	{
		id: "141516",
		name: "Mazen Ahmed",
		dateOfAdmission: "2025-08-20T10:30:00Z",
		phone: "+201205621566",
		country: "Egypt",
		gender: "male",
		profession: "Frontend Developer",
		age: 23,
		cases: [
			{
				diagnosis: [
					{
						diagnosis: "Type 2 Diabetes Mellitus",
						prognosis: "Maintain glycemic control with medication and diet.",
						"medical-report": "HbA1c is 7.5%, no retinopathy.",
						"medical-treatment": "Metformin 500mg twice daily.",
						schedule: "2025-08-20T10:30:00Z",
						complaint: "Frequent urination, thirst, fatigue.",
					},
				],
			},
		],
	},
];

export default async function ProfilePage() {
	// Here you could fetch from DB or API instead of hardcoding
	return (
		<MedicalProfile
			profile={profile}
			patients={patients}
			experiences={experiences}
			services={services}
		/>
	);
}
