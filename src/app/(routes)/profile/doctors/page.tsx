"use client";

import { useState, useMemo } from "react";
import {
	Search,
	User,
	MapPin,
	Briefcase,
	Stethoscope,
	ChevronDown,
	Hash,
} from "lucide-react";

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
const sampleDoctors: Doctor[] = [
	{
		id: "1",
		name: "Dr. Sarah Johnson",
		code: "DOC001",
		city: "New York",
		country: "USA",
		profession: "Cardiologist",
		specialty: "Interventional Cardiology",
	},
	{
		id: "2",
		name: "Dr. Ahmed Hassan",
		code: "DOC002",
		city: "Cairo",
		country: "Egypt",
		profession: "Neurologist",
		specialty: "Pediatric Neurology",
	},
	{
		id: "3",
		name: "Dr. Maria Rodriguez",
		code: "DOC003",
		city: "Madrid",
		country: "Spain",
		profession: "Dermatologist",
		specialty: "Cosmetic Dermatology",
	},
	{
		id: "4",
		name: "Dr. James Wilson",
		code: "DOC004",
		city: "London",
		country: "UK",
		profession: "Orthopedic Surgeon",
		specialty: "Sports Medicine",
	},
	{
		id: "5",
		name: "Dr. Priya Sharma",
		code: "DOC005",
		city: "Mumbai",
		country: "India",
		profession: "Pediatrician",
		specialty: "Neonatal Care",
	},
	{
		id: "6",
		name: "Dr. Chen Wei",
		code: "DOC006",
		city: "Shanghai",
		country: "China",
		profession: "Radiologist",
		specialty: "MRI Imaging",
	},
	{
		id: "7",
		name: "Dr. Lisa Anderson",
		code: "DOC007",
		city: "Toronto",
		country: "Canada",
		profession: "Psychiatrist",
		specialty: "Adult Psychiatry",
	},
	{
		id: "8",
		name: "Dr. Omar Al-Rashid",
		code: "DOC008",
		city: "Dubai",
		country: "UAE",
		profession: "Cardiologist",
		specialty: "Cardiac Surgery",
	},
	// Additional doctors for Load More functionality
	{
		id: "9",
		name: "Dr. Emma Thompson",
		code: "DOC009",
		city: "Sydney",
		country: "Australia",
		profession: "Oncologist",
		specialty: "Medical Oncology",
	},
	{
		id: "10",
		name: "Dr. Roberto Silva",
		code: "DOC010",
		city: "São Paulo",
		country: "Brazil",
		profession: "Gastroenterologist",
		specialty: "Hepatology",
	},
	{
		id: "11",
		name: "Dr. Yuki Tanaka",
		code: "DOC011",
		city: "Tokyo",
		country: "Japan",
		profession: "Endocrinologist",
		specialty: "Diabetes Care",
	},
	{
		id: "12",
		name: "Dr. Klaus Mueller",
		code: "DOC012",
		city: "Berlin",
		country: "Germany",
		profession: "Pulmonologist",
		specialty: "Critical Care",
	},
	{
		id: "13",
		name: "Dr. Sophie Dubois",
		code: "DOC013",
		city: "Paris",
		country: "France",
		profession: "Rheumatologist",
		specialty: "Autoimmune Disorders",
	},
	{
		id: "14",
		name: "Dr. Mikhail Petrov",
		code: "DOC014",
		city: "Moscow",
		country: "Russia",
		profession: "Neurosurgeon",
		specialty: "Brain Tumors",
	},
	{
		id: "15",
		name: "Dr. Fatima Al-Zahra",
		code: "DOC015",
		city: "Riyadh",
		country: "Saudi Arabia",
		profession: "Gynecologist",
		specialty: "Reproductive Medicine",
	},
	{
		id: "16",
		name: "Dr. Giovanni Rossi",
		code: "DOC016",
		city: "Rome",
		country: "Italy",
		profession: "Urologist",
		specialty: "Robotic Surgery",
	},
	{
		id: "17",
		name: "Dr. Ingrid Larsson",
		code: "DOC017",
		city: "Stockholm",
		country: "Sweden",
		profession: "Ophthalmologist",
		specialty: "Retinal Surgery",
	},
	{
		id: "18",
		name: "Dr. David Kim",
		code: "DOC018",
		city: "Seoul",
		country: "South Korea",
		profession: "Plastic Surgeon",
		specialty: "Reconstructive Surgery",
	},
	{
		id: "19",
		name: "Dr. Ana Martinez",
		code: "DOC019",
		city: "Mexico City",
		country: "Mexico",
		profession: "Hematologist",
		specialty: "Blood Disorders",
	},
	{
		id: "20",
		name: "Dr. Ravi Patel",
		code: "DOC020",
		city: "Delhi",
		country: "India",
		profession: "Emergency Medicine",
		specialty: "Trauma Care",
	},
	{
		id: "21",
		name: "Dr. Helena Costa",
		code: "DOC021",
		city: "Lisbon",
		country: "Portugal",
		profession: "Pathologist",
		specialty: "Molecular Pathology",
	},
	{
		id: "22",
		name: "Dr. Alexandros Dimitriou",
		code: "DOC022",
		city: "Athens",
		country: "Greece",
		profession: "Anesthesiologist",
		specialty: "Cardiac Anesthesia",
	},
	{
		id: "23",
		name: "Dr. Noor Abdullah",
		code: "DOC023",
		city: "Amman",
		country: "Jordan",
		profession: "Family Medicine",
		specialty: "Preventive Care",
	},
	{
		id: "24",
		name: "Dr. Erik Nielsen",
		code: "DOC024",
		city: "Copenhagen",
		country: "Denmark",
		profession: "Infectious Disease",
		specialty: "Tropical Medicine",
	},
	{
		id: "25",
		name: "Dr. Leila Mansouri",
		code: "DOC025",
		city: "Tehran",
		country: "Iran",
		profession: "Nephrologist",
		specialty: "Kidney Transplant",
	},
];

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

	// Filter doctors based on search term
	const filteredDoctors = useMemo(() => {
		if (!searchTerm.trim()) return sampleDoctors;

		const lowercaseSearch = searchTerm.toLowerCase().trim();
		return sampleDoctors.filter(
			(doctor) =>
				doctor.name.toLowerCase().includes(lowercaseSearch) ||
				doctor.city.toLowerCase().includes(lowercaseSearch) ||
				doctor.country.toLowerCase().includes(lowercaseSearch) ||
				doctor.profession.toLowerCase().includes(lowercaseSearch) ||
				doctor.specialty.toLowerCase().includes(lowercaseSearch)
		);
	}, [searchTerm]);

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
