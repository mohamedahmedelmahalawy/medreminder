"use client";

import { useId } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerCompProps {
  value?: Date; // Controlled value (from React Hook Form)
  onChange: (date: Date | undefined) => void; // Callback to update value
}

export default function DatePickerComp({ value, onChange }: DatePickerCompProps) {
  const id = useId();

  return (
    <div>
      <div className="*:not-first:mt-2">
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className="group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
              <span className={cn("truncate", !value && "text-muted-foreground")}>
                {value ? format(value, "PPP") : "Date Of Admission"}
              </span>
              <CalendarIcon
                size={16}
                className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange} // Updates the form value
              required
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}