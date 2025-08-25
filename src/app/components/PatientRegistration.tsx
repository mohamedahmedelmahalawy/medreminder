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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/Slices/Store";
import {
  registerPatient,
  RegisterPatientPayload,
} from "@/lib/store/Slices/Auth";
import { toast } from "react-toastify";
// import dregister from "/public/dregister.jpg";

type PatientFormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  country: string;
};

const cities = [
  { value: "Cairo", label: "Cairo" },
  { value: "Alexandria", label: "Alexandria" },
  { value: "Giza", label: "Giza" },
];

const Button: React.FC<{ label: string }> = ({ label }) => (
  <button
    type="submit"
    className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg hover:shadow-blue-400/50 px-4 py-3 rounded-lg w-full font-semibold text-white transition duration-300"
  >
    {label}
  </button>
);

export default function PatientRegistration() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientFormData>();

  const onSubmit = async (data: PatientFormData) => {
    try {
      // shape the payload to match the thunk’s expected type
      const payload: RegisterPatientPayload = {
        ...data,
      };

      const created = await dispatch(registerPatient(payload)).unwrap();

      console.log("Patient Registered:", created);
      toast.success(
        `Welcome ${
          created.name.charAt(0).toUpperCase() + created.name.slice(1)
        }`
      );
    } catch (err: any) {
      toast.error(err?.message ?? "Registration failed");
    }
  };

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  return (
    <div className="flex md:flex-row flex-col min-h-screen">
      {/* Left side with image */}
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
           Caring for patients with compassion — <br /> register now and
            connect easily with your healthcare team.
        </h2>
      </div>

      {/* Right side with form */}
      <div className="flex flex-1 justify-center items-center bg-gray-50 p-6 sm:p-10 md:w-6/10">
        <div className="p-8 rounded-2xl w-full max-w-2xl">
          <h2 className="mb-6 font-bold text-gray-800 text-3xl text-center">
            Patient Registration
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <input
                {...register("name", { required: "Full Name is required" })}
                placeholder="Full Name"
                className="shadow-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <input
                {...register("age", { required: "Age is required" })}
                // type="number"
                placeholder="Age"
                className="shadow-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              {errors.age && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <EmailInput
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="shadow-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">
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
                <p className="mt-1 text-red-500 text-sm">
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
                name="phone"
                value={watch("phone") || ""}
                onChange={(val: string) => setValue("phone", val)}
                placeholder="phone"
                className="shadow-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              {errors.phone && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.phone.message}
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
                <p className="mt-1 text-red-500 text-sm">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* City */}
            {/* <div>
              <SelectInput
                label="City"
                options={cities}
                {...register("city", { required: "City is required" })}
                value={watch("city") || ""}
              />
              {errors.city && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.city.message}
                </p>
              )}
            </div> */}

            {/* Submit */}
            <Button label="Register" />
          </form>

          {/* Link to login */}
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
