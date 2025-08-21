import CalenderENInput from "@/components/CalenderENInput";
import FilterInput from "@/components/FilterInput";
import SearchInput from "@/components/SearchInput";
import TableOriginUI from "@/components/TableOriginUI";
import React from "react";

export default function page() {
	return (
		<>

			<div className="w-3/4 mx-auto mt-10 h-screen">
					<div className="text-2xl font-semibold mb-4 bg-muted-foreground/10 p-4 rounded-md">
						<p>All Patients</p>
					</div>
					
				<div className="flex flex-row justify-between align-middle">
					<div className="w-1/4">
						{/* <SearchInput /> */}
					</div> 
					<div className="flex flex-row gap-5">
						{/* <FilterInput /> */}
						<CalenderENInput />
					</div>
				</div>
				<div className="mt-10">
					<TableOriginUI />
				</div>
			</div>
		</>
	);
}
