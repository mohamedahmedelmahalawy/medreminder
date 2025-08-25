// app/components/MedicalProfileClient.tsx
"use client";

import { useState, useEffect } from "react";
import { Download, Edit, FileText } from "lucide-react";
import { getPatients, getProfile } from "@/app/funcs/ProfileFunc";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import ProfileManage from "./ProfileManage";
import { downloadPatientReport } from "@/app/funcs/PatientReportUtils";
import { jsPDF } from "jspdf";
import { DNA } from "react-loader-spinner";
import EditDoctor from "./EditDoctor";
import EditPatient from "./EditPatient";

export default function MedicalProfile() {
	const [profile, setProfile] = useState<DoctorPatient | null>(null);
	const [doctorsPatient, setDoctorsPatient] = useState<DoctorPatient[] | null>(
		null
	);
	const [role, setRole] = useState<string>("");
	const [auth, setAuth] = useState<DoctorPatient | null>(null);
	const displayPatients =
		role === "medical" && doctorsPatient ? doctorsPatient : [];

	const fetchProfile = async () => {
		const auth = JSON.parse(localStorage.getItem("auth") || "{}");
		setAuth(auth);
		try {
			const profileRole = auth.role;
			setRole(profileRole);
			const fetchedProfile = await getProfile(auth);
			setProfile(fetchedProfile);

			if (profileRole === "medical") {
				const DoctorsPatient = await getPatients(auth);
				setDoctorsPatient(DoctorsPatient);
			}
		} catch (error) {
			console.error("Failed to fetch profile:", error);
		}
	};

	const handleProfileUpdate = () => {
		fetchProfile();
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	if (!profile) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<DNA
					visible={true}
					height='200'
					width='200'
					ariaLabel='dna-loading'
					wrapperStyle={{}}
					wrapperClass='dna-wrapper'
				/>
			</div>
		);
	}

	const getInitials = (name: string): string => {
		if (!name) return "";

		const parts = name.trim().split(" ").filter(Boolean);

		if (parts.length >= 2) {
			// First letter of first two words
			return (parts[0][0] + parts[1][0]).toUpperCase();
		}

		// Only one word
		return parts[0][0].toUpperCase();
	};

	const handleDownload = () => {
		const doc = new jsPDF();

		// Set colors
		const primaryColor: [number, number, number] = [41, 128, 185]; // Blue
		const secondaryColor: [number, number, number] = [52, 73, 94]; // Dark gray
		const lightGray: [number, number, number] = [236, 240, 241]; // Light gray

		// Header with background
		doc.setFillColor(...primaryColor);
		doc.rect(0, 0, 210, 30, "F");

		// Header text
		doc.setTextColor(255, 255, 255);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(24);
		doc.text("Doctor Profile", 105, 18, { align: "center" });

		// Subtitle - Bigger name
		doc.setFontSize(18);
		doc.text(`${profile.name || "Medical Professional"}`, 105, 28, {
			align: "center",
		});

		// Reset text color
		doc.setTextColor(0, 0, 0);

		// Section 1: Contact Information
		doc.setFillColor(...lightGray);
		doc.rect(10, 40, 190, 8, "F");
		doc.setTextColor(...primaryColor);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(14);
		doc.text("Contact Information", 15, 47);

		doc.setTextColor(...secondaryColor);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(11);
		doc.text(`Location: ${profile.city}, ${profile.country}`, 15, 60);
		doc.text(`Email: ${profile.email}`, 15, 68);
		doc.text(`Phone: ${profile.phone}`, 15, 76);

		// Section 2: Professional Details
		doc.setFillColor(...lightGray);
		doc.rect(10, 90, 190, 8, "F");
		doc.setTextColor(...primaryColor);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(14);
		doc.text("Professional Details", 15, 97);

		doc.setTextColor(...secondaryColor);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(11);
		doc.text(`Doctor Code: ${profile.code}`, 15, 110);
		doc.text(`Age: ${profile.age || profile.Age} years`, 15, 118);
		doc.text(`Speciality: ${profile.specialty}`, 15, 126);

		// Section 3: Patient Overview
		doc.setFillColor(...lightGray);
		doc.rect(10, 140, 190, 8, "F");
		doc.setTextColor(...primaryColor);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(14);
		doc.text("Patient Overview", 15, 147);

		const totalPatients = displayPatients.length;
		const activeCases = displayPatients.reduce(
			(total: number, patient: DoctorPatient) =>
				total +
				(patient.cases?.reduce(
					(caseTotal: number, c: any) => caseTotal + c.diagnosis.length,
					0
				) || 0),
			0
		);
		const upcomingAppointments = displayPatients.reduce(
			(total: number, patient: DoctorPatient) =>
				total +
				(patient.cases?.reduce(
					(caseTotal: number, c: any) => caseTotal + c.diagnosis.length,
					0
				) || 0),
			0
		);

		doc.setTextColor(...secondaryColor);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(11);
		doc.text(`Total Patients: ${totalPatients}`, 15, 160);
		doc.text(`Active Cases: ${activeCases}`, 15, 168);
		doc.text(`Upcoming Appointments: ${upcomingAppointments}`, 15, 176);

		// Statistics boxes
		doc.setFillColor(...primaryColor);
		doc.rect(15, 185, 55, 25, "F");
		doc.rect(80, 185, 55, 25, "F");
		doc.rect(145, 185, 55, 25, "F");

		// Statistics text
		doc.setTextColor(255, 255, 255);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(24);
		doc.text(totalPatients.toString(), 42, 200, { align: "center" });
		doc.text(activeCases.toString(), 107, 200, { align: "center" });
		doc.text(upcomingAppointments.toString(), 172, 200, { align: "center" });

		doc.setFontSize(12);
		doc.text("Patients", 42, 208, { align: "center" });
		doc.text("Cases", 107, 208, { align: "center" });
		doc.text("Appointments", 172, 208, { align: "center" });

		// Footer
		doc.setTextColor(...secondaryColor);
		doc.setFont("helvetica", "italic");
		doc.setFontSize(10);
		const currentDate = new Date().toLocaleDateString();
		doc.text(`Generated on: ${currentDate}`, 15, 250);
		doc.text("MedReminder - Professional Medical Management System", 105, 250, {
			align: "center",
		});

		doc.save("doctor-profile.pdf");
	};

	return (
		<div className='min-h-screen '>
			{/* Header */}
			<header className='bg-white shadow-sm border-b mb-6'>
				<div className='max-w-7xl mx-auto px-6 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<div className='w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-lg font-bold'>
								{getInitials(profile.name)}
							</div>
							<div>
								<h1 className='text-2xl font-bold text-gray-900'>
									{role === "medical" ? <> Dr. {profile.name}</> : <>{profile.name}</>}
								</h1>
								<p className='text-gray-500 text-sm'>{profile.profession}</p>
							</div>
						</div>
						<div className='flex space-x-3'>
							{role === "medical" && (
								<EditDoctor auth={auth} onProfileUpdate={handleProfileUpdate} />
							)}

							{role === "patient" && (
								<EditPatient auth={auth} onProfileUpdate={handleProfileUpdate} />
							)}

							{role === "medical" ? (
								<button
									className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
									onClick={handleDownload}
								>
									<Download className='w-4 h-4' />
									<span>Download Profile</span>
								</button>
							) : (
								<button
									className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
									onClick={downloadPatientReport}
								>
									<FileText className='w-4 h-4' />
									<span>Download Report</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</header>

			<div className='flex flex-col'>{/* Sidebar */}</div>

			{/* Main Content */}
			<ProfileManage
				role={role}
				profile={profile}
				displayPatients={displayPatients}
			/>
		</div>
	);
}
