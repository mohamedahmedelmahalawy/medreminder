"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/components/EmailInputOrigin";
import PassWordInput from "@/components/PasswordInputOrigin";
import PasswordCheckOrigin from "@/components/PasswordCheckOrigin";
import PhoneInputOrigin from "@/components/PhoneInputOrigin";
import SelectInput from "@/components/SelectInput";
import CountryInput from "@/components/CountryInput";

type Option = { id: number; name: string };

type RegisterFormData = {
	fullName: string;
	age: number;
	email: string;
	password: string;
	confirmPassword: string;
	telephone: string;
	profession: string;
	speciality: string;
	country: string;
	city: string;
};

const cities: Option[] = [
	{ id: 1, name: "Cairo" },
	{ id: 2, name: "Alexandria" },
	{ id: 3, name: "Giza" },
];

const professions: Option[] = [
	{ id: 1, name: "General Practitioner" },
	{ id: 2, name: "Surgeon" },
	{ id: 3, name: "Pediatrician" },
	{ id: 4, name: "Dentist" },
	{ id: 5, name: "Cardiologist" },
];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: "Login" | "Register";
}

const Button: React.FC<ButtonProps> = ({
	label,
	className,
	type = "submit",
	...props
}) => {
	return (
		<button
			type={type}
			className={clsx(
				"w-full rounded-md bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 transition",
				className
			)}
			{...props}
		>
			{label}
		</button>
	);
};

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const onSubmit = (data: RegisterFormData) => {
		console.log({ ...data });
	};

	const passwordValue = watch("password");
	const confirmPasswordValue = watch("confirmPassword");

	return (
		<div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
			<div className="hidden md:flex md:w-1/2 bg-purple-800 text-white flex-col justify-center items-center p-8">
				<div className="max-w-md text-center">
					<div className="flex items-center justify-center mb-6">
					</div>
					<p className="text-xl font-medium mb-6">
						Helping You Reach, Treat, and Inspire Your Patients
					</p>
					<div className="flex flex-col items-center">
						<Image
							src="/Register.jpg"
							alt="Register Image"
							width={800}
							height={200}
						/>
						
					</div>
					
				</div>
			</div>

			<div className="flex-1 flex justify-center items-center p-4 sm:p-8">
				<div className="w-full max-w-md">
					<h2 className="text-2xl font-bold mb-3">New Doctor Registration</h2>
					<p className="text-gray-500 mb-6">
						Welcome! Please Complete Your Doctor Registration
					</p>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label className="block text-sm font-medium">Full Name</label>
							<input
								{...register("fullName", { required: "Full Name is required" })}
								type="text"
								placeholder="Enter your Name"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
							{errors.fullName && (
								<p className="text-red-500 text-sm break-words">{errors.fullName.message}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium">Age</label>
							<input
								{...register("age", { required: "Age is required" })}
								type="number"
								placeholder="Enter your Age"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
							{errors.age && (
								<p className="text-red-500 text-sm break-words">{errors.age.message}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium">Email</label>
							<EmailInput
								{...register("email", { required: "Email is required" })}
								placeholder="Enter your email"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm break-words">{errors.email.message}</p>
							)}
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<PassWordInput
									{...register("password", { required: "Password is required" })}
									placeholder="********"
								/>
								{errors.password && (
									<p className="text-red-500 text-sm break-words">{errors.password.message}</p>
								)}
							</div>

							<div>
								<PasswordCheckOrigin
									register={register("confirmPassword", {
										required: "Please confirm your password",
										validate: (value) =>
											value === passwordValue || "Passwords do not match",
									})}
									passwordValue={passwordValue}
									confirmPasswordValue={confirmPasswordValue}
									error={errors.confirmPassword?.message}
								/>
							</div>
						</div>

						<div>
							<PhoneInputOrigin
								name="telephone"
								value={watch("telephone") || ""}
								onChange={(val: string) => setValue("telephone", val)}
								placeholder="Enter your Telephone number"
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
							{errors.telephone && (
								<p className="text-red-500 text-sm mt-1 break-words">{errors.telephone.message}</p>
							)}
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<SelectInput
									label="Profession"
									options={professions.map((p) => ({ value: p.name, label: p.name }))}
									{...register("profession", { required: "Profession is required" })}
									value={watch("profession") || ""}
								/>
								{errors.profession && (
									<p className="text-red-500 text-sm mt-1 break-words">
										{errors.profession.message}
									</p>
								)}
							</div>
							<div>
								<label className="block text-sm font-medium">Speciality</label>
								<input
									{...register("speciality")}
									type="text"
									placeholder="Enter your Speciality"
									className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<CountryInput
									{...register("country", { required: "Country is required" })}
									value={watch("country") || ""}
								/>
								{errors.country && (
									<p className="text-red-500 text-sm break-words">{errors.country.message}</p>
								)}
							</div>
							<div>
								<SelectInput
									label="City"
									options={cities.map((p) => ({ value: p.name, label: p.name }))}
									{...register("city", { required: "City is required" })}
									value={watch("city") || ""}
								/>
							</div>
						</div>

						<Button type="submit" label="Register" />
					</form>

					<p className="text-sm text-center mt-4">
						Have an account?{" "}
						<Link href="/login" className="text-purple-600">
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
