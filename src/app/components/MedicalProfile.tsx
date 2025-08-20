// app/components/MedicalProfileClient.tsx
"use client";

import { useState } from "react";
import { User, Briefcase, Users, Calendar } from "lucide-react";

interface PatientCase {
	diagnosis: {
		diagnosis: string;
		prognosis: string;
		"medical-report": string;
		"medical-treatment": string;
		schedule: string;
		complaint: string;
	}[];
}

interface Patient {
	id: string;
	name: string;
	dateOfAdmission: string;
	phone: string;
	country: string;
	gender: string;
	profession: string;
	age: number;
	cases: PatientCase[];
}

interface Experience {
	role: string;
	organization: string;
	years: string;
	description: string;
}

interface Profile {
	name: string;
	title: string;
	specialization: string;
	location: string;
	email: string;
	phone: string;
	age: number;
	code: string;
	bio: string;
	country: string;
	city: string;
}

export default function MedicalProfile({
	profile,
	patients,
	experiences,
	services,
}: {
	profile: Profile;
	patients: Patient[];
	experiences: Experience[];
	services: string[];
}) {
	const [activeTab, setActiveTab] = useState<
		"about" | "experience" | "patients" | "schedule"
	>("about");
	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

	return (
		<div className='p-6 space-y-6'>
			{/* Profile Header */}
			<div className='text-center'>
				<h1 className='text-2xl font-bold'>{profile.name}</h1>
				<p className='text-blue-600'>{profile.title}</p>
				<p>{profile.specialization}</p>
				<p className='text-gray-500'>{profile.location}</p>
			</div>

			{/* Tabs */}
			<div className='flex justify-center gap-6 border-b pb-2'>
				<button
					onClick={() => setActiveTab("about")}
					className={`flex items-center gap-2 ${
						activeTab === "about" ? "text-blue-600 font-bold" : ""
					}`}
				>
					<User size={16} /> About
				</button>
				<button
					onClick={() => setActiveTab("experience")}
					className={`flex items-center gap-2 ${
						activeTab === "experience" ? "text-blue-600 font-bold" : ""
					}`}
				>
					<Briefcase size={16} /> Experience
				</button>
				<button
					onClick={() => setActiveTab("patients")}
					className={`flex items-center gap-2 ${
						activeTab === "patients" ? "text-blue-600 font-bold" : ""
					}`}
				>
					<Users size={16} /> Patients
				</button>
				<button
					onClick={() => setActiveTab("schedule")}
					className={`flex items-center gap-2 ${
						activeTab === "schedule" ? "text-blue-600 font-bold" : ""
					}`}
				>
					<Calendar size={16} /> Schedule
				</button>
			</div>

			{/* Tab Content */}
			{activeTab === "about" && (
				<div className='space-y-4'>
					<p>{profile.bio}</p>
					<ul className='list-disc pl-6 text-gray-700'>
						<li>Email: {profile.email}</li>
						<li>Phone: {profile.phone}</li>
						<li>Age: {profile.age}</li>
						<li>Code: {profile.code}</li>
						<li>Country: {profile.country}</li>
						<li>City: {profile.city}</li>
					</ul>
					<h3 className='font-bold'>Services Offered</h3>
					<ul className='list-disc pl-6'>
						{services.map((s, i) => (
							<li key={i}>{s}</li>
						))}
					</ul>
				</div>
			)}

			{activeTab === "experience" && (
				<div className='space-y-4'>
					{experiences.map((exp, i) => (
						<div key={i} className='border p-3 rounded-lg'>
							<h3 className='font-bold'>{exp.role}</h3>
							<p className='text-blue-600'>{exp.organization}</p>
							<p className='text-gray-500'>{exp.years}</p>
							<p>{exp.description}</p>
						</div>
					))}
				</div>
			)}

			{activeTab === "patients" && (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{patients.map((p) => (
						<div
							key={p.id}
							className='border p-3 rounded-lg cursor-pointer hover:shadow'
							onClick={() => setSelectedPatient(p)}
						>
							<h3 className='font-bold'>{p.name}</h3>
							<p>{p.profession}</p>
							<p className='text-gray-500'>Admitted: {p.dateOfAdmission}</p>
						</div>
					))}
				</div>
			)}

			{activeTab === "schedule" && (
				<div>
					<p className='text-gray-500'>No schedule available yet.</p>
				</div>
			)}

			{/* Patient Modal (Simple Inline) */}
			{selectedPatient && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
					<div className='bg-white p-6 rounded-lg w-[500px]'>
						<h2 className='text-xl font-bold'>{selectedPatient.name}</h2>
						<p>Age: {selectedPatient.age}</p>
						<p>Phone: {selectedPatient.phone}</p>
						<p>Country: {selectedPatient.country}</p>
						<p>Gender: {selectedPatient.gender}</p>

						<h3 className='mt-4 font-bold'>Cases</h3>
						{selectedPatient.cases.map((c, i) => (
							<div key={i} className='border p-2 rounded mt-2'>
								{c.diagnosis.map((d, j) => (
									<div key={j}>
										<p>
											<strong>Diagnosis:</strong> {d.diagnosis}
										</p>
										<p>
											<strong>Prognosis:</strong> {d.prognosis}
										</p>
										<p>
											<strong>Report:</strong> {d["medical-report"]}
										</p>
										<p>
											<strong>Treatment:</strong> {d["medical-treatment"]}
										</p>
										<p>
											<strong>Complaint:</strong> {d.complaint}
										</p>
										<p>
											<strong>Schedule:</strong> {d.schedule}
										</p>
									</div>
								))}
							</div>
						))}

						<button
							onClick={() => setSelectedPatient(null)}
							className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
