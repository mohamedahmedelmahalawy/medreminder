// app/components/MedicalProfileClient.tsx
"use client";

import { useState, useEffect } from "react";
import {
	Users,
	Calendar,
	Phone,
	Mail,
	MapPin,
	Download,
	Edit,
} from "lucide-react";
import { getPatients, getProfile } from "@/app/funcs/ProfileFunc";
import type { Service } from "../(routes)/profile/page";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import ProfileManage from "./ProfileManage";

export default function MedicalProfile({ services }: { services: Service[] }) {
	const [profile, setProfile] = useState<DoctorPatient | null>(null);
	const [doctorsPatient, setDoctorsPatient] = useState<DoctorPatient[] | null>(
		null
	);
	const [role, setRole] = useState<string>("");

	const displayPatients =
		role === "medical" && doctorsPatient ? doctorsPatient : [];

	useEffect(() => {
		const fetchProfile = async () => {
			const auth = JSON.parse(localStorage.getItem("auth") || "{}");
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

		fetchProfile();
	}, []);

	if (!profile) {
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='text-xl text-[#000D44]'>Profile Loading ...</div>
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
							<button className='flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'>
								<Edit className='w-4 h-4' />
								<span>Edit Profile</span>
							</button>
							<button className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
								<Download className='w-4 h-4' />
								<span>Download Profile</span>
							</button>
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
				services={services}
			/>
		</div>
	);
}
