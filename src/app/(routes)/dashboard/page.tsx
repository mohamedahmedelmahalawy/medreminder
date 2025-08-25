"use client";

import PrivateRoute from "@/app/private-route/PrivateRoutes";
import CalenderENInput from "@/components/CalenderENInput";
import FilterInput, { Filters } from "@/components/FilterInput";
import SearchInput from "@/components/SearchInput";
import TableOriginUI from "@/components/TableOriginUI";
import React, { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

export default function page() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filters, setFilters] = useState<Filters>({
    realTime: false,
    topChannels: false,
    lastOrders: false,
    totalSpent: false,
  });
  return (
    <>
      {/* bg-[#000D44]/5 */}


      <PrivateRoute requiredRoles={["medical"]}>

        <div className="mx-auto mt-10 pb-3 w-3/4 min-h-screen">
          <div className="mb-4 p-4 rounded-md font-semibold text-[#000D44] text-2xl text-center">
            <p>All Patients</p>
          </div>

          <div className="flex flex-row justify-between align-middle">
            <div className="w-1/4">{/* <SearchInput /> */}</div>

            <div className="flex flex-row gap-5">
              {/* <CalenderENInput value={dateRange} onChange={setDateRange} /> */}
              {/* <FilterInput
							value={filters}
							onApply={setFilters}
							onClear={() =>
								setFilters({ realTime: false, topChannels: false, lastOrders: false, totalSpent: false })
							}
						/> */}
            </div>
          </div>
          <div className="mt-10">
            <TableOriginUI filters={filters} />
          </div>
        </div>
      </PrivateRoute>
    </>
  );
}
