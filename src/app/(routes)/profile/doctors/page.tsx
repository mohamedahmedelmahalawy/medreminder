"use client";

import { useState, useMemo, useEffect } from "react";
import {
	Search,
	User,
	MapPin,
	Briefcase,
	Stethoscope,
	ChevronDown,
	Hash,
} from "lucide-react";
import { getAllDoctors } from "@/app/funcs/ProfileFunc";

interface Doctor {
	id: string;
	name: string;
	code: string;
	city: string;
	country: string;
	profession: string;
	specialty: string;
}

const ITEMS_PER_PAGE = 20;

// Card Component
const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
	return (
		<div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-gray-200 hover:border-blue-300 hover:-translate-y-1'>
			{/* Doctor Header */}
			<div className='flex items-center mb-4'>
				<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md'>
					<User className='w-6 h-6 text-white' />
				</div>
				<div className='ml-3 flex-1 min-w-0'>
					<h3 className='text-lg font-bold text-gray-900 mb-1 leading-tight truncate'>
						{doctor.name}
					</h3>
				</div>
			</div>

			{/* Doctor Info */}

			<div className='space-y-3'>
				<div className='flex items-center text-gray-700'>
					<div className='w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0'>
						<Hash className='text-indigo-600 w-4 h-4' />
					</div>
					<div className='min-w-0 flex-1'>
						<p className='text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5'>
							Code
						</p>
						<p className='text-sm font-semibold text-blue-700 '>{doctor.code}</p>
					</div>
				</div>

				<div className='flex items-center text-gray-700'>
					<div className='w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0'>
						<MapPin className='w-4 h-4 text-green-600' />
					</div>
					<div className='min-w-0 flex-1'>
						<p className='text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5'>
							Location
						</p>
						<p className='text-sm font-semibold text-gray-900 truncate'>
							{doctor.city}, {doctor.country}
						</p>
					</div>
				</div>

				<div className='flex items-center text-gray-700'>
					<div className='w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0'>
						<Briefcase className='w-4 h-4 text-purple-600' />
					</div>
					<div className='min-w-0 flex-1'>
						<p className='text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5'>
							Profession
						</p>
						<p className='text-sm font-semibold text-gray-900 truncate'>
							{doctor.profession}
						</p>
					</div>
				</div>

				<div className='flex items-center text-gray-700'>
					<div className='w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0'>
						<Stethoscope className='w-4 h-4 text-orange-600' />
					</div>
					<div className='min-w-0 flex-1'>
						<p className='text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5'>
							Specialty
						</p>
						<p className='text-sm font-semibold text-gray-900 truncate'>
							{doctor.specialty}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

// Search Component
const SearchInput: React.FC<{
	searchTerm: string;
	onSearchChange: (value: string) => void;
}> = ({ searchTerm, onSearchChange }) => {
	return (
		<div className='relative w-full max-w-2xl'>
			<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
				<Search className='h-5 w-5 text-gray-400' />
			</div>
			<input
				type='text'
				placeholder='Search by name, city, country, profession, or specialty...'
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
				className='block w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200'
			/>
		</div>
	);
};

// Load More Component
const LoadMoreButton: React.FC<{
	onClick: () => void;
	isVisible: boolean;
}> = ({ onClick, isVisible }) => {
	if (!isVisible) return null;

	return (
		<div className='flex justify-center mt-8'>
			<button
				onClick={onClick}
				className='inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200'
			>
				<ChevronDown className='w-5 h-5 mr-2' />
				Load More Doctors
			</button>
		</div>
	);
};

// Empty List Component
const EmptyState: React.FC = () => {
	return (
		<div className='text-center py-16'>
			<User className='mx-auto h-16 w-16 text-gray-300' />
			<h3 className='mt-4 text-lg font-medium text-gray-900'>No doctors found</h3>
			<p className='mt-2 text-sm text-gray-500 max-w-md mx-auto'>
				We couldn't find any doctors matching your search criteria. Try adjusting
				your search terms or browse all available doctors.
			</p>
		</div>
	);
};

export default function DoctorsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
	const [sampleDoctors, setSampleDoctors] = useState<Doctor[]>([]);

	// Filter doctors based on search term
	const filteredDoctors = useMemo(() => {
		if (!searchTerm.trim()) return sampleDoctors || [];

		const lowercaseSearch = searchTerm.toLowerCase().trim();
		return (sampleDoctors || []).filter(
			(doctor) =>
				doctor.name.toLowerCase().includes(lowercaseSearch) ||
				doctor.city.toLowerCase().includes(lowercaseSearch) ||
				doctor.country.toLowerCase().includes(lowercaseSearch) ||
				doctor.profession.toLowerCase().includes(lowercaseSearch) ||
				doctor.specialty.toLowerCase().includes(lowercaseSearch)
		);
	}, [searchTerm, sampleDoctors]);

	// Get visible doctors for current page
	const visibleDoctors = useMemo(() => {
		return filteredDoctors.slice(0, visibleCount);
	}, [filteredDoctors, visibleCount]);

	// Check if Load More button should be shown
	const hasMoreDoctors = filteredDoctors.length > visibleCount;

	// Handle search change and reset visible count
	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		setVisibleCount(ITEMS_PER_PAGE);
	};

	// Handle load more
	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
	};

	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const doctors = await getAllDoctors();
				if (doctors && doctors.length > 0) {
					setSampleDoctors(doctors);
				}
			} catch (error) {
				console.error("Error fetching doctors:", error);
			}
		};

		fetchDoctors();
	}, []);

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<header className='bg-white shadow-sm border-b border-gray-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
					<div className='text-center sm:text-left'>
						<h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
							All Doctors
						</h1>
						<p className='mt-2 text-base sm:text-lg text-gray-600'>
							Find and connect with healthcare professionals worldwide
						</p>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				{/* Search Section */}
				<div className='mb-6 sm:mb-8'>
					<div className='flex justify-center'>
						<SearchInput
							searchTerm={searchTerm}
							onSearchChange={handleSearchChange}
						/>
					</div>
				</div>

				{/* Results Summary */}
				<div className='mb-6'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
						<p className='text-sm sm:text-base text-gray-600'>
							Showing {visibleDoctors.length} of {filteredDoctors.length} doctors
							{searchTerm && (
								<span className='text-gray-500'> for "{searchTerm}"</span>
							)}
						</p>
						{searchTerm && (
							<button
								onClick={() => {
									setSearchTerm("");
									setVisibleCount(ITEMS_PER_PAGE);
								}}
								className='text-sm text-blue-600 hover:text-blue-700 underline self-start sm:self-auto'
							>
								Clear search
							</button>
						)}
					</div>
				</div>

				{/* Doctors Grid */}
				{visibleDoctors.length > 0 ? (
					<>
						<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-4 lg:gap-6'>
							{visibleDoctors.map((doctor) => (
								<DoctorCard key={doctor.id} doctor={doctor} />
							))}
						</div>

						<LoadMoreButton onClick={handleLoadMore} isVisible={hasMoreDoctors} />
					</>
				) : (
					<EmptyState />
				)}
			</main>
		</div>
	);
}
