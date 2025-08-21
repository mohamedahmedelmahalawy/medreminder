// app/components/MedicalProfileClient.tsx
"use client";

import { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Download,
} from "lucide-react";
import { getPatients, getProfile } from "@/app/funcs/ProfileFunc";
import type { Experience, Service } from "../(routes)/profile/page";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import ProfileManage from "./ProfileManage";

export default function MedicalProfile({
  experiences,
  services,
}: {
  experiences: Experience[];
  services: Service[];
}) {
  const [profile, setProfile] = useState<DoctorPatient | null>(null);
  const [doctorsPatient, setDoctorsPatient] = useState<DoctorPatient[] | null>(
    null
  );
  const [role, setRole] = useState<string | null>(null);

  // Use fetched patients if role is medical, otherwise use empty array
  const displayPatients =
    role === "medical" && doctorsPatient ? doctorsPatient : [];

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      try {
        const profileRole = auth.role;
        setRole(profileRole);
        const fetchedProfile = await getProfile(auth);
        setProfile(fetchedProfile);

        if (profileRole === "medical") {
          const DoctorsPatient = await getPatients(auth);
          setDoctorsPatient(DoctorsPatient);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-[#000D44]">Profile Loading ...</div>
      </div>
    );
  }

  const getInitials = (name: string): string => {
    if (!name) return "";

    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length >= 2) {
      // First letter of first two words
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    // Only one word
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {getInitials(profile.name)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                <p className="text-gray-500 text-sm">{profile.specialty}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Appointment</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col">
        {/* Sidebar */}
        <div className="w-full bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                    {getInitials(profile.name)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {profile.specialty}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>
                      {profile.city}, {profile.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span>{profile.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Professional Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    {role === "medical" ? (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doctor Code:</span>
                        <span className="font-medium">{profile.code}</span>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">
                        {profile.Age || profile.age} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-medium">{profile.country}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Stats */}
              {role === "medical" && (
                <>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      Patient Overview
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Patients</span>
                        <span className="font-semibold">
                          {displayPatients.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Active Cases</span>
                        <span className="font-semibold">
                          {displayPatients.reduce(
                            (total: number, patient: DoctorPatient) =>
                              total +
                              (patient.cases?.reduce(
                                (caseTotal: number, c: any) =>
                                  caseTotal + c.diagnosis.length,
                                0
                              ) || 0),
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">
                          Upcoming Appointments
                        </span>
                        <span className="font-semibold">6</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        Add New Patient
                      </button>
                      <button className="w-full text-left p-3 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                        Schedule Appointment
                      </button>
                      <button className="w-full text-left p-3 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ProfileManage
        profile={profile}
        displayPatients={displayPatients}
        experiences={experiences}
        services={services}
      />
    </div>
  );
}
