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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/Slices/Store";
import {
  registerDoctor,
  RegisterDoctorPayload,
  clearAuth,
} from "@/lib/store/Slices/Auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


type Option = { id: number; name: string };

type DoctorFormData = {
  name: string;
  Age: number;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  profession: string;
  specialty: string;
  country: string;
  city: string;
  gender: "male" | "female";
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
  isSubmitting?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  className,
  type = "submit",
  isSubmitting,
  ...props
}) => (
  <button
    type={type}
    className={clsx(
      `disabled:bg-gray-400 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg hover:shadow-blue-400/50 px-4 py-3 rounded-lg w-full font-semibold text-white transition duration-300 disabled:cursor-not-allowed`,
      className
    )}
    {...props}
    disabled={isSubmitting}
  >
    {isSubmitting ? "Registering..." : label}
  </button>
);

export default function DoctorRegistration() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>();

  const onSubmit = async (data: DoctorFormData) => {
    try {
      const payload: RegisterDoctorPayload = {
        ...data,
        patient: [],
      };

      const created = await dispatch(registerDoctor(payload)).unwrap();

      // 🧹 Clear login state from Redux + localStorage
      dispatch(clearAuth());
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }

      toast.success(`Welcome Dr. ${created.name}! Your code is ${created.code}`);

      router.push("/login");
    } catch (err: any) {
      toast.error("Registration failed")
    }
  };

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  return (
    <div className="flex md:flex-row flex-col min-h-screen">
      {/* Left Side */}
      <div className="relative hidden md:block basis-2/5 text-white">
        <Image
          src="/signup.jpg"
          alt="Doctor Register"
          fill
          priority
          className="object-cover [object-position:20%_35%]"
        />
        <div className="absolute inset-0 bg-black/30" />
        <h2 className="absolute top-6 left-6 right-6 mt-24 drop-shadow-lg px-6 font-bold text-white text-3xl md:text-4xl leading-tight">
          Helping You Reach, Treat, <br /> and Inspire Your Patients
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 justify-center items-center bg-gray-50 p-6 sm:p-10 md:w-6/10">
        <div className="p-8 rounded-2xl w-full max-w-2xl">
          <h2 className="mb-6 font-bold text-gray-800 text-3xl">
            Doctor Registration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Full Name
              </label>
              <input
                {...register("name", { required: "Full Name is required" })}
                placeholder="Enter your Name"
                className="block shadow-sm mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Age
              </label>
              <input
                {...register("Age", { required: "Age is required" })}
                placeholder="Enter your Age"
                className="block shadow-sm mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              {errors.Age && (
                <p className="text-red-500 text-sm">{errors.Age.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Email
              </label>
              <EmailInput
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="block shadow-sm mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password + Confirm */}
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
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
              name="phone"
              value={watch("phone") || ""}
              onChange={(val: string) => setValue("phone", val)}
              placeholder="Enter your phone number"
              className="block shadow-sm mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}

            {/* Profession + Speciality */}
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
              <SelectInput
                label="Profession"
                options={professions.map((p) => ({
                  value: p.name,
                  label: p.name,
                }))}
                {...register("profession", {
                  required: "Profession is required",
                })}
                value={watch("profession") || ""}
              />
              <div>
                <label className="block font-medium text-gray-700 text-sm">
                  Speciality
                </label>
                <input
                  {...register("specialty")}
                  placeholder="Enter your Speciality"
                  className="block shadow-sm mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Gender
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender", { required: "Gender is required" })}
                  />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender", { required: "Gender is required" })}
                  />
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            {/* Country + City */}
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
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

            <Button
              type="submit"
              label="Register"
              isSubmitting={isSubmitting}
            />
          </form>

          <p className="mt-6 text-sm text-center">
            Have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
