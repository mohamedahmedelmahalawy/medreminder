"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store/Slices/Store";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/lib/store/Slices/Auth";

type SavedAuth = {
	role: "medical" | "patient" | null;
	code: string | null;
	userDetails?: { name?: string; avatar?: string } & Record<string, any>;
	status?: "idle" | "loading" | "succeeded" | "failed";
	isLoggedIn?: boolean;
};

function Navbar() {
	const [activeItem, setActiveItem] = useState("Home");
	const [menuOpen, setMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const pathName = usePathname();
	const navItems = [
		{ label: "Home", path: "/" },
		{ label: "Features", path: "/#features" },
		{ label: "FAQ", path: "/#faq" },
		{ label: "Contact Us", path: "/about" },
	];

	const {
		role: roleRedux,
		status: statusRedux,
		userDetails: userRedux,
		isLoggedIn: isLoggedRedux,
	} = useSelector((s: RootState) => s.auth);

	const router = useRouter();
	const dispatch = useDispatch();
	const [authLS, setAuthLS] = useState<SavedAuth | null>(null);

	// Set active item based on current path and hash
	useEffect(() => {
		if (pathName === "/about") {
			setActiveItem("Contact Us");
		} else if (pathName === "/") {
			// Check for hash in URL
			const hash = window.location.hash;
			if (hash === "#features") {
				setActiveItem("Features");
			} else if (hash === "#faq") {
				setActiveItem("FAQ");
			} else {
				setActiveItem("Home");
			}
		}
	}, [pathName]);

	// Listen for hash changes to update active item
	useEffect(() => {
		const handleHashChange = () => {
			if (pathName === "/") {
				const hash = window.location.hash;
				if (hash === "#features") {
					setActiveItem("Features");
				} else if (hash === "#faq") {
					setActiveItem("FAQ");
				} else {
					setActiveItem("Home");
				}
			}
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, [pathName]);

	useEffect(() => {
		if (pathName === "/about") {
			setActiveItem("Contact Us");
		} else if (pathName === "/") {
			// Check for hash in URL
			const hash = window.location.hash;
			if (hash === "#features") {
				setActiveItem("Features");
			} else if (hash === "#faq") {
				setActiveItem("FAQ");
			} else {
				setActiveItem("Home");
			}
		} else {
			// Reset active item when navigating to routes not in navbar
			setActiveItem("");
		}
	}, [pathName]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const raw = localStorage.getItem("auth");
		setAuthLS(raw ? (JSON.parse(raw) as SavedAuth) : null);
		// 3lshan teb2a ma5sosa leha
		const onStorage = () => {
			const r = localStorage.getItem("auth");
			setAuthLS(r ? (JSON.parse(r) as SavedAuth) : null);
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	//  Redux wla  LS
	const effectiveUser = (userRedux as any) ?? authLS?.userDetails ?? null;
	const effectiveRole: "medical" | "patient" | null =
		(roleRedux as any) ?? authLS?.role ?? null;

	const isLoggedIn = useMemo(() => {
		//3la 7asb el redux
		if (userRedux) {
			return Boolean(isLoggedRedux || statusRedux === "succeeded");
		}
		// 2la 7asb el LS
		if (authLS?.userDetails) {
			return Boolean(authLS.isLoggedIn || authLS.status === "succeeded");
		}
		return false;
	}, [userRedux, isLoggedRedux, statusRedux, authLS]);

	const user = useMemo(
		() => ({
			name: effectiveUser?.name ?? "User",
			avatar: effectiveUser?.avatar ?? "",
		}),
		[effectiveUser]
	);

	const handleLogout = () => {
		// nemsa7 el storage
		if (typeof window !== "undefined") {
			localStorage.removeItem("auth");
		}

		// 2) nemsa7 Redux
		dispatch(clearAuth());

		// clear local navbar snapshot/UI
		setAuthLS(null);
		setProfileOpen(false);
		setMenuOpen(false);

		router.replace("/");
		router.refresh();
	};

	const handleNavClick = (item: { label: string; path: string }) => {
		setActiveItem(item.label);
		setMenuOpen(false);
	};

	return (
		<div className='top-0 left-0 z-20 fixed bg-[#000D44] shadow-md py-2 w-full'>
			<div className='flex justify-between items-center mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-0 max-w-screen-xl'>
				<Link
					href='/'
					onClick={() => setActiveItem("Home")}
					className='flex items-center gap-2 -mt-2 py-4 font-bold text-white text-2xl'
				>
					<Image
						className='w-16 sm:w-20 md:w-24 h-auto cursor-pointer'
						src='/Medlogo-notext.png'
						alt='MedReminder logo'
						width={100}
						height={90}
						style={{ width: "55px", height: "auto" }}
						priority
					/>
				</Link>

				<ul className='hidden md:flex items-center space-x-6 lg:space-x-10 font-medium text-white text-sm lg:text-base'>
					{navItems.map((item) => (
						<Link
							href={item.path}
							key={item.label}
							onClick={() => handleNavClick(item)}
							className={`cursor-pointer underline-offset-8 transition-all duration-200 text-xl font-medium ${
								activeItem === item.label ? "underline decoration-2" : "hover:underline"
							}`}
						>
							{item.label}
						</Link>
					))}
				</ul>

				{/* RIGHT SIDE (desktop) */}
				<div className='hidden md:flex justify-end items-center gap-3 w-48 lg:w-56'>
					{!isLoggedIn ? (
						<>
							<Link
								href='/login'
								onClick={() => setActiveItem("")}
								className='flex-1 bg-white hover:bg-gray-300 px-3 lg:px-4 py-2 lg:py-2 border border-gray-200 rounded-xl font-semibold text-[#000D44] text-sm lg:text-base text-center transition'
							>
								Login
							</Link>
							<Link
								href='/signup'
								onClick={() => setActiveItem("")}
								className='flex-1 bg-blue-600 hover:bg-blue-700 shadow-md px-3 lg:px-4 py-2 lg:py-2 rounded-xl font-medium text-white text-sm lg:text-base text-center transition'
							>
								SignUp
							</Link>
						</>
					) : (
						<div className='relative'>
							<button
								className='flex items-center gap-2 focus:outline-none text-white'
								onClick={() => setProfileOpen(!profileOpen)}
							>
								<Image
									src='/profileimg.svg'
									alt='Profile'
									width={36}
									height={36}
									className='bg-white border border-gray-300 rounded-full'
								/>
								<span className='hidden sm:inline font-medium'>{user.name}</span>
								<ChevronDown size={18} />
							</button>

							{profileOpen && (
								<div className='right-0 z-30 absolute bg-white shadow-lg mt-2 py-2 rounded-lg w-48'>
									<Link
										href='/profile'
										className='block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm'
										onClick={() => setProfileOpen(false)}
									>
										Profile
									</Link>

									<Link
										href='/profile/schedule'
										className='block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm'
										onClick={() => setProfileOpen(false)}
									>
										Schedule
									</Link>

									{effectiveRole === "medical" && (
										<Link
											href='/dashboard'
											className='block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm'
											onClick={() => setProfileOpen(false)}
										>
											Dashboard
										</Link>
									)}

									<button
										onClick={handleLogout}
										className='hover:bg-gray-100 px-4 py-2 w-full text-red-600 text-sm text-left cursor-pointer'
									>
										Logout
									</button>
								</div>
							)}
						</div>
					)}
				</div>

				{/* burger button */}
				<button
					className='md:hidden text-white'
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* MOBILE PANEL */}
			<div
				className={`md:hidden bg-[#000D44] text-white px-6 py-4 space-y-3 transition-all duration-300 ease-in-out ${
					menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
				}`}
			>
				<ul className='flex flex-col space-y-3 text-sm sm:text-base'>
					{navItems.map((item) => (
						<Link
							href={item.path}
							key={item.label}
							className={`cursor-pointer underline-offset-8 transition-all duration-200 ${
								activeItem === item.label ? "underline decoration-2" : "hover:underline"
							}`}
							onClick={() => handleNavClick(item)}
						>
							{item.label}
						</Link>
					))}
				</ul>

				<div className='flex flex-col gap-3 mt-4 w-full'>
					{!isLoggedIn ? (
						<>
							<Link
								href='/login'
								onClick={() => {
									setActiveItem("");
									setMenuOpen(false);
								}}
								className='bg-white hover:bg-gray-100 px-4 py-2 border border-gray-200 rounded-xl w-full font-semibold text-[#000D44] text-center transition'
							>
								Login
							</Link>
							<Link
								href='/signup'
								onClick={() => {
									setActiveItem("");
									setMenuOpen(false);
								}}
								className='bg-[#4B4EFC] hover:bg-[#3737e8] px-4 py-2 border border-[#4B4EFC] rounded-xl w-full font-semibold text-white text-center transition'
							>
								SignUp
							</Link>
						</>
					) : (
						<div className='pt-4 border-gray-600 border-t'>
							<div className='flex items-center gap-2 mb-3'>
								<Image
									src='/profileimg.svg'
									alt='Profile'
									width={36}
									height={36}
									className='bg-white border border-gray-300 rounded-full'
								/>
								<span className='font-medium'>{user.name}</span>
							</div>

							<Link
								href='/profile'
								className='block py-2 text-sm hover:underline'
								onClick={() => setMenuOpen(false)}
							>
								Profile
							</Link>

							<Link
								href='/profile/schedule'
								className='block py-2 text-sm hover:underline'
								onClick={() => setMenuOpen(false)}
							>
								Schedule
							</Link>

							{effectiveRole === "medical" && (
								<Link
									href='/dashboard'
									className='block py-2 text-sm hover:underline'
									onClick={() => setMenuOpen(false)}
								>
									Dashboard
								</Link>
							)}

							{effectiveRole === "patient" && (
								<Link
									href='/my-doctors'
									className='block py-2 text-sm hover:underline'
									onClick={() => setMenuOpen(false)}
								>
									My Doctors
								</Link>
							)}

							<button
								className='py-2 w-full text-red-400 text-sm text-left hover:underline'
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
