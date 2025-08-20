"use client";

import { useId } from "react";
import { BriefcaseMedical } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function ModalDig() {
  const {register} = useForm();
	const id = useId();

	return (
    
		<Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Diagnostic</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex justify-center items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
              <BriefcaseMedical className="opacity-80" size={20} />
            </div>
            <DialogHeader>
              <DialogTitle className="">Add Diagnostic</DialogTitle>
            </DialogHeader>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Input id={`name-${id}`} placeholder="" type="text" required />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Add Diagnostic
            </Button>
          </form>
        </DialogContent>
		</Dialog>
	);
}
