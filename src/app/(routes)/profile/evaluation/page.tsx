"use client";

import { Bell, FileText, Search, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getPatientSchedule, formatDate } from "@/app/funcs/ProfileFunc";
import type { PatientSchedule as PatientScheduleType } from "@/app/funcs/ProfileFunc";
import { DNA } from "react-loader-spinner";

export default function EvaluationPage() {
	const [schedules, setSchedules] = useState<PatientScheduleType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const auth = JSON.parse(localStorage.getItem("auth") || "{}");
				const data = await getPatientSchedule(auth);
				setSchedules(data || []);
			} catch (err) {
				console.error("Failed to fetch patient schedule:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='space-y-4'>
			{/* Patient Header */}
			<header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-bold text-gray-900 capitalize'>
							Patient Evaluation
						</h1>
						<p className='text-gray-600'>
							Comprehensive medical assessment and treatment plan
						</p>
					</div>
				</div>
			</header>

			{loading ? (
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
			) : (
				<>
					{/* Medical Records */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						{/* Diagnosis */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
							<div className='p-6 border-b border-gray-200'>
								<h3 className='text-lg font-semibold text-gray-900 flex items-center'>
									<div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3'>
										<FileText className='w-4 h-4 text-red-600' />
									</div>
									Diagnosis
								</h3>
							</div>
							<div className='p-6 space-y-4'>
								{schedules.length === 0 ? (
									<div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
										<p className='text-gray-700'>No diagnosis found.</p>
									</div>
								) : (
									schedules.map((doctor) => (
										<div key={doctor.doctorCode} className='space-y-3'>
											<p className='text-sm text-gray-500'>
												{doctor.doctorName} • {doctor.doctorSpecialty}
											</p>
											{doctor.schedules.length === 0 ? (
												<div className='bg-gray-50 border border-gray-200 rounded-lg p-3'>
													<p className='text-gray-700'>No entries</p>
												</div>
											) : (
												doctor.schedules.map((entry, idx) => (
													<div
														key={idx}
														className='bg-red-50 border border-red-200 rounded-lg p-4'
													>
														<p className='text-red-800 font-medium'>
															{entry.diagnosis || "—"}
														</p>
													</div>
												))
											)}
										</div>
									))
								)}
							</div>
						</div>

						{/* Treatment Plan */}
						<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
							<div className='p-6 border-b border-gray-200'>
								<h3 className='text-lg font-semibold text-gray-900 flex items-center'>
									<div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3'>
										<FileText className='w-4 h-4 text-purple-600' />
									</div>
									Treatment Plan
								</h3>
							</div>
							<div className='p-6 space-y-4'>
								{schedules.length === 0 ? (
									<div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
										<p className='text-gray-700'>No treatment plan available.</p>
									</div>
								) : (
									schedules.map((doctor) => (
										<div key={doctor.doctorCode} className='space-y-3'>
											<p className='text-sm text-gray-500'>
												{doctor.doctorName} • {doctor.doctorSpecialty}
											</p>
											{doctor.schedules.length === 0 ? (
												<div className='bg-gray-50 border border-gray-200 rounded-lg p-3'>
													<p className='text-gray-700'>No entries</p>
												</div>
											) : (
												doctor.schedules.map((entry, idx) => (
													<div
														key={idx}
														className='bg-purple-50 border border-purple-200 rounded-lg p-4'
													>
														<p className='text-purple-800 text-sm leading-relaxed'>
															{entry.medicalTreatment || "—"}
														</p>
													</div>
												))
											)}
										</div>
									))
								)}
							</div>
						</div>
					</div>

					{/* Follow-up Schedule */}
					<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
						<div className='p-6 border-b border-gray-200'>
							<h3 className='text-lg font-semibold text-gray-900 flex items-center'>
								<div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
									<FileText className='w-4 h-4 text-blue-600' />
								</div>
								Follow-up Schedule
							</h3>
						</div>
						<div className='p-6 space-y-4'>
							{schedules.length === 0 ? (
								<div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
									<p className='text-gray-700'>No schedules available.</p>
								</div>
							) : (
								schedules.map((doctor) => (
									<div key={doctor.doctorCode} className='space-y-3'>
										<p className='text-sm text-gray-500'>
											{doctor.doctorName} • {doctor.doctorSpecialty}
										</p>
										{doctor.schedules.length === 0 ? (
											<div className='bg-gray-50 border border-gray-200 rounded-lg p-3'>
												<p className='text-gray-700'>No entries</p>
											</div>
										) : (
											doctor.schedules.map((entry, idx) => (
												<div
													key={idx}
													className='bg-blue-50 border border-blue-200 rounded-lg p-4'
												>
													<p className='text-blue-800 text-sm'>
														{entry.schedule ? formatDate(entry.schedule) : "—"}
													</p>
												</div>
											))
										)}
									</div>
								))
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
