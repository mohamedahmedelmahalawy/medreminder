import {
	Bell,
	Calendar,
	LayoutDashboard,
	Search,
	Settings,
	User,
} from "lucide-react";
import React from "react";

export default function DashboardPage() {
	return (
		<>
			<header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-bold text-gray-900 capitalize'>Dashboard</h1>
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
				{/* Stats Cards */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>
									Today's Appointments
								</p>
								<p className='text-3xl font-bold text-gray-900'>12</p>
							</div>
							<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
								<Calendar className='w-6 h-6 text-blue-600' />
							</div>
						</div>
					</div>

					<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>Total Patients</p>
								<p className='text-3xl font-bold text-gray-900'>1,247</p>
							</div>
							<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
								<User className='w-6 h-6 text-green-600' />
							</div>
						</div>
					</div>

					<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>Pending Reviews</p>
								<p className='text-3xl font-bold text-gray-900'>8</p>
							</div>
							<div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
								<Bell className='w-6 h-6 text-yellow-600' />
							</div>
						</div>
					</div>

					<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>Monthly Revenue</p>
								<p className='text-3xl font-bold text-gray-900'>$24,580</p>
							</div>
							<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
								<LayoutDashboard className='w-6 h-6 text-purple-600' />
							</div>
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
					<div className='p-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-gray-900'>Recent Activity</h3>
					</div>
					<div className='p-6'>
						<div className='space-y-4'>
							{[1, 2, 3, 4].map((item) => (
								<div key={item} className='flex items-center space-x-4'>
									<div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
										<User className='w-5 h-5 text-gray-600' />
									</div>
									<div className='flex-1'>
										<p className='text-sm font-medium text-gray-900'>
											Patient consultation completed
										</p>
										<p className='text-sm text-gray-500'>John Doe - 2 hours ago</p>
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
