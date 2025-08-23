"use client";

import Sidebar from "@/app/components/Sidebar";
export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-[850px] bg-gray-50'>
			{/* Sidebar */}
			<Sidebar />
			{/* Main Content */}
			<div className='flex-1 flex flex-col max-w-7xl mx-auto p-8'>{children}</div>
		</div>
	);
}
