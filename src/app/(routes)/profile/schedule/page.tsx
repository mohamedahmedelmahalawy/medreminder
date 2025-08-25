"use client";

import MedicalSchedule from "@/app/components/MedicalSchedule";
import PatientSchedule from "@/app/components/PatientSchedule";
import { getPatients, getProfile } from "@/app/funcs/ProfileFunc";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
// import { Bell, Search, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SchedulePage() {
	// const [profile, setProfile] = useState<DoctorPatient | null>(null);
	// const [doctorsPatient, setDoctorsPatient] = useState<DoctorPatient[] | null>(
	//   null
	// );
	const [role, setRole] = useState<string>("");

	useEffect(() => {
		const fetchProfile = async () => {
			const auth = JSON.parse(localStorage.getItem("auth") || "{}");
			try {
				const profileRole = auth.role;
				setRole(profileRole);
				// const fetchedProfile = await getProfile(auth);
				// setProfile(fetchedProfile);

				if (profileRole === "medical") {
					const DoctorsPatient = await getPatients(auth);
					// setDoctorsPatient(DoctorsPatient);
				}
			} catch (error) {
				console.error("Failed to fetch profile:", error);
			}
		};

		fetchProfile();
	}, []);

	return (
		<>
			{role === "patient" && (
				<header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4 mb-4'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-2xl font-bold text-gray-900 capitalize'>
								My Appointments
							</h1>
							<p className='text-gray-600'>View your upcoming medical appointments.</p>
						</div>
					</div>
				</header>
			)}

			<div className=''>
				{/* Today's Schedule */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
					<div className='p-6'>
						{role === "medical" && <MedicalSchedule />}

						{role === "patient" && <PatientSchedule />}
					</div>
				</div>
			</div>
		</>
	);
}
