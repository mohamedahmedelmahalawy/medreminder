"use client";

import { getCode, getDoctor, getPatientDoctors } from "@/app/funcs/ProfileFunc";
import { User, UserPlus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Doctor } from "@/lib/interfaces/Doctor";
import { toast } from "react-toastify";

export default function CodePages() {
  const [doctorCode, setDoctorCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "none" | "success" | "error"
  >("none");
  const [connectedDoctor, setConnectedDoctor] = useState<any>(null);
  const [myDoctors, setMyDoctors] = useState<Doctor[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  // Fetch doctors when component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");
        if (auth.userDetails?.phone) {
          const doctors = await getPatientDoctors(auth.userDetails.phone);
          setMyDoctors(doctors);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setDoctorsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmitCode = async () => {
    if (!doctorCode.trim()) {
      toast.error("Please enter a doctor code", { position: "top-center" });
      return;
    }

    setIsLoading(true);

    try {
      // Get auth from localStorage
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");

      // Call getCode with the input code
      const result = await getCode(doctorCode, auth.userDetails?.phone);

      if (result) {
        // If getCode succeeds, fetch doctor details
        const doctorData = await getDoctor(doctorCode);

        if (doctorData) {
          setConnectionStatus("success");
          setConnectedDoctor({
            name: doctorData.name,
            specialization: doctorData.specialty,
            hospital: doctorData.city,
            code: doctorCode,
          });

          // Add the new doctor to the myDoctors list immediately
          const newDoctor: Doctor = {
            name: doctorData.name,
            specialty: doctorData.specialty,
            city: doctorData.city,
            code: doctorCode,
            profession: doctorData.profession || "Doctor",
            country: doctorData.country || "Unknown",
            phone: doctorData.phone || "",
            email: doctorData.email || "",
            password: doctorData.password || "",
            patient: doctorData.patient || [],
            id: doctorData.id || 0,
          };

          setMyDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
        } else {
          setConnectionStatus("error");
        }
      } else {
        setConnectionStatus("error");
      }
    } catch (error) {
      console.error("Error connecting to doctor:", error);
      setConnectionStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Removed the hardcoded getCode call from useEffect
  // Now getCode will only be called when user submits a code

  const handleDisconnect = () => {
    setDoctorCode("");
    setConnectionStatus("none");
    setConnectedDoctor(null);
  };

  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm px-6 py-4 border-gray-200 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-gray-900 text-2xl capitalize">
              Connect with Your Doctor
            </h1>
            <p className="text-gray-600">
              Enter your doctor's unique code to establish a connection
            </p>
          </div>
        </div>
      </header>
      {/* Add Doctor Section */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6">
          {connectionStatus === "none" && (
            <div className="max-w-md">
              <label className="block mb-2 font-bold text-gray-700">
                Doctor's Code
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={doctorCode}
                  onChange={(e) => setDoctorCode(e.target.value)}
                  placeholder="Enter doctor's code (e.g., DR123456)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={20}
                />
                <button
                  onClick={handleSubmitCode}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded-lg text-white transition-colors disabled:cursor-not-allowed"
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </button>
              </div>
              <p className="mt-2 text-gray-500 text-sm">
                Ask your doctor for their unique connection code during your
                visit
              </p>
            </div>
          )}

          {connectionStatus === "success" && connectedDoctor && (
            <div className="max-w-md">
              <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10">
                    <UserPlus className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900">
                      Successfully Connected!
                    </h4>
                    <p className="text-green-700 text-sm">
                      Connected to {connectedDoctor.name} (
                      {connectedDoctor.specialization})
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => setConnectionStatus("none")}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-colors"
                  >
                    Add Another Doctor
                  </button>
                  <Link
                    href="/profile"
                    onClick={handleDisconnect}
                    className="hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 transition-colors"
                  >
                    Close
                  </Link>
                </div>
              </div>
            </div>
          )}

          {connectionStatus === "error" && (
            <div className="max-w-md">
              <div className="bg-red-50 mb-4 p-4 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex justify-center items-center bg-red-100 rounded-full w-10 h-10">
                    <UserPlus className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-red-900">
                      Connection Failed
                    </h4>
                    <p className="text-red-700 text-sm">
                      Invalid doctor code. Please check with your doctor and try
                      again.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setConnectionStatus("none")}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6 border-gray-200 border-b">
          <h3 className="font-semibold text-gray-900 text-lg">How It Works</h3>
        </div>
        <div className="p-6">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center items-center bg-blue-100 mx-auto mb-3 rounded-full w-12 h-12">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <h4 className="mb-2 font-medium text-gray-900">Get the Code</h4>
              <p className="text-gray-600 text-sm">
                Ask your doctor for their unique connection code during your
                appointment or consultation.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-green-100 mx-auto mb-3 rounded-full w-12 h-12">
                <span className="font-bold text-green-600">2</span>
              </div>
              <h4 className="mb-2 font-medium text-gray-900">Enter the Code</h4>
              <p className="text-gray-600 text-sm">
                Input the code in the field above and click connect to establish
                the connection.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-purple-100 mx-auto mb-3 rounded-full w-12 h-12">
                <span className="font-bold text-purple-600">3</span>
              </div>
              <h4 className="mb-2 font-medium text-gray-900">Stay Connected</h4>
              <p className="text-gray-600 text-sm">
                Access your medical records, schedule appointments, and
                communicate securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Doctors */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl">
        <div className="p-6 border-gray-200 border-b">
          <h3 className="font-semibold text-gray-900 text-lg">
            My Connected Doctors
          </h3>
          <p className="mt-1 text-gray-600">
            Doctors you're currently connected with
          </p>
        </div>
        <div className="p-6">
          {doctorsLoading ? (
            <div className="py-8 text-center">
              <UserPlus className="mx-auto mb-3 w-12 h-12 text-gray-400" />
              <h4 className="mb-2 font-medium text-gray-900">
                Loading Doctors...
              </h4>
              <p className="text-gray-600">
                Please wait while we fetch your connected doctors.
              </p>
            </div>
          ) : myDoctors.length === 0 ? (
            <div className="py-8 text-center">
              <UserPlus className="mx-auto mb-3 w-12 h-12 text-gray-400" />
              <h4 className="mb-2 font-medium text-gray-900">
                No Connected Doctors
              </h4>
              <p className="text-gray-600">
                Use a doctor's code above to connect with your healthcare
                provider
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {myDoctors.map((doctor) => (
                <div
                  key={doctor.code}
                  className="flex justify-between items-center hover:bg-gray-50 p-4 border border-gray-200 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {doctor.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {doctor.specialty} • {doctor.city}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {doctor.profession} • {doctor.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 px-2 py-1 rounded-full font-medium text-green-800 text-xs">
                      active
                    </span>
                    <button className="font-medium text-blue-600 hover:text-blue-800 text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
