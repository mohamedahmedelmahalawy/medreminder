"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import React from "react";

const ProfilePage = () => {
	return (
		<>
			<header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div>
						<h1 className='text-2xl font-bold text-gray-900 capitalize'>Profile</h1>
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
			<main className='flex-1 p-6 overflow-auto'>
				<div className='space-y-6'>
					<div className='bg-white rounded-xl shadow-sm border border-gray-200'>
						<div className='p-6 border-b border-gray-200'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Profile Information
							</h3>
						</div>
						<div className='p-6'>
							{/* Avatar + Info */}
							<div className='flex items-center space-x-6 mb-8'>
								<div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center'>
									<User className='w-12 h-12 text-gray-500' />
								</div>
								<div>
									<h2 className='text-2xl font-bold text-gray-900'>Dr. Sarah Smith</h2>
									<p className='text-gray-600'>Cardiologist</p>
									<button className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
										Change Photo
									</button>
								</div>
							</div>

							{/* Form */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Full Name
									</label>
									<input
										type='text'
										defaultValue='Dr. Sarah Smith'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Email
									</label>
									<input
										type='email'
										defaultValue='sarah.smith@hospital.com'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Phone
									</label>
									<input
										type='tel'
										defaultValue='+1 (555) 123-4567'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Specialization
									</label>
									<input
										type='text'
										defaultValue='Cardiologist'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										License Number
									</label>
									<input
										type='text'
										defaultValue='MD123456789'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Years of Experience
									</label>
									<input
										type='number'
										defaultValue='12'
										className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									/>
								</div>
							</div>

							{/* Bio */}
							<div className='mt-6'>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Bio
								</label>
								<textarea
									rows={4}
									defaultValue='Experienced cardiologist with over 12 years of practice. Specialized in interventional cardiology and cardiac imaging.'
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
							</div>

							{/* Actions */}
							<div className='mt-8 flex justify-end space-x-4'>
								<button className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
									Cancel
								</button>
								<button className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default ProfilePage;
