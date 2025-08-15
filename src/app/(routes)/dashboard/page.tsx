import CalenderENInput from "@/components/CalenderENInput";
import FilterInput from "@/components/FilterInput";
import SearchInput from "@/components/SearchInput";
import TableOriginUI from "@/components/TableOriginUI";
import React from "react";

export default function page() {
	return (
		<>

			<div className="w-4/5 mx-auto mt-10">
				<div className="flex flex-row justify-between align-middle">
					<div className="w-1/4">

						<SearchInput />
					</div>
					<div className='flex flex-row gap-5'>
						<CalenderENInput />
						<FilterInput />
					</div>
				</div>
				<div className='mt-10'>
					<div className='text-2xl font-semibold mb-4 bg-muted-foreground/10 p-4 rounded-md'>
						<p>All Patients</p>
					</div>

					<TableOriginUI />
				</div>
			</div>
		</>
	);
}
