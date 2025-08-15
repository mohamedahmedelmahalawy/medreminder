import { ReactNode, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import SelectGender from "./SelectGender";
import { DatePicker } from "react-aria-components";
import DatePickerComp from "./DatePickerComp";
import { Controller } from "react-hook-form";
interface ModalProps{
	name:string
}

export default function Modal({name}:ModalProps) {
	const id = useId();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedGender, setSelectedGender] = useState<string>("");

	const {
		register,
		handleSubmit,
		control,
    reset,
		formState: { errors },
	} = useForm();

	function onSubmit(data: any) {
		console.log({ ...data, selectedDate, selectedGender });
    reset();
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full">
					<PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
					{name}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-[90vw] sm:max-w-[625px] lg:max-w-[700px]">
				<div className="flex flex-col items-center gap-2">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
						<svg
							className="stroke-zinc-800 dark:stroke-zinc-100"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 32 32"
							aria-hidden="true">
							<circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
						</svg>
					</div>
					<DialogHeader>
						<DialogTitle className="sm:text-center">Welcome Dr,Amr</DialogTitle>
						<DialogDescription className="sm:text-center">
							Please enter the patient&apos;s information to add them to your list.
						</DialogDescription>
					</DialogHeader>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					<div className="space-y-4">
						<div className="*:not-first:mt-2">
							<Input
								placeholder="Name"
								{...register("name", {
									required: {
										value: true,
										message: "Name is required",
									},
									pattern: {
										value: /^[a-zA-Z\s]+$/,
										message: "Name must contain only letters and spaces",
									},
								})}
							/>
							{errors.name && <span className="text-destructive">{String(errors.name.message)}</span>}
						</div>
						<div className="*:not-first:mt-2">
							<Controller
								name="date"
								control={control}
								rules={{ required: "date is required" }}
								render={({ field }) => <DatePickerComp value={field.value} onChange={field.onChange} />}
							/>
							{errors.date && <span className="text-destructive">{String(errors.date.message)}</span>}
						</div>
						<div className="*:not-first:mt-2">
							<Input
								placeholder="Telephone"
								id={`${id}-telephone`}
								{...register("telephone", {
									required: {
										value: true,
										message: "Telephone is required",
									},
									pattern: {
										value: /^\d{11}$/,
										message: "Telephone must be 11 digits",
									},
								})}
								type="tel"
							/>
							{errors.telephone && <span className="text-destructive">{String(errors.telephone.message)}</span>}
						</div>

						<div className="*:not-first:mt-2">
							
							<Input
              placeholder="Country"
								id={`${id}-country`}
								{...register("country", {
									required: {
										value: true,
										message: "Country is required",
									},
								})}
								type="text"
							/>
							{errors.country && <span className="text-destructive">{String(errors.country.message)}</span>}
						</div>
						<div className="*:not-first:mt-2">
							<Controller
								name="gender"
								control={control}
								rules={{ required: "gender is required" }}
								render={({ field }) => <SelectGender value={field.value} onChange={field.onChange} />}
							/>
						</div>

						<div className="*:not-first:mt-2">						
							<Input
              placeholder="Profession"
								id={`${id}-profession`}
								{...register("profession", {
									required: {
										value: true,
										message: "Profession is required",
									},
								})}
								type="text"
							/>
							{errors.profession && <span className="text-destructive">{String(errors.profession.message)}</span>}
						</div>
					</div>

					<Button type="submit" className="w-full">
						Add Patient
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
