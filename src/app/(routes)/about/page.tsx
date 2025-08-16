
"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Shield } from "lucide-react";

interface FormData {
	firstName: string;
	email: string;
	message: string;


}
export default function about() {
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
		"idle"
	);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			setSubmitStatus("success");
			setFormData({ firstName: "", email: "", message: "" });
		} catch (error) {
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormValid =
		formData.firstName.trim() !== "" &&
		formData.email.trim() !== "" &&
		formData.message.trim() !== "";

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
			{/* Header Section */}
			<div className='bg-white shadow-sm border-b border-gray-100'>
				<div className='max-w-7xl mx-auto px-4 py-8'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold text-gray-900 mb-4'>
							Contact MedReminder Team
						</h1>
						<p className='text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
							Get in touch for inquiries about our technology solutions to enhance
							Medical Staff schedules & patient Medication Management
						</p>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 py-12'>
				<div className='grid lg:grid-cols-2 gap-12'>
					{/* Contact Information */}
					<div className='space-y-8'>
						<div>
							<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
								Get in Touch
							</h2>
							<div className='space-y-4'>
								<div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
									<div className='bg-blue-100 p-3 rounded-full'>
										<Phone className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='font-medium text-gray-900'>Connect</p>
										<a
											href='tel:+201278474336'
											className='text-blue-600 hover:text-blue-700'
										>
											+201278474336
										</a>
									</div>
								</div>

								<div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
									<div className='bg-green-100 p-3 rounded-full'>
										<Mail className='w-6 h-6 text-green-600' />
									</div>
									<div>
										<p className='font-medium text-gray-900'>Support</p>
										<a
											href='mailto:MedReminder@gmail.com'
											className='text-green-600 hover:text-green-700'
										>
											MedReminder@gmail.com
										</a>
									</div>
								</div>

								<div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
									<div className='bg-purple-100 p-3 rounded-full'>
										<MapPin className='w-6 h-6 text-purple-600' />
									</div>
									<div>
										<p className='font-medium text-gray-900'>Location</p>
										<p className='text-purple-600'>Alexandria, Egypt</p>
									</div>
								</div>
							</div>
						</div>

						{/* Features Section */}
						<div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4'>
								Why Choose MedReminder?
							</h3>
							<div className='space-y-3'>
								<div className='flex items-center space-x-3'>
									<Clock className='w-5 h-5 text-blue-500' />
									<span className='text-gray-700'>
										Efficient Medical Staff Scheduling
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<Shield className='w-5 h-5 text-green-500' />
									<span className='text-gray-700'>
										Secure Patient Medication Management
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<Mail className='w-5 h-5 text-purple-500' />
									<span className='text-gray-700'>24/7 Technical Support</span>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
						<h2 className='text-2xl font-semibold text-gray-900 mb-6'>
							Send us a Message
						</h2>

						{submitStatus === "success" && (
							<div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
								<p className='text-green-800'>
									Thank you! Your message has been sent successfully.
								</p>
							</div>
						)}

						{submitStatus === "error" && (
							<div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
								<p className='text-red-800'>
									Sorry, there was an error sending your message. Please try again.
								</p>
							</div>
						)}

						<div className='space-y-6'>
							<div>
								<label
									htmlFor='firstName'
									className='block text-sm font-medium text-gray-700 mb-2'
								>
									Your First Name *
								</label>
								<input
									type='text'
									id='firstName'
									name='firstName'
									value={formData.firstName}
									onChange={handleInputChange}
									required
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
									placeholder='Enter your first name'
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700 mb-2'
								>
									Your Email Address *
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									required
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
									placeholder='Enter your email address'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-gray-700 mb-2'
								>
									Your Message *
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={5}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical'
									placeholder='Tell us about your inquiry or requirements...'
								/>
							</div>

							<button
								onClick={handleSubmit}
								disabled={!isFormValid || isSubmitting}
								className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2'
							>
								{isSubmitting ? (
									<>
										<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
										<span>Sending...</span>
									</>
								) : (
									<>
										<Send className='w-5 h-5' />
										<span>Submit Your Inquiry</span>
									</>
								)}
							</button>
						</div>

						<div className='mt-6 text-center text-sm text-gray-500'>
							We typically respond within 24 hours
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
