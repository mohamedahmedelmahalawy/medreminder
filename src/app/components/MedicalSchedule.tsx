"use client";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { getPatients, formatDate } from "@/app/funcs/ProfileFunc";
import React, { useEffect, useState } from "react";

export default function MedicalSchedule() {
  const [patients, setPatients] = useState<DoctorPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<
    Array<{
      id: string;
      patientName: string;
      patientPhone: string;
      patientAge: number;
      patientCountry: string;
      patientGender: string;
      patientProfession: string;
      diagnosis: string;
      medicalTreatment: string;
      schedule: string;
      complaint: string;
      prognosis?: string;
      medicalReport?: string;
    }>
  >([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Get auth data from localStorage
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");

        if (auth && auth.role === "medical" && auth.code) {
          // Create a profile object with the auth data
          const profileData: DoctorPatient = {
            role: auth.role,
            code: auth.code,
            name: auth.name || "",
            phone: auth.phone || "",
            email: auth.email || "",
            specialty: auth.specialty || "",
          };

          const data = await getPatients(profileData);
          const validPatients = (data || []).filter(
            (p: any) => p && (p.id || p.name || p.phone)
          ) as DoctorPatient[];
          setPatients(validPatients);
        } else {
          console.error("No valid medical profile found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  // Prepare appointments once patients are loaded
  useEffect(() => {
    if (!patients || patients.length === 0) {
      setAppointments([]);
      return;
    }

    const all: Array<{
      id: string;
      patientName: string;
      patientPhone: string;
      patientAge: number;
      patientCountry: string;
      patientGender: string;
      patientProfession: string;
      diagnosis: string;
      medicalTreatment: string;
      schedule: string;
      complaint: string;
      prognosis?: string;
      medicalReport?: string;
    }> = [];

    patients.forEach((patient) => {
      if (patient.cases && patient.cases.length > 0) {
        patient.cases.forEach((caseRecord) => {
          if (caseRecord.diagnosis && caseRecord.diagnosis.length > 0) {
            caseRecord.diagnosis.forEach((diag) => {
              all.push({
                id: `${patient.id}-${diag.schedule}`,
                patientName: patient.name,
                patientPhone: patient.phone,
                patientAge: patient.age || 0,
                patientCountry: patient.country || "",
                patientGender: patient.gender || "",
                patientProfession: patient.profession || "",
                diagnosis: diag.diagnosis,
                medicalTreatment: diag["medical-treatment"],
                schedule: diag.schedule,
                complaint: diag.complaint,
                prognosis: diag.prognosis,
                medicalReport: diag["medical-report"],
              });
            });
          }
        });
      }
    });

    all.sort(
      (a, b) => new Date(a.schedule).getTime() - new Date(b.schedule).getTime()
    );

    setAppointments(all);
  }, [patients]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading schedule...</div>
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">No patients found in schedule.</div>
      </div>
    );
  }

  // appointments are computed in the effect above

  const getStatusColor = (schedule: string) => {
    const now = new Date();
    const appointmentDate = new Date(schedule);

    if (appointmentDate < now) {
      return "text-gray-600 bg-gray-100"; // Past
    } else if (
      appointmentDate.getTime() - now.getTime() <
      24 * 60 * 60 * 1000
    ) {
      return "text-yellow-600 bg-yellow-100"; // Today/Tomorrow
    } else {
      return "text-green-600 bg-green-100"; // Future
    }
  };

  const getStatusText = (schedule: string) => {
    const now = new Date();
    const appointmentDate = new Date(schedule);

    if (appointmentDate < now) {
      return "Completed";
    } else if (
      appointmentDate.getTime() - now.getTime() <
      24 * 60 * 60 * 1000
    ) {
      return "Upcoming";
    } else {
      return "Scheduled";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Medical Schedule
        </h2>
        <p className="text-sm text-gray-500">
          Total Patients: {patients.length} | Total Appointments:{" "}
          {appointments.length}
        </p>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="text-center min-w-[80px]">
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(appointment.schedule)}
                </p>
              </div>
              <div className="w-px h-16 bg-gray-200"></div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {appointment.patientName}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {appointment.patientPhone}
                    </p>
                    <p>
                      <span className="font-medium">Age:</span>{" "}
                      {appointment.patientAge}
                    </p>
                    <p>
                      <span className="font-medium">Country:</span>{" "}
                      {appointment.patientCountry}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">Gender:</span>{" "}
                      {appointment.patientGender}
                    </p>
                    <p>
                      <span className="font-medium">Profession:</span>{" "}
                      {appointment.patientProfession}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm">
                    <span className="font-medium text-blue-600">
                      Diagnosis:
                    </span>{" "}
                    {appointment.diagnosis}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-green-600">
                      Treatment:
                    </span>{" "}
                    {appointment.medicalTreatment}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-orange-600">
                      Complaint:
                    </span>{" "}
                    {appointment.complaint}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-3 ml-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  appointment.schedule
                )}`}
              >
                {getStatusText(appointment.schedule)}
              </span>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                {/* <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Reschedule
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
