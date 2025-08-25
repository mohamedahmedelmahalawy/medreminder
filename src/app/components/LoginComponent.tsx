"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginDoctor, loginPatient } from "@/lib/store/Slices/Auth";
import type { AppDispatch, RootState } from "@/lib/store/Slices/Store";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
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
        const doctor = await dispatch(
          loginDoctor({ email: data.email, password: data.password })
        ).unwrap();
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              role: "medical",
              code: doctor.code,
              userDetails: doctor,
              status: "succeeded",
              isLoggedIn: true,
            })
          );
        }
        	toast.success(`Login successful, Welcome Back`);
        router.push("/");
      } else if (role === "patient") {
        const patient = await dispatch(
          loginPatient({ email: data.email, password: data.password })
        ).unwrap();
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              role: "patient",
              code: null,
              userDetails: patient,
              status: "succeeded",
              isLoggedIn: true,
            })
          );
        }
       	toast.success(`Login successful, Welcome Back`);
        router.push("/");
      }
    } catch (err: any) {
      	toast.error(`Something Went Wrong`);
    }
  };

  return (
    <div className="flex md:flex-row flex-col md:mt-0 min-h-screen font-sans sm:">
      {/* Left Section (Image, smaller width) */}
      <div className="hidden md:block relative md:w-4/10">
        <div
          className={`absolute inset-0 transform transition-all duration-700 ease-out ${
            imgVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src="/login.webp"
            fill
            alt="Doctor and patient"
            className="w-full h-full object-cover"
          />
            <div className="absolute inset-0 bg-blue-800/50" /> 
          <h2 className="absolute inset-0 flex justify-center items-center drop-shadow-lg px-6 font-extrabold text-white text-3xl md:text-4xl text-center leading-tight">
            Connecting Doctors and Patients Seamlessly.
          </h2>

        </div>
      </div>

      {/* Right Section (Form, larger width) */}
      <div className="flex flex-col justify-center items-center bg-white p-8 md:p-16 w-full md:w-6/10 h-screen">
        <h1 className="mb-2 font-bold text-gray-800 text-3xl md:text-4xl">
          Sign In
        </h1>
        <p className="mb-8 font-normal text-gray-500 text-base">
          Please enter your credentials to log in.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          {/* Email */}
          <div>
            <label
              className="block mb-1 font-medium text-gray-700 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-800 text-sm"
            />

            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block mb-1 font-medium text-gray-700 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Password"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-800 text-sm"
            />

            {errors.password && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-6 py-3 rounded-lg w-full font-semibold text-white text-sm transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
