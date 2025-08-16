"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import EmailInput from "@/components/EmailInputOrigin";
import PassWordInput from "@/components/PasswordInputOrigin";
import PasswordCheckOrigin from "@/components/PasswordCheckOrigin";
import PhoneInputOrigin from "@/components/PhoneInputOrigin";
import CountryInput from "@/components/CountryInput";
import SelectInput from "@/components/SelectInput";

type PatientFormData = {
  fullName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  country: string;
  city: string;
};

const cities = [
  { value: "Cairo", label: "Cairo" },
  { value: "Alexandria", label: "Alexandria" },
  { value: "Giza", label: "Giza" },
];

const Button: React.FC<{ label: string }> = ({ label }) => (
  <button
    type="submit"
    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 text-white font-semibold shadow-lg hover:shadow-blue-400/50 transition duration-300"
  >
    {label}
  </button>
);

export default function PatientRegistration() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientFormData>();

  const onSubmit = (data: PatientFormData) => {
    console.log("Patient Registered:", data);
  };

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with image */}
      <div className="hidden md:flex md:w-1/3 relative overflow-hidden">
        <Image
          src="/Register.jpg"
          alt="Doctor helping patient"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center p-6 text-center">
          <p className="text-white text-xl font-medium leading-relaxed max-w-md">
            Caring for patients with compassion — <br /> register now and
            connect easily with your healthcare team.
          </p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex-1 md:w-2/3 flex justify-center items-center p-6 sm:p-10 bg-gray-50">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Patient Registration
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                placeholder="Full Name"
                className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <input
                {...register("age", { required: "Age is required" })}
                type="number"
                placeholder="Age"
                className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <EmailInput
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <PassWordInput
                {...register("password", { required: "Password is required" })}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <PasswordCheckOrigin
                register={register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                passwordValue={passwordValue}
                confirmPasswordValue={confirmPasswordValue}
                error={errors.confirmPassword?.message}
              />
            </div>

            {/* Telephone */}
            <div>
              <PhoneInputOrigin
                name="telephone"
                value={watch("telephone") || ""}
                onChange={(val: string) => setValue("telephone", val)}
                placeholder="Telephone"
                className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.telephone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.telephone.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <CountryInput
                {...register("country", { required: "Country is required" })}
                value={watch("country") || ""}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <SelectInput
                label="City"
                options={cities}
                {...register("city", { required: "City is required" })}
                value={watch("city") || ""}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button label="Register" />
          </form>

          {/* Link to login */}
          <p className="text-sm text-center mt-6">
            Have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
