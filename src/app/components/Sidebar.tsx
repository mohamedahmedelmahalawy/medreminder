"use client";

import Link from "next/link";
import {
  User,
  Calendar,
  LayoutDashboard,
  LogOut,
  ClipboardList,
  UserPlus,
  HeartPulse,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      setRole(auth?.role || null);
    } catch (error) {
      console.error("Failed to parse auth from localStorage:", error);
      setRole(null);
    }
  }, []);

  const sharedTabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      href: "/profile",
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: <Calendar className="w-5 h-5" />,
      href: "/profile/schedule",
    },
  ];

  const medicalTabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/dashboard",
    },
  ];

  const patientTabs = [
    {
      id: "evaluation",
      label: "Evaluation",
      icon: <ClipboardList className="w-5 h-5" />,
      href: "/profile/evaluation",
    },
    {
      id: "doctor-code",
      label: "Doctor's Code",
      icon: <UserPlus className="w-5 h-5" />,
      href: "/profile/code",
    },
    {
      id: "all-doctors",
      label: "All Doctors",
      icon: <HeartPulse className="w-5 h-5" />,
      href: "/profile/doctors",
    },
  ];

  let sidebarItems = [...sharedTabs];
  if (role === "medical") sidebarItems = [...sidebarItems, ...medicalTabs];
  if (role === "patient") sidebarItems = [...sidebarItems, ...patientTabs];

  const onLogout = () => {
    {
      /* Logout Logic */
    }
  };

  useEffect(() => {
    if (role === null) return;
    if (pathname === "/profile/dashboard" && role !== "medical") {
      router.replace("/profile");
    }
    if (
      (pathname === "/profile/code" || pathname === "/profile/evaluation") &&
      role !== "patient"
    ) {
      router.replace("/profile");
    }
  }, [pathname, role, router]);

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white bg-opacity-30 rounded-lg flex items-center justify-center text-black">
            <User className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold">Med-Reminder</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors no-underline ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
