"use client";

import { getCode, getDoctor, getPatientDoctors } from "@/app/funcs/ProfileFunc";
import { Bell, Search, Settings, User, UserPlus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Doctor } from "@/lib/interfaces/Doctor";

export default function CodePages() {
	const [doctorCode, setDoctorCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [connectionStatus, setConnectionStatus] = useState<
		"none" | "success" | "error"
	>("none");
	const [connectedDoctor, setConnectedDoctor] = useState<any>(null);
	const [myDoctors, setMyDoctors] = useState<Doctor[]>([]);
	const [doctorsLoading, setDoctorsLoading] = useState(true);

	// Fetch doctors when component mounts
	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const auth = JSON.parse(localStorage.getItem("auth") || "{}");
				if (auth.userDetails?.phone) {
					const doctors = await getPatientDoctors(auth.userDetails.phone);
					setMyDoctors(doctors);
				}
			} catch (error) {
				console.error("Error fetching doctors:", error);
			} finally {
				setDoctorsLoading(false);
			}
		};
		fetchDoctors();
	}, []);

	const handleSubmitCode = async () => {
		if (!doctorCode.trim()) {
			alert("Please enter a doctor code");
			return;
		}

		setIsLoading(true);

		try {
			// Get auth from localStorage
			const auth = JSON.parse(localStorage.getItem("auth") || "{}");

			// Call getCode with the input code
			const result = await getCode(doctorCode, auth.userDetails?.phone);

			if (result) {
				// If getCode succeeds, fetch doctor details
				const doctorData = await getDoctor(doctorCode);

				if (doctorData) {
					setConnectionStatus("success");
					setConnectedDoctor({
						name: doctorData.name,
						specialization: doctorData.specialty,
						hospital: doctorData.city,
						code: doctorCode,
					});
				} else {
					setConnectionStatus("error");
				}
			} else {
				setConnectionStatus("error");
			}
		} catch (error) {
			console.error("Error connecting to doctor:", error);
			setConnectionStatus("error");
		} finally {
			setIsLoading(false);
		}
	};

	// Removed the hardcoded getCode call from useEffect
	// Now getCode will only be called when user submits a code

	const handleDisconnect = () => {
		setDoctorCode("");
		setConnectionStatus("none");
		setConnectedDoctor(null);
	};

	return (
		<div className='space-y-6'>
			{/* Add Doctor Section */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
				<header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-2xl font-bold text-gray-900 capitalize'>
								Connect with Your Doctor
							</h1>
							<p className='text-gray-600'>
								Enter your doctor's unique code to establish a connection
							</p>
						</div>
						<div className='flex items-center space-x-4'>
							<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
								<Search className='w-5 h-5' />
							</button>
							<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors relative'>
								<Bell className='w-5 h-5' />
								<span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
							</button>
							<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
								<Settings className='w-5 h-5' />
							</button>
						</div>
					</div>
				</header>

				<div className='p-6'>
					{connectionStatus === "none" && (
						<div className='max-w-md'>
							<label className='block font-bold text-gray-700 mb-2'>
								Doctor's Code
							</label>
							<div className='flex space-x-3'>
								<input
									type='text'
									value={doctorCode}
									onChange={(e) => setDoctorCode(e.target.value)}
									placeholder="Enter doctor's code (e.g., DR123456)"
									className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									maxLength={20}
								/>
								<button
									onClick={handleSubmitCode}
									disabled={isLoading}
									className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
								>
									{isLoading ? "Connecting..." : "Connect"}
								</button>
							</div>
							<p className='text-sm text-gray-500 mt-2'>
								Ask your doctor for their unique connection code during your visit
							</p>
						</div>
					)}

					{connectionStatus === "success" && connectedDoctor && (
						<div className='max-w-md'>
							<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
								<div className='flex items-center space-x-3'>
									<div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
										<UserPlus className='w-5 h-5 text-green-600' />
									</div>
									<div className='flex-1'>
										<h4 className='font-medium text-green-900'>
											Successfully Connected!
										</h4>
										<p className='text-sm text-green-700'>
											Connected to {connectedDoctor.name} ({connectedDoctor.specialization}
											)
										</p>
									</div>
								</div>
								<div className='mt-4 flex space-x-3'>
									<button
										onClick={() => setConnectionStatus("none")}
										className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
									>
										Add Another Doctor
									</button>
									<Link
										href='/profile'
										onClick={handleDisconnect}
										className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
									>
										Close
									</Link>
								</div>
							</div>
						</div>
					)}

					{connectionStatus === "error" && (
						<div className='max-w-md'>
							<div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
								<div className='flex items-center space-x-3'>
									<div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
										<UserPlus className='w-5 h-5 text-red-600' />
									</div>
									<div className='flex-1'>
										<h4 className='font-medium text-red-900'>Connection Failed</h4>
										<p className='text-sm text-red-700'>
											Invalid doctor code. Please check with your doctor and try again.
										</p>
									</div>
								</div>
							</div>
							<button
								onClick={() => setConnectionStatus("none")}
								className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
							>
								Try Again
							</button>
						</div>
					)}
				</div>
			</div>

			{/* How it Works */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
				<div className='p-6 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>How It Works</h3>
				</div>
				<div className='p-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='text-center'>
							<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<span className='text-blue-600 font-bold'>1</span>
							</div>
							<h4 className='font-medium text-gray-900 mb-2'>Get the Code</h4>
							<p className='text-sm text-gray-600'>
								Ask your doctor for their unique connection code during your appointment
								or consultation.
							</p>
						</div>
						<div className='text-center'>
							<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<span className='text-green-600 font-bold'>2</span>
							</div>
							<h4 className='font-medium text-gray-900 mb-2'>Enter the Code</h4>
							<p className='text-sm text-gray-600'>
								Input the code in the field above and click connect to establish the
								connection.
							</p>
						</div>
						<div className='text-center'>
							<div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3'>
								<span className='text-purple-600 font-bold'>3</span>
							</div>
							<h4 className='font-medium text-gray-900 mb-2'>Stay Connected</h4>
							<p className='text-sm text-gray-600'>
								Access your medical records, schedule appointments, and communicate
								securely.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* My Doctors */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
				<div className='p-6 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900'>
						My Connected Doctors
					</h3>
					<p className='text-gray-600 mt-1'>
						Doctors you're currently connected with
					</p>
				</div>
				<div className='p-6'>
					{doctorsLoading ? (
						<div className='text-center py-8'>
							<UserPlus className='w-12 h-12 text-gray-400 mx-auto mb-3' />
							<h4 className='font-medium text-gray-900 mb-2'>Loading Doctors...</h4>
							<p className='text-gray-600'>
								Please wait while we fetch your connected doctors.
							</p>
						</div>
					) : myDoctors.length === 0 ? (
						<div className='text-center py-8'>
							<UserPlus className='w-12 h-12 text-gray-400 mx-auto mb-3' />
							<h4 className='font-medium text-gray-900 mb-2'>No Connected Doctors</h4>
							<p className='text-gray-600'>
								Use a doctor's code above to connect with your healthcare provider
							</p>
						</div>
					) : (
						<div className='space-y-4'>
							{myDoctors.map((doctor) => (
								<div
									key={doctor.code}
									className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
								>
									<div className='flex items-center space-x-4'>
										<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
											<User className='w-6 h-6 text-blue-600' />
										</div>
										<div>
											<h4 className='font-medium text-gray-900'>{doctor.name}</h4>
											<p className='text-sm text-gray-600'>
												{doctor.specialty} • {doctor.city}
											</p>
											<p className='text-xs text-gray-500'>
												{doctor.profession} • {doctor.country}
											</p>
										</div>
									</div>
									<div className='flex items-center space-x-3'>
										<span className='px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
											active
										</span>
										<button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
											View Profile
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Sample Codes for Testing */}
			<div className='bg-gray-50 rounded-xl border border-gray-200 p-6'>
				<h4 className='font-medium text-gray-900 mb-2'>For Testing Purposes:</h4>
				<p className='text-sm text-gray-600 mb-2'>Try these sample doctor codes:</p>
				<div className='flex flex-wrap gap-2'>
					<code className='px-3 py-1 bg-white border rounded text-sm font-mono'>
						DR123456
					</code>
					<code className='px-3 py-1 bg-white border rounded text-sm font-mono'>
						MED789012
					</code>
				</div>
			</div>
		</div>
	);
}
