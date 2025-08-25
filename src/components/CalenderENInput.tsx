"use client";

import { useId, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: DateRange;
  onChange?: (range?: DateRange) => void;
};
export default function CalenderENInput({ value, onChange }: Props) {
  const id = useId();
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className="group bg-background hover:bg-blue-600  border-input w-full justify-between px-3 font-normal   transition-colors duration-250"
            >
              <span
                className={cn(
                  "truncate",
                  "text-black group-hover:text-white font-semibold"
                )}
              >
                {value?.from ? (
                  value.to ? (
                    <>
                      {format(value.from, "LLL dd, y")} -{" "}
                      {format(value.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(value.from, "LLL dd, y")
                  )
                ) : (
                  "Filter By Date Range"
                )}
              </span>
              <CalendarIcon
                size={16}
                className="text-black-foreground/80 group-hover:text-white shrink-0 "
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 " align="start">
            <Calendar mode="range" selected={value} onSelect={onChange} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
