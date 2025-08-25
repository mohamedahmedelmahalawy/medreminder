"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Experience } from "../(routes)/profile/page";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { DiagnosisEntry } from "@/lib/interfaces/DiagnosisEntry";
import { Doctor } from "@/lib/interfaces/Doctor";
import { getPatientDoctors } from "../funcs/ProfileFunc";
import {
	Briefcase,
	Calendar,
	Mail,
	MapPin,
	Phone,
	User,
	Users,
	UserPlus,
} from "lucide-react";
import { formatDate } from "../funcs/ProfileFunc";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ProfileManage({
	role,
	profile,
	displayPatients,
}: {
	role: string;
	profile: DoctorPatient;
	displayPatients: DoctorPatient[];
}) {
	const [activeTab, setActiveTab] = useState<
		"about" | "experience" | "patients" | "schedule" | "doctors"
	>("about");

	useEffect(() => {
		if (role === "medical") {
			setActiveTab("about");
		} else if (role === "patient") {
			setActiveTab("about");
		}
	}, [role]);

	const [myDoctors, setMyDoctors] = useState<Doctor[]>([]);
	const [doctorsLoading, setDoctorsLoading] = useState(true);

	// Fetch doctors when component mounts
	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				if (role === "patient" && profile.phone) {
					const doctors = await getPatientDoctors(profile.phone);
					setMyDoctors(doctors);
				}
			} catch (error) {
				console.error("Error fetching doctors:", error);
			} finally {
				setDoctorsLoading(false);
			}
		};

		fetchDoctors();
	}, [role, profile.phone]);

	// Example: memoize derived list (filtering or sorting)
	const sortedDoctors = useMemo(() => {
		return [...myDoctors].sort((a, b) => a.name.localeCompare(b.name));
	}, [myDoctors]);

	const [selectedPatient, setSelectedPatient] = useState<DoctorPatient | null>(
		null
	);

	const getProfessionExperiences = (profession: string): Experience[] => {
		let experiences: Experience[] = [];

		if (profession === "General Practitioner") {
			experiences = [
				{
					title: "Primary Care Physician",
					institution: "Community Health Clinic",
					period: "2020 - Present",
					description: [
						"Providing comprehensive medical care for patients of all ages",
						"Managing preventive healthcare and chronic disease follow-up",
						"Performing routine check-ups and minor medical procedures",
						"Collaborating with specialists for patient referrals",
					],
					specializations: [
						"Preventive Medicine",
						"Family Care",
						"Chronic Disease Management",
					],
				},
			];
		} else if (profession === "Surgeon") {
			experiences = [
				{
					title: "General Surgeon",
					institution: "City Hospital",
					period: "2019 - Present",
					description: [
						"Performing surgical procedures including appendectomies and hernia repairs",
						"Collaborating with anesthesiologists and surgical teams",
						"Conducting post-operative care and monitoring patient recovery",
						"Researching and adopting minimally invasive surgical techniques",
					],
					specializations: [
						"General Surgery",
						"Minimally Invasive Surgery",
						"Post-Operative Care",
					],
				},
			];
		} else if (profession === "Pediatrician") {
			experiences = [
				{
					title: "Pediatric Specialist",
					institution: "Children’s Medical Center",
					period: "2021 - Present",
					description: [
						"Providing preventive and acute care for children and adolescents",
						"Diagnosing and treating pediatric illnesses and developmental issues",
						"Administering vaccinations and guiding parents on child health",
						"Collaborating with schools for child health awareness",
					],
					specializations: ["Pediatric Care", "Immunization", "Child Development"],
				},
			];
		} else if (profession === "Dentist") {
			experiences = [
				{
					title: "Dental Surgeon",
					institution: "Smile Dental Clinic",
					period: "2018 - Present",
					description: [
						"Performing dental examinations, fillings, and extractions",
						"Educating patients on oral hygiene and preventive care",
						"Using modern tools for root canal treatments and cosmetic dentistry",
						"Collaborating with orthodontists and oral surgeons for complex cases",
					],
					specializations: [
						"General Dentistry",
						"Cosmetic Dentistry",
						"Oral Surgery",
					],
				},
			];
		} else if (profession === "Cardiologist") {
			experiences = [
				{
					title: "Interventional Cardiologist",
					institution: "Heart Care Institute",
					period: "2020 - Present",
					description: [
						"Diagnosing and treating cardiovascular diseases",
						"Performing angioplasty, stent placement, and echocardiograms",
						"Managing patients with hypertension and arrhythmias",
						"Conducting research on new cardiac treatment protocols",
					],
					specializations: [
						"Interventional Cardiology",
						"Cardiac Imaging",
						"Hypertension Management",
					],
				},
			];
		} else {
			experiences = [
				{
					title: "Medical Doctor",
					institution: "Healthcare Technology Solutions",
					period: "2023 - Present",
					description: [
						"Managing and analyzing patient medical records for accurate diagnosis and treatment",
						"Monitoring chronic disease patients through digital health tools",
						"Utilizing medical data to track treatment outcomes and improve care",
						"Collaborating with healthcare teams to implement patient-centered solutions",
					],
					specializations: [
						"Clinical Medicine",
						"Medical Records Management",
						"Chronic Disease Care",
						"Patient Monitoring",
					],
				},
				{
					title: "Resident Doctor",
					institution: "Medical Technology Company",
					period: "2022 - 2023",
					description: [
						"Reviewed and interpreted patient test results and medical data",
						"Assisted in developing digital patient charts and tracking systems",
						"Provided clinical input for healthcare process improvements",
						"Ensured accurate documentation of medical history and treatments",
					],
					specializations: [
						"Internal Medicine",
						"Patient Data Review",
						"Clinical Documentation",
					],
				},
			];
		}

		return experiences;
	};

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
				<div className='max-w-7xl mx-auto'>
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
											tab='about'
											label='About'
											icon={<User className='w-4 h-4' />}
										/>
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

						<div className='p-12'>
							{/* Doctor About Page */}
							{activeTab === "about" && role === "medical" && (
								<div className='space-y-6'>
									<div className='w-full'>
										<div className='max-w-7xl mx-auto'>
											{/* Top Section - Contact & Professional Details Side by Side */}
											<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
												{/* Contact Information Card */}
												<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100'>
													<h3 className='text-lg font-bold text-gray-900 mb-6 flex items-center'>
														<User className='w-5 h-5 mr-2 text-blue-600' />
														Contact Information
													</h3>
													<div className='space-y-4'>
														<div className='flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
															<div className='p-2 bg-blue-100 rounded-full'>
																<MapPin className='w-4 h-4 text-blue-600' />
															</div>
															<div>
																<p className='text-sm text-gray-500'>Location</p>
																<p className='font-medium text-gray-900'>
																	{profile.city}, {profile.country}
																</p>
															</div>
														</div>
														<div className='flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
															<div className='p-2 bg-green-100 rounded-full'>
																<Mail className='w-4 h-4 text-green-600' />
															</div>
															<div>
																<p className='text-sm text-gray-500'>Email</p>
																<p className='font-medium text-gray-900'>{profile.email}</p>
															</div>
														</div>
														<div className='flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
															<div className='p-2 bg-purple-100 rounded-full'>
																<Phone className='w-4 h-4 text-purple-600' />
															</div>
															<div>
																<p className='text-sm text-gray-500'>Phone</p>
																<p className='font-medium text-gray-900'>{profile.phone}</p>
															</div>
														</div>
													</div>
												</div>

												{/* Professional Details Card */}
												<div className='bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-indigo-100'>
													<h3 className='text-lg font-bold text-gray-900 mb-6 flex items-center'>
														<Briefcase className='w-5 h-5 mr-2 text-indigo-600' />
														Professional Details
													</h3>
													<div className='space-y-4'>
														{role === "medical" && (
															<div className='flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
																<span className='text-gray-600 font-medium'>Doctor Code</span>
																<span className='font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full'>
																	{profile.code}
																</span>
															</div>
														)}
														<div className='flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
															<span className='text-gray-600 font-medium'>Age</span>
															<span className='font-medium text-gray-900'>
																{profile.Age || profile.age} years
															</span>
														</div>
														<div className='flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
															<span className='text-gray-600 font-medium'>Speciality</span>
															<span className='font-medium text-gray-900'>
																{profile.profession}, {profile.specialty}
															</span>
														</div>
													</div>
												</div>
											</div>

											{/* Bottom Section - Patient Overview Full Width */}
											<div className='bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-100'>
												<h3 className='text-lg font-bold text-gray-900 mb-6 flex items-center'>
													<Users className='w-5 h-5 mr-2 text-emerald-600' />
													Patient Overview
												</h3>
												<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
													<div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
														<div className='flex items-center justify-between mb-2'>
															<span className='text-gray-600 font-medium'>Total Patients</span>
															<div className='p-2 bg-blue-100 rounded-full'>
																<Users className='w-4 h-4 text-blue-600' />
															</div>
														</div>
														<div className='text-3xl font-bold text-blue-600'>
															{displayPatients.length}
														</div>
														<p className='text-sm text-gray-500 mt-1'>Registered patients</p>
													</div>

													<div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
														<div className='flex items-center justify-between mb-2'>
															<span className='text-gray-600 font-medium'>Active Cases</span>
															<div className='p-2 bg-orange-100 rounded-full'>
																<Briefcase className='w-4 h-4 text-orange-600' />
															</div>
														</div>
														<div className='text-3xl font-bold text-orange-600'>
															{displayPatients.reduce(
																(total: number, patient: DoctorPatient) =>
																	total +
																	(patient.cases?.reduce(
																		(caseTotal: number, c: any) => caseTotal + c.diagnosis.length,
																		0
																	) || 0),
																0
															)}
														</div>
														<p className='text-sm text-gray-500 mt-1'>Ongoing treatments</p>
													</div>

													<div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
														<div className='flex items-center justify-between mb-2'>
															<span className='text-gray-600 font-medium'>
																Upcoming Appointments
															</span>
															<div className='p-2 bg-green-100 rounded-full'>
																<Calendar className='w-4 h-4 text-green-600' />
															</div>
														</div>
														<div className='text-3xl font-bold text-green-600'>
															{displayPatients.reduce(
																(total: number, patient: DoctorPatient) =>
																	total +
																	(patient.cases?.reduce(
																		(caseTotal: number, c: any) => caseTotal + c.diagnosis.length,
																		0
																	) || 0),
																0
															)}
														</div>
														<p className='text-sm text-gray-500 mt-1'>Scheduled visits</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Medical & Technical Services
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-3">
                            {service.icon}
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">
                                {service.name}
                              </h5>
                              <p className="text-gray-600 text-sm">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}

									{/* <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Medical Approach
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 italic">
                        "Combining traditional medical expertise with modern
                        data science to provide evidence-based, personalized
                        healthcare solutions. My approach focuses on leveraging
                        technology to enhance patient care and improve health
                        outcomes."
                      </p>
                    </div>
                  </div> */}
								</div>
							)}

							{/* Patient about page */}
							{activeTab === "about" && role === "patient" && (
								<div className='space-y-6'>
									<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100'>
										<h3 className='text-lg font-bold text-gray-900 mb-6 flex items-center'>
											<User className='w-5 h-5 mr-2 text-blue-600' />
											Information
										</h3>
										<div className='space-y-4'>
											<div className='flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
												<div className='p-2 bg-blue-100 rounded-full'>
													<MapPin className='w-4 h-4 text-blue-600' />
												</div>
												<div>
													<p className='text-sm text-gray-500'>Location</p>
													<p className='font-medium text-gray-900'>{profile.country}</p>
												</div>
											</div>
											<div className='flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
												<div className='p-2 bg-green-100 rounded-full'>
													<Mail className='w-4 h-4 text-green-600' />
												</div>
												<div>
													<p className='text-sm text-gray-500'>Email</p>
													<p className='font-medium text-gray-900 text-sm'>
														{profile.email}
													</p>
												</div>
											</div>
											<div className='flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
												<div className='p-2 bg-blue-100 rounded-full'>
													<User className='w-4 h-4 text-blue-600' />
												</div>
												<div>
													<p className='text-sm text-gray-500'>Age</p>
													<p className='font-medium text-gray-900'>{profile.age}</p>
												</div>
											</div>
											<div className='flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100'>
												<div className='p-2 bg-purple-100 rounded-full'>
													<Phone className='w-4 h-4 text-purple-600' />
												</div>
												<div>
													<p className='text-sm text-gray-500'>Phone</p>
													<p className='font-medium text-gray-900'>{profile.phone}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{activeTab === "experience" && (
								<div className='space-y-6'>
									<h3 className='text-xl font-bold text-gray-900 mb-6'>
										Professional Experience
									</h3>
									{getProfessionExperiences(profile.profession || "").map(
										(exp, index) => (
											<div key={index} className='border-l-4 border-blue-500 pl-6 pb-6'>
												<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2'>
													<h4 className='text-lg font-semibold text-gray-900'>
														{exp.title}
													</h4>
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
										)
									)}
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
															<h4 className='font-semibold text-gray-900 mb-1'>
																{patient.name}
															</h4>
															<p className='text-gray-600 text-sm'>
																ID: {patient.id} • Age: {patient.age} • {patient.profession}
															</p>
														</div>
														<div className='text-right'>
															<p className='text-sm text-gray-500 mb-2'>{patient.country}</p>
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
														<button
															className='text-blue-600 hover:text-blue-800'
															onClick={(e) => {
																e.stopPropagation();
																redirect(`/patients/${patient.phone}`);
															}}
														>
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
									<div className='flex items-center justify-between'>
										<h3 className='text-xl font-bold text-gray-900'>
											My Connected Doctors
										</h3>
										<Link
											href='/profile/code'
											className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
										>
											+ Add Doctor
										</Link>
									</div>

									{doctorsLoading ? (
										<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100'>
											<div className='text-center'>
												<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
													<UserPlus className='w-8 h-8 text-blue-600' />
												</div>
												<h4 className='font-semibold text-gray-900 mb-2 text-lg'>
													Loading Your Doctors
												</h4>
												<p className='text-gray-600 max-w-md mx-auto'>
													Please wait while we fetch your connected healthcare providers.
												</p>
											</div>
										</div>
									) : myDoctors.length === 0 ? (
										<div className='bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-100'>
											<div className='text-center'>
												<div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4'>
													<UserPlus className='w-8 h-8 text-amber-600' />
												</div>
												<h4 className='font-semibold text-gray-900 mb-2 text-lg'>
													No Doctors Connected Yet
												</h4>
												<p className='text-gray-600 mb-6 max-w-md mx-auto'>
													Connect with your healthcare providers to access your medical
													records, schedule appointments, and stay updated on your health.
												</p>
												<Link
													href='/profile/code'
													className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg'
												>
													<UserPlus className='w-4 h-4 mr-2' />
													Connect Your First Doctor
												</Link>
											</div>
										</div>
									) : (
										<div className='grid gap-6'>
											{sortedDoctors.map((doctor) => (
												<div
													key={doctor.code}
													className='bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-6 border border-gray-200 '
												>
													<div className='flex items-center justify-between'>
														<div className='flex items-center space-x-4'>
															<div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-md'>
																<User className='w-8 h-8 text-blue-600' />
															</div>
															<div className='space-y-1'>
																<h4 className='font-bold text-gray-900 text-lg'>
																	Dr. {doctor.name}
																</h4>
																<div className='flex items-center space-x-2'>
																	<span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full'>
																		{doctor.profession}
																	</span>
																	<span className='px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full'>
																		{doctor.specialty}
																	</span>
																</div>
																<div className='flex items-center space-x-4 text-sm text-gray-600'>
																	<div className='flex items-center space-x-1'>
																		<MapPin className='w-4 h-4 text-gray-400' />
																		<span>
																			{doctor.city}, {doctor.country}
																		</span>
																	</div>
																</div>
															</div>
														</div>
														<div className='flex flex-col items-end space-y-3'>
															<div className='flex items-center space-x-2'>
																<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
																<span className='text-green-700 text-sm font-medium'>
																	Connected
																</span>
															</div>
														</div>
													</div>

													{/* Additional Info Section */}
													<div className='mt-6 pt-6 border-t border-gray-200'>
														<div className='grid grid-cols-2 gap-4 text-sm'>
															<div className='flex items-center space-x-2'>
																<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
																<span className='text-gray-600'>Doctor Code:</span>
																<span className='font-mono font-medium text-gray-900'>
																	{doctor.code}
																</span>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
