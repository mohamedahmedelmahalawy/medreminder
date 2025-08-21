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
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { getProfile } from "@/app/funcs/ProfileFunc";
import type { Experience, Service } from "../(routes)/profile/page";

interface PatientCase {
  diagnosis: {
    diagnosis: string;
    prognosis: string;
    "medical-report": string;
    "medical-treatment": string;
    schedule: string;
    complaint: string;
  }[];
}

interface Patient {
  id: string;
  name: string;
  dateOfAdmission: string;
  phone: string;
  country: string;
  gender: string;
  profession: string;
  age: number;
  cases: PatientCase[];
}

// interface Experience {
// 	role: string;
// 	organization: string;
// 	years: string;
// 	description: string;
// }

export default function MedicalProfile({
  patients,
  experiences,
  services,
}: {
  patients: Patient[];
  experiences: Experience[];
  services: Service[];
}) {
  const [activeTab, setActiveTab] = useState<
    "about" | "experience" | "patients" | "schedule"
  >("about");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [profile, setProfile] = useState<DoctorPatient | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      try {
        const fetchedProfile = await getProfile(auth);
        const profileRole = auth.role;
        setRole(profileRole);
        setProfile(fetchedProfile);
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

  const TabButton: React.FC<{
    tab: string;
    label: string;
    icon: React.ReactNode;
  }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
        activeTab === tab
          ? "bg-blue-600 text-white shadow-lg"
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
                      {profile.city}, {profile.country}{" "}
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
              {role === "medical" ? (
                <>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      Patient Overview
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Patients</span>
                        <span className="font-semibold">{patients.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Active Cases</span>
                        <span className="font-semibold">
                          {patients.reduce(
                            (total, patient) =>
                              total +
                              patient.cases.reduce(
                                (caseTotal, c) =>
                                  caseTotal + c.diagnosis.length,
                                0
                              ),
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
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto p-8">
          <div className="bg-white rounded-xl shadow-lg">
            {/* Tab Navigation */}
            <div className="border-b p-6">
              <div className="flex flex-wrap gap-2">
                <TabButton
                  tab="about"
                  label="About"
                  icon={<User className="w-4 h-4" />}
                />
                <TabButton
                  tab="experience"
                  label="Experience"
                  icon={<Briefcase className="w-4 h-4" />}
                />
                <TabButton
                  tab="patients"
                  label="Patients"
                  icon={<Users className="w-4 h-4" />}
                />
                <TabButton
                  tab="schedule"
                  label="Schedule"
                  icon={<Calendar className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "about" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      About Dr. AbdElRahman
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {profile.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Medical & Technical Services
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-3">
                            {service.icon}
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">
                                {service.name}
                              </h5>
                              <p className="text-gray-600 text-sm">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Medical Approach
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 italic">
                        "Combining traditional medical expertise with modern
                        data science to provide evidence-based, personalized
                        healthcare solutions. My approach focuses on leveraging
                        technology to enhance patient care and improve health
                        outcomes."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Professional Experience
                  </h3>
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-6 pb-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {exp.title}
                        </h4>
                        <span className="text-sm text-gray-500 font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mb-3">
                        {exp.institution}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-gray-600 text-sm">
                            • {desc}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.specializations.map((spec, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "patients" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      Patient Management
                    </h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add New Patient
                    </button>
                  </div>

                  {!selectedPatient ? (
                    <div className="grid gap-4">
                      {patients.map((patient) => (
                        <div
                          key={patient.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {patient.name}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                ID: {patient.id} • Age: {patient.age} •{" "}
                                {patient.profession}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                {patient.country}
                              </p>
                              <p className="text-sm font-medium text-blue-600">
                                {patient.cases[0].diagnosis.length} Active Cases
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              Last Visit: {formatDate(patient.dateOfAdmission)}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800">
                              View Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <button
                          onClick={() => setSelectedPatient(null)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ← Back to Patients
                        </button>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {selectedPatient.name}
                          </h4>
                          <p className="text-gray-600">
                            Patient ID: {selectedPatient.id}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Patient Information
                          </h5>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="text-gray-600">Age:</span>{" "}
                              {selectedPatient.age}
                            </p>
                            <p>
                              <span className="text-gray-600">Gender:</span>{" "}
                              {selectedPatient.gender}
                            </p>
                            <p>
                              <span className="text-gray-600">Profession:</span>{" "}
                              {selectedPatient.profession}
                            </p>
                            <p>
                              <span className="text-gray-600">Country:</span>{" "}
                              {selectedPatient.country}
                            </p>
                            <p>
                              <span className="text-gray-600">Phone:</span>{" "}
                              {selectedPatient.phone}
                            </p>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            Admission Details
                          </h5>
                          <p className="text-sm text-gray-600">
                            Date of Admission:
                          </p>
                          <p className="font-medium">
                            {formatDate(selectedPatient.dateOfAdmission)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Medical Cases
                        </h5>
                        {selectedPatient.cases[0].diagnosis.map(
                          (diag, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-lg p-4 mb-4"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h6 className="font-semibold text-gray-900">
                                  {diag.diagnosis}
                                </h6>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {formatDate(diag.schedule)}
                                </span>
                              </div>

                              <div className="space-y-3 text-sm">
                                <div>
                                  <p className="font-medium text-gray-700">
                                    Chief Complaint:
                                  </p>
                                  <p className="text-gray-600">
                                    {diag.complaint}
                                  </p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700">
                                    Medical Report:
                                  </p>
                                  <p className="text-gray-600">
                                    {diag["medical-report"]}
                                  </p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700">
                                    Treatment Plan:
                                  </p>
                                  <p className="text-gray-600">
                                    {diag["medical-treatment"]}
                                  </p>
                                </div>

                                <div>
                                  <p className="font-medium text-gray-700">
                                    Prognosis:
                                  </p>
                                  <p className="text-gray-600">
                                    {diag.prognosis}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Upcoming Schedule
                  </h3>

                  <div className="grid gap-4">
                    {patients.map((patient) =>
                      patient.cases[0].diagnosis.map((diag, index) => (
                        <div
                          key={`${patient.id}-${index}`}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {patient.name}
                            </h4>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {diag.diagnosis}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>📅 {formatDate(diag.schedule)}</span>
                            <span>📞 {patient.phone}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Follow-up: {diag["medical-treatment"]}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
