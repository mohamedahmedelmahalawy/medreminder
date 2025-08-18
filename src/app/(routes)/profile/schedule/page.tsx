import { Bell, Search, Settings } from "lucide-react";
import React from "react";

export default function SchedulePage() {
	const appointments = [
		{
			id: 1,
			time: "9:00 AM",
			patient: "John Doe",
			type: "Consultation",
			status: "confirmed",
		},
		{
			id: 2,
			time: "10:30 AM",
			patient: "Jane Smith",
			type: "Follow-up",
			status: "pending",
		},
		{
			id: 3,
			time: "2:00 PM",
			patient: "Mike Johnson",
			type: "Check-up",
			status: "confirmed",
		},
		{
			id: 4,
			time: "3:30 PM",
			patient: "Sarah Wilson",
			type: "Consultation",
			status: "cancelled",
		},
		{
			id: 5,
			time: "4:45 PM",
			patient: "David Brown",
			type: "Follow-up",
			status: "confirmed",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "confirmed":
				return "text-green-600 bg-green-100";
			case "pending":
				return "text-yellow-600 bg-yellow-100";
			case "cancelled":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	return (
		<>
			<header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-bold text-gray-900 capitalize'>Schedule</h1>
						<p className='text-gray-600'>Welcome back, Dr. Smith</p>
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
			<div className='space-y-6'>
				{/* Today's Schedule */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
					<div className='p-6 border-b border-gray-200'>
						<div className='flex items-center justify-between'>
							<h3 className='text-lg font-semibold text-gray-900'>Today's Schedule</h3>
							<button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
								Add Appointment
							</button>
						</div>
						<p className='text-gray-600 mt-1'>Monday, August 17, 2025</p>
					</div>

					<div className='p-6'>
						<div className='space-y-4'>
							{appointments.map((appointment) => (
								<div
									key={appointment.id}
									className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
								>
									<div className='flex items-center space-x-4'>
										<div className='text-center'>
											<p className='text-sm font-medium text-gray-900'>
												{appointment.time}
											</p>
										</div>
										<div className='w-px h-12 bg-gray-200'></div>
										<div>
											<h4 className='text-sm font-medium text-gray-900'>
												{appointment.patient}
											</h4>
											<p className='text-sm text-gray-600'>{appointment.type}</p>
										</div>
									</div>

									<div className='flex items-center space-x-4'>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
												appointment.status
											)}`}
										>
											{appointment.status.charAt(0).toUpperCase() +
												appointment.status.slice(1)}
										</span>
										<div className='flex space-x-2'>
											<button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
												Edit
											</button>
											<button className='text-red-600 hover:text-red-800 text-sm font-medium'>
												Cancel
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Weekly Overview */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
					<div className='p-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-gray-900'>Weekly Overview</h3>
					</div>
					<div className='p-6'>
						<div className='grid grid-cols-7 gap-4'>
							{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
								<div key={day} className='text-center'>
									<div className='text-sm font-medium text-gray-600 mb-2'>{day}</div>
									<div
										className={`w-full h-20 rounded-lg border-2 border-dashed ${
											index === 0 ? "border-blue-300 bg-blue-50" : "border-gray-200"
										} flex items-center justify-center`}
									>
										<span className='text-sm text-gray-500'>
											{index === 0 ? "5 appts" : `${Math.floor(Math.random() * 8)} appts`}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
