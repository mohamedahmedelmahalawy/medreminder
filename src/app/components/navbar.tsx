"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store/Slices/Store";
import { useRouter } from "next/navigation";
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

	const [isClicked, setIsClicked] = useState("Home");
	const [menuOpen, setMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);

	const {
		role: roleRedux,
		status: statusRedux,
		userDetails: userRedux,
		isLoggedIn: isLoggedRedux,
	} = useSelector((s: RootState) => s.auth);

	const router = useRouter();
	const dispatch = useDispatch();
	const [authLS, setAuthLS] = useState<SavedAuth | null>(null);

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

	const navItems = ["Home", "Features", "Contact Us"];

	return (
		<div className='fixed top-0 left-0 w-full bg-[#000D44] z-20 shadow-md mb-20'>
			<div className='max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-0'>
				<Link href='/' onClick={() => setIsClicked("")}>
					<Image
						className='cursor-pointer w-16 sm:w-20 md:w-24 h-auto'
						src='/Medlogo.png'
						alt='MedReminder logo'
						width={100}
						height={90}
						priority
					/>
				</Link>

				<ul className='hidden md:flex items-center text-white space-x-6 lg:space-x-10 font-medium text-sm lg:text-base'>
					{navItems.map((item) => (
						<Link
							href={
								item === "Home"
									? "/"
									: item === "Contact Us"
										? "/about"
										: `/${item.toLowerCase()}`
							}
							key={item}
							className={`cursor-pointer underline-offset-8 transition-all duration-200 ${isClicked === item ? "underline decoration-2" : "hover:underline"
								}`}
							onClick={() => setIsClicked(item)}
						>
							{item}
						</Link>
					))}
				</ul>

				{/* RIGHT SIDE (desktop) */}
				<div className='hidden md:flex items-center gap-3 w-48 lg:w-56 justify-end'>
					{!isLoggedIn ? (
						<>
							<Link
								href='/login'
								onClick={() => setIsClicked("")}
								className='flex-1 bg-white text-[#000D44] font-semibold border border-gray-200 px-3 py-2 lg:px-4 lg:py-2 rounded-xl text-center hover:bg-gray-300 transition text-sm lg:text-base'
							>
								Login
							</Link>
							<Link
								href='/signup'
								onClick={() => setIsClicked("")}
								className='flex-1  bg-blue-600 text-white font-medium
                           shadow-md hover:bg-blue-700 px-3 py-2 lg:px-4 lg:py-2 rounded-xl text-center  transition text-sm lg:text-base'
							>
								SignUp
							</Link>
						</>
					) : (
						<div className='relative'>
							<button
								className='flex items-center gap-2 text-white focus:outline-none'
								onClick={() => setProfileOpen(!profileOpen)}
							>
								<Image
									src='/profileimg.svg'
									alt='Profile'
									width={36}
									height={36}
									className='rounded-full border border-gray-300 bg-white'
								/>
								<span className='hidden sm:inline font-medium'>{user.name}</span>
								<ChevronDown size={18} />
							</button>

							{profileOpen && (
								<div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-30'>
									<Link
										href='/profile'
										className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
										onClick={() => setProfileOpen(false)}
									>
										Profile
									</Link>

									<Link
										href='/profile/schedule'
										className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
										onClick={() => setProfileOpen(false)}
									>
										Schedule
									</Link>

									{effectiveRole === "medical" && (
										<Link
											href='/dashboard'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
											onClick={() => setProfileOpen(false)}
										>
											Dashboard
										</Link>
									)}


									{/* {effectiveRole === "patient" && (
                    <Link
                      href="/my-doctors"
                      className="block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Doctors
                    </Link>
                  )} */}


									<button
										onClick={handleLogout}
										className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
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
				className={`md:hidden bg-[#000D44] text-white px-6 py-4 space-y-3 transition-all duration-300 ease-in-out ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
					}`}
			>
				<ul className='flex flex-col space-y-3 text-sm sm:text-base'>
					{["Home", "Features", "Contact Us"].map((item) => (
						<Link
							href={
								item === "Home"
									? "/"
									: item === "Contact Us"
										? "/about"
										: `/${item.toLowerCase()}`
							}
							key={item}
							className={`cursor-pointer underline-offset-8 transition-all duration-200 ${isClicked === item ? "underline decoration-2" : "hover:underline"
								}`}
							onClick={() => {
								setIsClicked(item);
								setMenuOpen(false);
							}}
						>
							{item}
						</Link>
					))}
				</ul>

				<div className='flex flex-col gap-3 mt-4 w-full'>
					{!isLoggedIn ? (
						<>
							<Link
								href='/login'
								onClick={() => {
									setIsClicked("");
									setMenuOpen(false);
								}}
								className='w-full bg-white text-[#000D44] font-semibold border border-gray-200 px-4 py-2 rounded-xl text-center hover:bg-gray-100 transition'
							>
								Login
							</Link>
							<Link
								href='/signup'
								onClick={() => {
									setIsClicked("");
									setMenuOpen(false);
								}}
								className='w-full bg-[#4B4EFC] text-white font-semibold border border-[#4B4EFC] px-4 py-2 rounded-xl text-center hover:bg-[#3737e8] transition'
							>
								SignUp
							</Link>
						</>
					) : (
						<div className='border-t border-gray-600 pt-4'>
							<div className='flex items-center gap-2 mb-3'>
								<Image
									src='/profileimg.svg'
									// {user.avatar || "profileimg.svg"}
									alt='Profile'
									width={36}
									height={36}
									className='rounded-full border border-gray-300 bg-white'
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
								className='w-full text-left py-2 text-sm text-red-400 hover:underline'
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
