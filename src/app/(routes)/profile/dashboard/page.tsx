import {
  Bell,
  Calendar,
  LayoutDashboard,
  Search,
  Settings,
  User,
} from "lucide-react";
import React from "react";

export default function DashboardPage() {
  return (
    <>
      <header className="bg-white shadow-sm px-6 py-4 border-gray-200 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-gray-900 text-2xl capitalize">
              Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, Dr. Smith</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="-top-1 -right-1 absolute bg-red-500 rounded-full w-3 h-3"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-600 text-sm">
                  Today&apos;s Appointments
                </p>
                <p className="font-bold text-gray-900 text-3xl">12</p>
              </div>
              <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-600 text-sm">
                  Total Patients
                </p>
                <p className="font-bold text-gray-900 text-3xl">1,247</p>
              </div>
              <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-600 text-sm">
                  Pending Reviews
                </p>
                <p className="font-bold text-gray-900 text-3xl">8</p>
              </div>
              <div className="flex justify-center items-center bg-yellow-100 rounded-lg w-12 h-12">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-600 text-sm">
                  Monthly Revenue
                </p>
                <p className="font-bold text-gray-900 text-3xl">$24,580</p>
              </div>
              <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
                <LayoutDashboard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl">
          <div className="p-6 border-gray-200 border-b">
            <h3 className="font-semibold text-gray-900 text-lg">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="flex justify-center items-center bg-gray-100 rounded-full w-10 h-10">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      Patient consultation completed
                    </p>
                    <p className="text-gray-500 text-sm">
                      John Doe - 2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
