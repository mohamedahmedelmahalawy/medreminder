"use client";

import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/components/EmailInputOrigin";
import PassWordInput from "@/components/PasswordInputOrigin";
import PasswordCheckOrigin from "@/components/PasswordCheckOrigin";
import PhoneInputOrigin from "@/components/PhoneInputOrigin";
import SelectInput from "@/components/SelectInput";
import CountryInput from "@/components/CountryInput";

type Option = { id: number; name: string };

type DoctorFormData = {
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

const Button: React.FC<ButtonProps> = ({ label, className, type = "submit", ...props }) => (
  <button
    type={type}
    className={clsx(
      "w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-3 text-white font-semibold shadow-lg hover:shadow-purple-400/50 transition duration-300",
      className
    )}
    {...props}
  >
    {label}
  </button>
);

export default function DoctorRegistration() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DoctorFormData>();

  const onSubmit = (data: DoctorFormData) => {
    console.log("Doctor Registered:", data);
  };

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/3 bg-purple-800 text-white relative">
        <Image
          src="/deregister.jpg"
          alt="Doctor Register"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-purple-900/70 flex flex-col justify-center items-center p-6 text-center">
          <p className="text-xl font-medium leading-relaxed">
            Helping You Reach, Treat, <br /> and Inspire Your Patients
          </p>
        </div>
      </div>

      {/* Right Side (larger) */}
      <div className="flex-1 md:w-2/3 flex justify-center items-center p-6 sm:p-10 bg-gray-50">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Doctor Registration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                type="text"
                placeholder="Enter your Name"
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                {...register("age", { required: "Age is required" })}
                type="number"
                placeholder="Enter your Age"
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <EmailInput
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PassWordInput
                {...register("password", { required: "Password is required" })}
                placeholder="********"
              />
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

            {/* Phone */}
            <PhoneInputOrigin
              name="telephone"
              value={watch("telephone") || ""}
              onChange={(val: string) => setValue("telephone", val)}
              placeholder="Enter your Telephone number"
              className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.telephone && (
              <p className="text-red-500 text-sm">{errors.telephone.message}</p>
            )}

            {/* Profession + Speciality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectInput
                label="Profession"
                options={professions.map((p) => ({ value: p.name, label: p.name }))}
                {...register("profession", { required: "Profession is required" })}
                value={watch("profession") || ""}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Speciality</label>
                <input
                  {...register("speciality")}
                  type="text"
                  placeholder="Enter your Speciality"
                  className="mt-2 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Country + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CountryInput
                {...register("country", { required: "Country is required" })}
                value={watch("country") || ""}
              />
              <SelectInput
                label="City"
                options={cities.map((p) => ({ value: p.name, label: p.name }))}
                {...register("city", { required: "City is required" })}
                value={watch("city") || ""}
              />
            </div>

            <Button type="submit" label="Register" />
          </form>

          <p className="text-sm text-center mt-6">
            Have an account?{" "}
            <Link href="/login" className="text-purple-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
