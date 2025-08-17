"use client";

import { useState } from "react";
import Image from "next/image";
import DoctorRegistration from "@/app/components/DoctorRegistration";
import PatientRegistration from "@/app/components/PatientRegistration";

export default function RegisterPage() {
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);

  if (role === "doctor") return <DoctorRegistration />;
  if (role === "patient") return <PatientRegistration />;

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-100 via-white to-purple-50 min-h-screen">
      <div className="flex md:flex-row flex-col bg-white shadow-2xl border border-gray-200 rounded-2xl w-full max-w-5xl overflow-hidden">
        {/* Left side */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto">
          <Image
            src="/midpage.jpg"
            alt="Doctor and Patient"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex justify-center items-center bg-purple-800/80 p-6">
            <p className="font-semibold text-white text-xl md:text-2xl text-center leading-relaxed">
              &rdquo;For the heroes in white coats and the patients they care
              for — <br />
              <span className="font-bold text-purple-200">
                MedReminder
              </span>{" "}
              makes communication effortless and care stronger.&rdquo;
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col flex-1 justify-center items-center bg-white p-10">
          <h2 className="mb-8 font-extrabold text-gray-800 text-3xl">
            Join as
          </h2>

          <button
            onClick={() => setRole("doctor")}
            className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-lg hover:shadow-purple-400/50 mb-5 py-4 rounded-xl w-56 font-semibold text-white text-lg text-center hover:scale-105 transition duration-300 ease-in-out transform"
          >
            Medical Crew
          </button>

          <button
            onClick={() => setRole("patient")}
            className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-lg hover:shadow-purple-400/50 py-4 rounded-xl w-56 font-semibold text-white text-lg text-center hover:scale-105 transition duration-300 ease-in-out transform"
          >
            Patient
          </button>

          <p className="mt-8 text-gray-500 text-sm text-center">
            Already registered?{" "}
            <a
              href="/login"
              className="font-semibold text-purple-700 hover:underline"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
