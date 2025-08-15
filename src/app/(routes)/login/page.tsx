"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Login successful!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 bg-purple-700 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
          Connecting Doctors and Patients Seamlessly.
        </h2>
        <p className="text-center text-purple-100 max-w-sm">
          We make it easy for you to reach and care for more patients.
        </p>
        <div className="mt-6 flex flex-col items-center">
          <img
            src="/LoginPics.jpeg"
            alt="Doctor and patient"
            width={600}
            height={200}
            // className="rounded-full w-16 h-16 mb-2"
          />
          <span className="text-sm text-purple-200">Your trusted platform</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full p-6 md:p-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-gray-500 mb-6">
          Please enter your credentials to log in.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-sm"
        >
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
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
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
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
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white rounded px-6 py-2 hover:bg-purple-700 transition disabled:bg-purple-400"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-sm mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-purple-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
