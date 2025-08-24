"use client";

import React, { useEffect, useState } from "react";
import { getPatientSchedule, formatDate } from "../funcs/ProfileFunc";
import type { PatientSchedule } from "../funcs/ProfileFunc";
import { Calendar, Clock, User, Stethoscope, CalendarDays } from "lucide-react";
import { DNA } from "react-loader-spinner";

export default function PatientSchedule() {
	const [schedules, setSchedules] = useState<PatientSchedule[]>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchSchedules = async () => {
			setLoading(true);
			try {
				const auth = JSON.parse(localStorage.getItem("auth") || "{}");
				const patientSchedules = await getPatientSchedule(auth);
				setSchedules(patientSchedules || []);
			} catch (err) {
				console.error("Error fetching patient schedules:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSchedules();
	}, []);

	if (loading) {
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

	if (schedules.length === 0) {
		return (
			<div>
				<div className='flex flex-col items-center text-center max-w-md mx-auto bg-white p-8'>
					<div className='flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6'>
						<CalendarDays className='w-10 h-10 text-blue-600' />
					</div>

					<h3 className='text-2xl font-semibold text-gray-900 mb-3'>
						No Appointments Scheduled
					</h3>

					<p className='text-gray-600 mb-6'>
						You don't have any upcoming appointments with your doctors. Schedule one
						to stay on track with your health.
					</p>

					<button className='bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-colors'>
						Schedule New Appointment
					</button>
				</div>
				<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
					<div className='p-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-gray-900'>
							Make sure you’re connected with your doctors
						</h3>
					</div>
					<div className='p-6'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							<div className='text-center'>
								<div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
									<span className='text-blue-600 font-bold'>1</span>
								</div>
								<h4 className='font-medium text-gray-900 mb-2'>Get the Code</h4>
								<p className='text-sm text-gray-600'>
									Ask your doctor for their unique connection code during your
									appointment or consultation.
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
			</div>
		);
	}

	return (
		<>
			<div className='space-y-6'>
				<div className='space-y-6'>
					{schedules.map((doctorSchedule, index) => (
						<div
							key={index}
							className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden'
						>
							{/* Doctor Header */}
							<div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b'>
								<div className='flex items-center space-x-4'>
									<div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
										<User className='w-6 h-6 text-white' />
									</div>
									<div>
										<h4 className='text-lg font-semibold text-gray-900'>
											Dr. {doctorSchedule.doctorName}
										</h4>
										<div className='flex items-center space-x-4 text-sm text-gray-600'>
											<span className='flex items-center'>
												<Stethoscope className='w-4 h-4 mr-1' />
												{doctorSchedule.doctorSpecialty}
											</span>
											<span>•</span>
											<span>{doctorSchedule.doctorProfession}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Appointments */}
							<div className='p-6'>
								<div className='space-y-4'>
									{doctorSchedule.schedules.map((schedule, scheduleIndex) => (
										<div
											key={scheduleIndex}
											className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
										>
											<div className='flex items-start justify-between mb-3'>
												<div className='flex-1'>
													<h5 className='font-semibold text-gray-900 mb-1'>
														{schedule.diagnosis}
													</h5>
													<div className='flex items-center text-sm text-gray-600 mb-2'>
														<Clock className='w-4 h-4 mr-1' />
														{formatDate(schedule.schedule)}
													</div>
												</div>
												<div className='ml-4'>
													<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
														Upcoming
													</span>
												</div>
											</div>

											<div className='bg-gray-50 rounded-lg p-3'>
												<h6 className='font-medium text-gray-900 mb-2'>Treatment Plan:</h6>
												<p className='text-sm text-gray-700 leading-relaxed'>
													{schedule.medicalTreatment}
												</p>
											</div>

											{/* <div className="mt-3 flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Reschedule
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Cancel
                      </button>
                    </div> */}
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Summary Stats */}
				<div className='bg-white border border-gray-200 rounded-xl p-6'>
					<h4 className='font-semibold text-gray-900 mb-4'>Schedule Summary</h4>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='text-center p-4 bg-blue-50 rounded-lg'>
							<div className='text-2xl font-bold text-blue-600'>
								{schedules.reduce(
									(total, doctor) => total + doctor.schedules.length,
									0
								)}
							</div>
							<div className='text-sm text-gray-600'>Total Appointments</div>
						</div>
						<div className='text-center p-4 bg-green-50 rounded-lg'>
							<div className='text-2xl font-bold text-green-600'>
								{schedules.length}
							</div>
							<div className='text-sm text-gray-600'>Doctors</div>
						</div>
						<div className='text-center p-4 bg-purple-50 rounded-lg'>
							<div className='text-2xl font-bold text-purple-600'>
								{/* {schedules.reduce((total, doctor) => {
								const upcomingCount = doctor.schedules.filter(
									(schedule) => new Date(schedule.schedule) > new Date()
								).length;
								return total + upcomingCount;
							}, 0)} */}
								{schedules.reduce(
									(total, doctor) => total + doctor.schedules.length,
									0
								)}
							</div>
							<div className='text-sm text-gray-600'>Upcoming</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
