import { Bell, FileText, Search, Settings, User } from "lucide-react";
import React from "react";

export default function EvaluationPage() {
	const patientRecord = {
		diagnosis: "Type 2 Diabetes Mellitus",
		prognosis:
			"With adherence to medication, lifestyle modifications, and regular follow-ups, the patient can maintain good glycemic control and prevent long-term complications.",
		medicalReport:
			"Patient exhibits elevated fasting blood glucose levels over the past 3 months. HbA1c is 7.5%. No signs of diabetic retinopathy. Blood pressure is within normal range.",
		medicalTreatment:
			"Metformin 500mg twice daily, dietary modifications, regular exercise, and quarterly check-ups.",
	};

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
					<div className='p-6'>
						<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
							<p className='text-red-800 font-medium'>{patientRecord.diagnosis}</p>
						</div>
					</div>
				</div>

				{/* Prognosis */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
					<div className='p-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-gray-900 flex items-center'>
							<div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3'>
								<FileText className='w-4 h-4 text-green-600' />
							</div>
							Prognosis
						</h3>
					</div>
					<div className='p-6'>
						<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
							<p className='text-green-800 text-sm leading-relaxed'>
								{patientRecord.prognosis}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Medical Report */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
				<div className='p-6 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900 flex items-center'>
						<div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
							<FileText className='w-4 h-4 text-blue-600' />
						</div>
						Medical Report
					</h3>
				</div>
				<div className='p-6'>
					<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
						<p className='text-blue-800 text-sm leading-relaxed'>
							{patientRecord.medicalReport}
						</p>
					</div>

					{/* Key Findings */}
					<div className='mt-6'>
						<h4 className='font-medium text-gray-900 mb-3'>Key Findings</h4>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<div className='bg-gray-50 rounded-lg p-3'>
								<p className='text-xs text-gray-600 uppercase tracking-wide'>
									HbA1c Level
								</p>
								<p className='text-lg font-semibold text-gray-900'>7.5%</p>
								<p className='text-xs text-yellow-600'>Above Target</p>
							</div>
							<div className='bg-gray-50 rounded-lg p-3'>
								<p className='text-xs text-gray-600 uppercase tracking-wide'>
									Blood Pressure
								</p>
								<p className='text-lg font-semibold text-gray-900'>Normal</p>
								<p className='text-xs text-green-600'>Within Range</p>
							</div>
							<div className='bg-gray-50 rounded-lg p-3'>
								<p className='text-xs text-gray-600 uppercase tracking-wide'>
									Retinopathy
								</p>
								<p className='text-lg font-semibold text-gray-900'>None</p>
								<p className='text-xs text-green-600'>No Signs</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Medical Treatment */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
				<div className='p-6 border-b border-gray-200'>
					<h3 className='text-lg font-semibold text-gray-900 flex items-center'>
						<div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3'>
							<FileText className='w-4 h-4 text-purple-600' />
						</div>
						Treatment Plan
					</h3>
				</div>
				<div className='p-6'>
					<div className='bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6'>
						<p className='text-purple-800 text-sm leading-relaxed'>
							{patientRecord.medicalTreatment}
						</p>
					</div>

					{/* Treatment Details */}
					<div className='space-y-4'>
						<div className='flex items-start space-x-3'>
							<div className='w-2 h-2 bg-purple-500 rounded-full mt-2'></div>
							<div>
								<h4 className='font-medium text-gray-900'>Medication</h4>
								<p className='text-sm text-gray-600'>Metformin 500mg twice daily</p>
							</div>
						</div>
						<div className='flex items-start space-x-3'>
							<div className='w-2 h-2 bg-purple-500 rounded-full mt-2'></div>
							<div>
								<h4 className='font-medium text-gray-900'>Lifestyle Modifications</h4>
								<p className='text-sm text-gray-600'>
									Dietary changes and regular exercise program
								</p>
							</div>
						</div>
						<div className='flex items-start space-x-3'>
							<div className='w-2 h-2 bg-purple-500 rounded-full mt-2'></div>
							<div>
								<h4 className='font-medium text-gray-900'>Follow-up Schedule</h4>
								<p className='text-sm text-gray-600'>
									Quarterly check-ups for monitoring and adjustment
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
