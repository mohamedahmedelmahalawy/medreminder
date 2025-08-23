"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginDoctor, loginPatient } from "@/lib/store/Slices/Auth";
import type { AppDispatch, RootState } from "@/lib/store/Slices/Store";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import login from "/public/login.webp";


type LoginFormData = { email: string; password: string };

function LoginComponent() {
	const dispatch = useDispatch<AppDispatch>();
	const role = useSelector((state: RootState) => state.auth.role);
	const userDetails = useSelector((state: RootState) => state.auth.userDetails);
	const code = useSelector((state: RootState) => state.auth.code);
	const status = useSelector((state: RootState) => state.auth.status);
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>();

	const [imgVisible, setImgVisible] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => setImgVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	  const router = useRouter();   

	const onSubmit = async (data: LoginFormData) => {
		try {
			if (role === "medical") {
				const doctor = await dispatch(loginDoctor({ email: data.email, password: data.password })).unwrap();
				if (typeof window !== "undefined") {
					localStorage.setItem("auth", JSON.stringify({
						role: "medical",
						code: doctor.code,
						userDetails: doctor,
						status: "succeeded",
						isLoggedIn: true,
					}));
				}
				alert("Login successful!");
				   router.push("/"); 
			} else if (role === "patient") {
				const patient = await dispatch(loginPatient({ email: data.email, password: data.password })).unwrap();
				if (typeof window !== "undefined") {
					localStorage.setItem("auth", JSON.stringify({
						role: "patient",
						code: null,
						userDetails: patient,
						status: "succeeded",
						isLoggedIn: true,
					}));
				}
				alert("Login successful!");
				   router.push("/"); 
			}
		} catch (err: any) {
			alert(err?.message ?? "Login failed");
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row font-sans">
			{/* Left Section (Image, smaller width) */}
			<div className="md:w-4/10 relative">
				<div
					className={`absolute inset-0 transform transition-all duration-700 ease-out ${imgVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"

						}`}
				>
					<Image
						src='/login.webp'
						fill
						alt='Doctor and patient'
						className='w-full h-full object-cover'
					/>
					<h2 className='absolute inset-0 flex items-center justify-center text-3xl md:text-4xl font-extrabold text-white text-center px-6 drop-shadow-lg leading-tight'>

						Connecting Doctors and Patients Seamlessly.
					</h2>
					<span className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-4 py-2 rounded font-medium'>
						Your trusted platform
					</span>
				</div>
			</div>

			{/* Right Section (Form, larger width) */}
			<div className="md:w-6/10 w-full p-8 md:p-16 flex flex-col justify-center items-center bg-white">
				<h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Sign In</h1>
				<p className="text-gray-500 mb-8 text-base font-normal">Please enter your credentials to log in.</p>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-6 w-full max-w-md'
				>
					{/* Email */}
					<div>
						<label
							className='block text-sm font-medium text-gray-700 mb-1'
							htmlFor='email'
						>
							Email
						</label>
						<input
							id='email'
							type='email'
							{...register("email", {
								required: "Email is required",
								pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
							})}
							placeholder="Enter your email"
							className="w-full rounded-md p-3 text-sm text-gray-800 border focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						{errors.email && (
							<p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
						)}

					</div>

					{/* Password */}
					<div>
						<label
							className='block text-sm font-medium text-gray-700 mb-1'
							htmlFor='password'
						>
							Password
						</label>
						<input
							id='password'
							type='password'
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
							})}
							placeholder="Password"
							className="w-full rounded-md p-3 text-sm text-gray-800 border focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						{errors.password && (
							<p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
						)}

					</div>

					{/* Submit */}
					<div>
						<button
							type='submit'
							disabled={isSubmitting}
							className="bg-blue-600 text-white w-full rounded-lg px-6 py-3 font-semibold text-sm hover:bg-blue-700 transition disabled:bg-blue-400">
							{isSubmitting ? "Logging in..." : "Login"}
						</button>
					</div>
				</form>


				<p className='text-sm mt-6 text-gray-500'>
					Don't have an account?{" "}
					<Link href='/signup' className='text-blue-600 font-medium hover:underline'>

						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default LoginComponent;
