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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        
        {/* Left side */}
        <div className="relative w-full md:w-1/2 h-72 md:h-auto">
          <Image
            src="/midpage.jpg"
            alt="Doctor and Patient"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-800/80 flex items-center justify-center p-6">
            <p className="text-white text-xl md:text-2xl font-semibold text-center leading-relaxed">
              "For the heroes in white coats and the patients they care for — <br />
              <span className="font-bold text-purple-200">MedReminder</span> makes communication effortless and care stronger."
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-col items-center justify-center p-10 bg-white">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
            Join as
          </h2>

          <button
            onClick={() => setRole("doctor")}
            className="w-56 text-center bg-gradient-to-r from-purple-700 to-purple-900 text-white py-4 rounded-xl mb-5 text-lg font-semibold 
                       shadow-lg hover:shadow-purple-400/50 transform hover:scale-105 transition duration-300 ease-in-out"
          >
             Medical Crew
          </button>

          <button
            onClick={() => setRole("patient")}
            className="w-56 text-center bg-gradient-to-r from-purple-700 to-purple-900 text-white py-4 rounded-xl text-lg font-semibold 
                       shadow-lg hover:shadow-purple-400/50 transform hover:scale-105 transition duration-300 ease-in-out"
          >
             Patient
          </button>

          <p className="text-gray-500 text-sm mt-8 text-center">
            Already registered?{" "}
            <a href="/login" className="text-purple-700 font-semibold hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
