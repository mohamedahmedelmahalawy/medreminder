"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DoctorRegistration from "@/app/components/DoctorRegistration";
import PatientRegistration from "@/app/components/PatientRegistration";
import { useDispatch } from "react-redux";
import { setRole } from "@/lib/store/Slices/Auth";
import { sign } from "crypto";

export default function RegisterPage() {
  const [signupRole, setSignupRole] = useState<"medical" | "patient" | null>(
    null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (signupRole) {
      dispatch(setRole(signupRole));
    }
  }, [signupRole, dispatch]);

  if (signupRole === "medical") {
    return <DoctorRegistration />;
  }
  if (signupRole === "patient") {
    return <PatientRegistration />;
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen">
      <div className="flex md:flex-row flex-col bg-white shadow-2xl border border-gray-200 rounded-2xl w-full max-w-5xl overflow-hidden">
        {/* Left side */}

        <div className="relative w-full md:w-1/2 h-72 md:h-auto">
          <div className="absolute inset-0 bg-black/40" />
          <Image
            src="/midpage.jpg"
            alt="Doctor and Patient"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex justify-center items-center bg-blue-800/70 p-6">
            <p className="font-semibold text-white text-xl md:text-2xl text-center leading-relaxed">
              &quot;For the heroes in white coats and the patients they care for
              — <br />
              &quot;
              <span className="font-bold text-white">MedReminder</span> makes
              communication effortless and care stronger.&rdquo;
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col flex-1 justify-center items-center bg-white p-10">
          <h2 className="mb-8 font-extrabold text-gray-800 text-3xl">
            Join as
          </h2>

          <button
            onClick={() => setSignupRole("medical")}
            className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg hover:shadow-blue-400/50 mb-5 py-4 rounded-xl w-56 font-semibold text-white text-lg text-center hover:scale-105 transition duration-300 ease-in-out cursor-pointer transform"
          >
            Medical Crew
          </button>

          <button
            onClick={() => setSignupRole("patient")}
            className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg hover:shadow-blue-400/50 py-4 rounded-xl w-56 font-semibold text-white text-lg text-center hover:scale-105 transition duration-300 ease-in-out cursor-pointer transform"
          >
            Patient
          </button>

          <p className="mt-8 text-gray-500 text-sm text-center">
            Already registered?{" "}
            <a
              href="/login"
              className="font-semibold text-blue-700 hover:underline"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
