"use client";

import Link from "next/link";
import {
	User,
	Calendar,
	LayoutDashboard,
	LogOut,
	ClipboardList,
	UserPlus,
	HeartPulse,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { clearAuth } from "@/lib/store/Slices/Auth";

export default function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const [role, setRole] = useState<string | null>(null);

	const dispatch = useDispatch();

	useEffect(() => {
		try {
			const auth = JSON.parse(localStorage.getItem("auth") || "{}");
			setRole(auth?.role || null);
		} catch (error) {
			console.error("Failed to parse auth from localStorage:", error);
			setRole(null);
		}
	}, []);

	const sharedTabs = [
		{
			id: "profile",
			label: "Profile",
			icon: <User className='w-5 h-5' />,
			href: "/profile",
		},
		{
			id: "schedule",
			label: "Schedule",
			icon: <Calendar className='w-5 h-5' />,
			href: "/profile/schedule",
		},
	];

	const medicalTabs = [
		{
			id: "dashboard",
			label: "Dashboard",
			icon: <LayoutDashboard className='w-5 h-5' />,
			href: "/dashboard",
		},
	];

	const patientTabs = [
		{
			id: "evaluation",
			label: "Evaluation",
			icon: <ClipboardList className='w-5 h-5' />,
			href: "/profile/evaluation",
		},
		{
			id: "doctor-code",
			label: "Doctor's Code",
			icon: <UserPlus className='w-5 h-5' />,
			href: "/profile/code",
		},
		{
			id: "all-doctors",
			label: "All Doctors",
			icon: <HeartPulse className='w-5 h-5' />,
			href: "/profile/doctors",
		},
	];

	let sidebarItems = [...sharedTabs];
	if (role === "medical") sidebarItems = [...sidebarItems, ...medicalTabs];
	if (role === "patient") sidebarItems = [...sidebarItems, ...patientTabs];

	const onLogout = () => {
		{
			// nemsa7 el storage
			if (typeof window !== "undefined") {
				localStorage.removeItem("auth");
			}

			// 2) nemsa7 Redux
			dispatch(clearAuth());

			router.replace("/");
			router.refresh();
		}
	};

	useEffect(() => {
		if (role === null) return;
		if (pathname === "/profile/dashboard" && role !== "medical") {
			router.replace("/profile");
		}
		if (
			(pathname === "/profile/code" || pathname === "/profile/evaluation") &&
			role !== "patient"
		) {
			router.replace("/profile");
		}
	}, [pathname, role, router]);

	return (
		<div className='w-full sm:w-64 bg-white shadow-lg border-r border-gray-200 pt-3'>
			{/* Navigation Items */}
			<nav className='flex-1 px-4 py-10'>
				<ul className='space-y-2'>
					{sidebarItems.map((item) => (
						<li key={item.id}>
							<Link
								href={item.href}
								className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors no-underline ${
									pathname === item.href
										? "bg-blue-50 text-blue-700 border border-blue-200"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`}
							>
								{item.icon}
								<span className='font-medium'>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>
				{/* Logout Button */}
				<div className='mt-4'>
					<button
						onClick={onLogout}
						className='w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
					>
						<LogOut className='w-5 h-5' />
						<span className='font-medium'>Logout</span>
					</button>
				</div>
			</nav>
		</div>
	);
}
