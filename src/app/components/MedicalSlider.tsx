"use client";

import React, { useState, useEffect } from "react";
import {
	ChevronLeft,
	ChevronRight,
	Zap,
	Droplets,
	Microscope,
	Accessibility,
	Heart,
	Pill,
	Stethoscope,
	Activity,
	Shield,
	Eye,
	Thermometer,
	Brain,
} from "lucide-react";

interface Category {
	id: number;
	title: string;
	listings: number;
	icon: React.ReactNode;
	color: string;
	hoverColor: string;
}

const categories: Category[] = [
	{
		id: 1,
		title: "MRI Resonance",
		listings: 35,
		icon: <Zap className='w-12 h-12' />,
		color: "bg-pink-200",
		hoverColor: "bg-pink-400",
	},
	{
		id: 2,
		title: "Blood Test",
		listings: 62,
		icon: <Droplets className='w-12 h-12' />,
		color: "bg-red-200",
		hoverColor: "bg-red-400",
	},
	{
		id: 3,
		title: "Laboratory",
		listings: 76,
		icon: <Microscope className='w-12 h-12' />,
		color: "bg-blue-200",
		hoverColor: "bg-blue-400",
	},
	{
		id: 4,
		title: "Posologist",
		listings: 24,
		icon: <Accessibility className='w-12 h-12' />,
		color: "bg-purple-200",
		hoverColor: "bg-purple-400",
	},
	{
		id: 5,
		title: "Cardiology",
		listings: 89,
		icon: <Heart className='w-12 h-12' />,
		color: "bg-red-200",
		hoverColor: "bg-red-400",
	},
	{
		id: 6,
		title: "Pharmacy",
		listings: 143,
		icon: <Pill className='w-12 h-12' />,
		color: "bg-green-200",
		hoverColor: "bg-green-400",
	},
	{
		id: 7,
		title: "General Practice",
		listings: 201,
		icon: <Stethoscope className='w-12 h-12' />,
		color: "bg-teal-200",
		hoverColor: "bg-teal-400",
	},
	{
		id: 8,
		title: "Emergency Care",
		listings: 67,
		icon: <Activity className='w-12 h-12' />,
		color: "bg-orange-200",
		hoverColor: "bg-orange-400",
	},
	{
		id: 9,
		title: "Preventive Care",
		listings: 128,
		icon: <Shield className='w-12 h-12' />,
		color: "bg-green-200",
		hoverColor: "bg-green-400",
	},
	{
		id: 10,
		title: "Ophthalmology",
		listings: 45,
		icon: <Eye className='w-12 h-12' />,
		color: "bg-indigo-200",
		hoverColor: "bg-indigo-400",
	},
	{
		id: 11,
		title: "Thermography",
		listings: 18,
		icon: <Thermometer className='w-12 h-12' />,
		color: "bg-yellow-200",
		hoverColor: "bg-yellow-400",
	},
	{
		id: 12,
		title: "Neurology",
		listings: 52,
		icon: <Brain className='w-12 h-12' />,
		color: "bg-purple-200",
		hoverColor: "bg-purple-400",
	},
];

const MedicalSlider: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerView, setItemsPerView] = useState(4);
	const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

	// Update items per view based on screen size
	useEffect(() => {
		const updateItemsPerView = () => {
			if (window.innerWidth < 640) {
				setItemsPerView(1); // Mobile
			} else if (window.innerWidth < 1024) {
				setItemsPerView(2); // Tablet
			} else {
				setItemsPerView(4); // Desktop
			}
		};

		updateItemsPerView();
		window.addEventListener("resize", updateItemsPerView);

		return () => window.removeEventListener("resize", updateItemsPerView);
	}, []);

	const maxIndex = Math.max(0, categories.length - itemsPerView);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
	};

	return (
		<div className='w-full max-w-7xl mx-auto px-4 py-36'>
			<div className='flex-1 pb-12'>
				<div className='flex items-center gap-2 mb-4'>
					<div className='w-2 h-2 bg-green-500 rounded-full'></div>
					<p className='text-green-500 text-xl font-semibold uppercase tracking-wide'>
						CATEGORIES
					</p>
					<div className='w-2 h-2 bg-green-500 rounded-full'></div>
				</div>
				<h2 className='text-4xl font-bold text-blue-900'>
					Top Searched Specialities
				</h2>
			</div>
			<div className='relative'>
				{/* Navigation Buttons */}
				<button
					onClick={prevSlide}
					className={
						" absolute cursor-pointer hover:shadow-lg left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					}
					disabled={categories.length <= itemsPerView}
				>
					<ChevronLeft className='w-5 h-5' />
				</button>

				<button
					onClick={nextSlide}
					className='absolute cursor-pointer hover:shadow-lg right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={categories.length <= itemsPerView}
				>
					<ChevronRight className='w-5 h-5' />
				</button>

				{/* Slider Container */}
				<div className='overflow-hidden'>
					<div
						className='flex transition-transform duration-900 ease-in-out'
						style={{
							transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
						}}
					>
						{categories.map((category) => (
							<div
								key={category.id}
								className={`flex-shrink-0 px-2 ${
									itemsPerView === 1 ? "w-full" : itemsPerView === 2 ? "w-1/2" : "w-1/4"
								}`}
							>
								<div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8  border border-gray-100'>
									{/* Icon Circle */}
									<div
										className={`${
											hoveredCategory === category.id
												? category.hoverColor
												: category.color
										} rounded-full w-24 h-24 flex items-center justify-center mb-6 mx-auto transition-colors duration-300`}
										onMouseEnter={() => setHoveredCategory(category.id)}
										onMouseLeave={() => setHoveredCategory(null)}
									>
										<div className='text-gray-700'>{category.icon}</div>
									</div>

									{/* Content */}
									<div className='text-center'>
										<h3 className='font-bold text-gray-900 text-2xl mb-2'>
											{category.title}
										</h3>
										<p className='text-lg text-gray-500'>{category.listings} Listings</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Dots Indicator */}
				{categories.length > itemsPerView && (
					<div className='flex justify-center mt-6 space-x-2'>
						{Array.from({ length: maxIndex + 1 }).map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-2 h-2 rounded-full transition-colors duration-200 ${
									currentIndex === index ? "bg-blue-500" : "bg-gray-300"
								}`}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MedicalSlider;
