"use client";
import {
  getMedicalSchedule,
  formatDate,
  MedicalAppointment,
} from "@/app/funcs/ProfileFunc";
import { redirect } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import CalenderENInput from "@/components/CalenderENInput";
import { DateRange } from "react-day-picker";
import { DNA } from "react-loader-spinner";

export default function MedicalSchedule() {
  const [appointments, setAppointments] = useState<MedicalAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      from: today,
      to: tomorrow,
    };
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        let auth: any;
        try {
          auth = JSON.parse(localStorage.getItem("auth") || "{}");
        } catch {
          console.error("Invalid auth object in localStorage");
        }
        if (!(auth && auth.role === "medical" && auth.code)) {
          console.error("No valid medical profile found in localStorage");
          return;
        }

        const medicalAppointments = await getMedicalSchedule(auth);

        // Sort newest → oldest
        const sorted = (medicalAppointments || []).sort(
          (a, b) =>
            new Date(b.schedule).getTime() - new Date(a.schedule).getTime()
        );

        setAppointments(sorted);
      } catch (error) {
        console.error("Error fetching medical schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

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

  // --- Apply search + date filters ---
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesName = appointment.patientName
        .toLowerCase()
        .includes(search.toLowerCase());

      const appointmentDate = new Date(appointment.schedule);

      const matchesDateRange = dateRange
        ? (!dateRange.from || appointmentDate >= dateRange.from) &&
          (!dateRange.to || appointmentDate <= dateRange.to)
        : true;

      return matchesName && matchesDateRange;
    });
  }, [appointments, search, dateRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">No appointments found in schedule.</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              My Appointments
            </h1>
            <p className="text-gray-600">
              Stay on top of your patient schedule.
            </p>
            <p className="text-gray-600">
              Total Appointments: {filteredAppointments.length} /{" "}
              {appointments.length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by patient name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-64"
          />
          <CalenderENInput value={dateRange} onChange={setDateRange} />
        </div>
      </header>

      {/* Appointments List */}
      <div className="space-y-4 mt-4">
        {filteredAppointments.map((appointment) => (
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
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer font-medium"
                  onClick={() =>
                    redirect(`/patients/${appointment.patientPhone}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
