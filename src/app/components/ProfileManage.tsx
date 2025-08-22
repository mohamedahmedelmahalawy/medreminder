"use client";

import React, { useEffect, useState } from "react";
import { Experience, Service } from "../(routes)/profile/page";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { DiagnosisEntry } from "@/lib/interfaces/DiagnosisEntry";
import { Briefcase, Calendar, User, Users } from "lucide-react";
import { formatDate } from "../funcs/ProfileFunc";
import Link from "next/link";

export default function ProfileManage({
	role,
	profile,
	displayPatients,
	experiences,
	services,
}: {
	role: string;
	profile: DoctorPatient;
	displayPatients: DoctorPatient[];
	experiences: Experience[];
	services: Service[];
}) {
	const [activeTab, setActiveTab] = useState<
		"about" | "experience" | "patients" | "schedule" | "doctors"
	>("about");

	useEffect(() => {
		if (role === "medical") {
			setActiveTab("about");
		} else if (role === "patient") {
			setActiveTab("doctors");
		}
	}, [role]);

	const [selectedPatient, setSelectedPatient] = useState<DoctorPatient | null>(
		null
	);

	const TabButton: React.FC<{
		tab: string;
		label: string;
		icon: React.ReactNode;
	}> = ({ tab, label, icon }) => (
		<button
			onClick={() =>
				setActiveTab(
					tab as "about" | "experience" | "patients" | "schedule" | "doctors"
				)
			}
			className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
				activeTab === tab
					? "bg-blue-600 text-white shadow-lg"
					: "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
			}`}
		>
			{icon}
			<span className='font-medium'>{label}</span>
		</button>
	);
	return (
		<div>
			{" "}
			<div className='flex-1 bg-gray-50'>
				<div className='max-w-7xl mx-auto p-8'>
					<div className='bg-white rounded-xl shadow-lg'>
						{/* Tab Navigation */}
						<div className='border-b p-6'>
							<div className='flex flex-wrap gap-2'>
								{role === "medical" && (
									<>
										<TabButton
											tab='about'
											label='About'
											icon={<User className='w-4 h-4' />}
										/>

										<TabButton
											tab='experience'
											label='Experience'
											icon={<Briefcase className='w-4 h-4' />}
										/>

										<TabButton
											tab='patients'
											label='Patients'
											icon={<Users className='w-4 h-4' />}
										/>
									</>
								)}
								{role === "patient" && (
									<>
										<TabButton
											tab='doctors'
											label='Doctors'
											icon={<Users className='w-4 h-4' />}
										/>
									</>
								)}

								{/* <TabButton
                  tab="schedule"
                  label="Schedule"
                  icon={<Calendar className="w-4 h-4" />}
                /> */}
							</div>
						</div>

						{/* Tab Content */}
						<div className='p-6'>
							{activeTab === "about" && (
								<div className='space-y-6'>
									<div>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>
											About Dr. {profile.name}
										</h3>
										<p className='text-gray-600 leading-relaxed mb-6'>{profile.bio}</p>
									</div>

									<div>
										<h4 className='font-semibold text-gray-900 mb-4'>
											Medical & Technical Services
										</h4>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											{services.map((service, index) => (
												<div
													key={index}
													className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'
												>
													<div className='flex items-start space-x-3'>
														{service.icon}
														<div>
															<h5 className='font-medium text-gray-900 mb-2'>
																{service.name}
															</h5>
															<p className='text-gray-600 text-sm'>{service.description}</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>

									<div>
										<h4 className='font-semibold text-gray-900 mb-3'>Medical Approach</h4>
										<div className='bg-blue-50 p-4 rounded-lg'>
											<p className='text-blue-800 italic'>
												"Combining traditional medical expertise with modern data science to
												provide evidence-based, personalized healthcare solutions. My
												approach focuses on leveraging technology to enhance patient care
												and improve health outcomes."
											</p>
										</div>
									</div>
								</div>
							)}

							{activeTab === "experience" && (
								<div className='space-y-6'>
									<h3 className='text-xl font-bold text-gray-900 mb-6'>
										Professional Experience
									</h3>
									{experiences.map((exp, index) => (
										<div key={index} className='border-l-4 border-blue-500 pl-6 pb-6'>
											<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2'>
												<h4 className='text-lg font-semibold text-gray-900'>{exp.title}</h4>
												<span className='text-sm text-gray-500 font-medium'>
													{exp.period}
												</span>
											</div>
											<p className='text-blue-600 font-medium mb-3'>{exp.institution}</p>
											<ul className='space-y-2 mb-4'>
												{exp.description.map((desc, i) => (
													<li key={i} className='text-gray-600 text-sm'>
														• {desc}
													</li>
												))}
											</ul>
											<div className='flex flex-wrap gap-2'>
												{exp.specializations.map((spec, i) => (
													<span
														key={i}
														className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
													>
														{spec}
													</span>
												))}
											</div>
										</div>
									))}
								</div>
							)}

							{activeTab === "patients" && (
								<div className='space-y-6'>
									<div className='flex items-center justify-between'>
										<h3 className='text-xl font-bold text-gray-900'>
											Patient Management
										</h3>
										<button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
											Add New Patient
										</button>
									</div>

									{!selectedPatient ? (
										<div className='grid gap-4'>
											{displayPatients.map((patient: DoctorPatient) => (
												<div
													key={patient.phone}
													className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer'
													onClick={() => setSelectedPatient(patient)}
												>
													<div className='flex items-center justify-between mb-3'>
														<div>
															<h4 className='font-semibold text-gray-900'>{patient.name}</h4>
															<p className='text-gray-600 text-sm'>
																ID: {patient.id} • Age: {patient.age} • {patient.profession}
															</p>
														</div>
														<div className='text-right'>
															<p className='text-sm text-gray-500'>{patient.country}</p>
															<p className='text-sm font-medium text-blue-600'>
																{patient.cases?.[0]?.diagnosis?.length || 0} Active Cases
															</p>
														</div>
													</div>
													<div className='flex items-center justify-between text-sm'>
														<span className='text-gray-500'>
															Last Visit:{" "}
															{patient.dateOfAdmission
																? formatDate(patient.dateOfAdmission)
																: "N/A"}
														</span>
														<button className='text-blue-600 hover:text-blue-800'>
															View Details →
														</button>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className='space-y-6'>
											<div className='flex items-center space-x-4 mb-6'>
												<button
													onClick={() => setSelectedPatient(null)}
													className='text-blue-600 hover:text-blue-800'
												>
													← Back to Patients
												</button>
												<div>
													<h4 className='text-xl font-bold text-gray-900'>
														{selectedPatient.name}
													</h4>
													<p className='text-gray-600'>
														Patient ID: {selectedPatient.id || "N/A"}
													</p>
												</div>
											</div>

											<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
												<div className='bg-gray-50 p-4 rounded-lg'>
													<h5 className='font-semibold text-gray-900 mb-2'>
														Patient Information
													</h5>
													<div className='space-y-1 text-sm'>
														<p>
															<span className='text-gray-600'>Age:</span> {selectedPatient.age}
														</p>
														<p>
															<span className='text-gray-600'>Gender:</span>{" "}
															{selectedPatient.gender}
														</p>
														<p>
															<span className='text-gray-600'>Profession:</span>{" "}
															{selectedPatient.profession}
														</p>
														<p>
															<span className='text-gray-600'>Country:</span>{" "}
															{selectedPatient.country}
														</p>
														<p>
															<span className='text-gray-600'>Phone:</span>{" "}
															{selectedPatient.phone}
														</p>
													</div>
												</div>
												<div className='bg-blue-50 p-4 rounded-lg'>
													<h5 className='font-semibold text-gray-900 mb-2'>
														Admission Details
													</h5>
													<p className='text-sm text-gray-600'>Date of Admission:</p>
													<p className='font-medium'>
														{selectedPatient.dateOfAdmission
															? formatDate(selectedPatient.dateOfAdmission)
															: "N/A"}
													</p>
												</div>
											</div>

											<div>
												<h5 className='font-semibold text-gray-900 mb-4'>Medical Cases</h5>
												{selectedPatient.cases?.[0]?.diagnosis?.map((diag, index) => (
													<div
														key={index}
														className='border border-gray-200 rounded-lg p-4 mb-4'
													>
														<div className='flex items-start justify-between mb-3'>
															<h6 className='font-semibold text-gray-900'>{diag.diagnosis}</h6>
															<span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>
																{formatDate(diag.schedule)}
															</span>
														</div>

														<div className='space-y-3 text-sm'>
															<div>
																<p className='font-medium text-gray-700'>Chief Complaint:</p>
																<p className='text-gray-600'>{diag.complaint}</p>
															</div>

															<div>
																<p className='font-medium text-gray-700'>Medical Report:</p>
																<p className='text-gray-600'>{diag["medical-report"]}</p>
															</div>

															<div>
																<p className='font-medium text-gray-700'>Treatment Plan:</p>
																<p className='text-gray-600'>{diag["medical-treatment"]}</p>
															</div>

															<div>
																<p className='font-medium text-gray-700'>Prognosis:</p>
																<p className='text-gray-600'>{diag.prognosis}</p>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							)}

							{activeTab === "schedule" && (
								<div className='space-y-6'>
									<h3 className='text-xl font-bold text-gray-900 mb-6'>
										Upcoming Schedule
									</h3>

									{role === "medical" ? (
										<div className='grid gap-4'>
											{displayPatients.map((patient: DoctorPatient) =>
												patient.cases?.[0]?.diagnosis?.map(
													(diag: DiagnosisEntry, index: number) => (
														<div
															key={`${patient.id}-${index}`}
															className='border border-gray-200 rounded-lg p-4'
														>
															<div className='flex items-center justify-between mb-2'>
																<h4 className='font-semibold text-gray-900'>{patient.name}</h4>
																<span className='text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded'>
																	{diag.diagnosis}
																</span>
															</div>
															<div className='flex items-center justify-between text-sm text-gray-600'>
																<span>📅 {formatDate(diag.schedule)}</span>
																<span>📞 {patient.phone}</span>
															</div>
															<p className='text-sm text-gray-500 mt-2'>
																Follow-up: {diag["medical-treatment"]}
															</p>
														</div>
													)
												)
											)}
										</div>
									) : (
										<div className='text-center py-8'>
											<p className='text-gray-500 text-lg'>
												No upcoming appointments scheduled.
											</p>
											<button className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
												Schedule Appointment
											</button>
										</div>
									)}
								</div>
							)}

							{activeTab === "doctors" && (
								<div className='space-y-6'>
									<h3 className='text-xl font-bold text-gray-900 mb-6'>My Doctors</h3>

									{/* Center content */}
									<div className='flex flex-col items-center justify-center py-8 space-y-4'>
										<p className='text-gray-500 text-lg'>
											You don't have any assigned doctors yet.
										</p>
										<Link
											href='/profile/code'
											className='bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors'
										>
											Find a Doctor
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
