"use client";

import Sidebar from "@/app/components/Sidebar";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    console.log("Logging out...");
    alert("You Logged Out Successfully");
  };

  return (
    <div className="flex min-h-[850px] bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
