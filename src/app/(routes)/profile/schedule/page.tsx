"use client";

import MedicalSchedule from "@/app/components/MedicalSchedule";
import PatientSchedule from "@/app/components/PatientSchedule";
import { getPatients, getProfile } from "@/app/funcs/ProfileFunc";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
// import { Bell, Search, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SchedulePage() {
  // const [profile, setProfile] = useState<DoctorPatient | null>(null);
  // const [doctorsPatient, setDoctorsPatient] = useState<DoctorPatient[] | null>(
  //   null
  // );
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      try {
        const profileRole = auth.role;
        setRole(profileRole);
        // const fetchedProfile = await getProfile(auth);
        // setProfile(fetchedProfile);

        if (profileRole === "medical") {
          const DoctorsPatient = await getPatients(auth);
          // setDoctorsPatient(DoctorsPatient);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {/* <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              Schedule
            </h1>
            <p className="text-gray-600">
              Welcome back{" "}
              <>
                {role === "medical" ? (
                  <>dr. {profile?.name}</>
                ) : (
                  <>{profile?.name}</>
                )}
              </>
            </p>
          </div>

          // we can add a search to the schedule later

          <div className='flex items-center space-x-4'>
						<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
							<Search className='w-5 h-5' />
						</button>
						<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors relative'>
							<Bell className='w-5 h-5' />
							<span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
						</button>
						<button className='p-2 text-gray-400 hover:text-gray-600 transition-colors'>
							<Settings className='w-5 h-5' />
						</button>
					</div>
        </div>
      </header> */}
      <div className="">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* <div className='p-6 border-b border-gray-200'>
						<div className='flex items-center justify-between'>
							<h3 className="text-xl font-semibold text-gray-900">
                Upcoming Schedule
              </h3>
							<button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
								Add Appointment
							</button>
						</div>
						<p className='text-gray-600 mt-1'>Monday, August 17, 2025</p>
					</div> */}

          <div className="p-6">
            {role === "medical" && <MedicalSchedule />}
            {role === "patient" && <PatientSchedule />}
          </div>
        </div>

        {/* Weekly Overview can be added later */}

        {/* <div className='bg-white rounded-xl shadow-sm border border-gray-200'>
					<div className='p-6 border-b border-gray-200'>
						<h3 className='text-lg font-semibold text-gray-900'>Weekly Overview</h3>
					</div>
					<div className='p-6'>
						<div className='grid grid-cols-7 gap-4'>
							{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
								<div key={day} className='text-center'>
									<div className='text-sm font-medium text-gray-600 mb-2'>{day}</div>
									<div
										className={`w-full h-20 rounded-lg border-2 border-dashed ${
											index === 0 ? "border-blue-300 bg-blue-50" : "border-gray-200"
										} flex items-center justify-center`}
									>
										<span className='text-sm text-gray-500'>
											{index === 0 ? "5 appts" : `${Math.floor(Math.random() * 8)} appts`}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div> */}
      </div>
    </>
  );
}
