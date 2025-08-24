import { ReactNode, useEffect, useId, useState } from "react";

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
import PhoneInputOrigin from "./PhoneInputOrigin";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/Slices/Store";
import { addPatient } from "@/lib/store/Slices/MedicalSlicer";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import CountryInput from "./CountryInput";
import { parse } from "date-fns";
import { toast } from "react-toastify";
interface ModalProps {
	name?: string;
}

export type FormVals = {
	name: string;
	phone: string;
	country: string;
	gender: "male" | "female";
	profession: string;
	age: number;
	dateOfAdmission: string | Date;
};

export default function Modal({ name }: ModalProps) {
	const id = useId();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedGender, setSelectedGender] = useState<string>("");
	const [closeModal, setCloseModal] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const [user, setUser] = useState<any>(null);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormVals>();

			useEffect(() => {
			const storedAuth = localStorage.getItem("auth");
			if (storedAuth) {
				setUser(JSON.parse(storedAuth));
			}
		}, []);

	const onSubmit = async (data: FormVals) => {
		try {
			console.log(data);

			const patient: DoctorPatient = {
				id: crypto.randomUUID(),
				name: data.name.trim(),
				phone: data.phone,
				country: data.country,
				gender: data.gender,
				profession: data.profession,
				age: Number(data.age),
				dateOfAdmission:
					typeof data.dateOfAdmission === "string"
						? (
							// handle "YYYY-MM-DD" from <input type="date"> OR "DD/MM/YYYY"
							/\d{4}-\d{2}-\d{2}/.test(data.dateOfAdmission)
								? new Date(data.dateOfAdmission + "T00:00:00").toISOString()
								: parse(data.dateOfAdmission, "dd/MM/yyyy", new Date()).toISOString()
						)
						: data.dateOfAdmission.toISOString(),
				cases: [{ diagnosis: [] }],
			};
			console.log(patient);

			const updated = await dispatch(addPatient({ patient })).unwrap();

			console.log("Updated doctor:", updated);
			toast.success(`"Patient: ${patient.name} has been added to your list ✅"`);
			setCloseModal(false);
			reset();
		} catch (err: unknown) {
			if (err instanceof Error) alert(err?.message ?? "Failed to add patient");
			else toast.error("Something Went Wrong ❌");
		}
	

	};
	return (
		<Dialog open={closeModal} onOpenChange={setCloseModal}>
			<DialogTrigger asChild>
				<Button variant="outline" className=" bg-background hover:bg-blue-600 hover:text-white  transition-colors duration-250">
					<PlusIcon className="-ms-1 opacity-60" size={20} aria-hidden="true" />
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
						<DialogTitle className="sm:text-center">Hello Dr. {user?.userDetails?.name}</DialogTitle>
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
								name="dateOfAdmission"
								control={control}
								rules={{ required: "date is required" }}
								render={({ field }) => (
									<DatePickerComp
										value={
											typeof field.value === "string" ? (field.value ? new Date(field.value) : undefined) : field.value
										}
										onChange={field.onChange}
									/>
								)}
							/>
							{errors.dateOfAdmission && (
								<span className="text-destructive">{String(errors.dateOfAdmission.message)}</span>
							)}
						</div>
						<div className="*:not-first:mt-2">
							<Controller
								name="phone"
								control={control}
								rules={{
									required: {
										value: true,
										message: "Phone is required",
									},
									// pattern: {
									// 	value: /^\d{11}$/,
									// 	message: "Telephone must be 11 digits",
									// },
								}}
								render={({ field }) => (
									<PhoneInputOrigin
										name="phone"
										value={field.value || ""}
										onChange={field.onChange}
										placeholder="Enter your phone number"
										className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
									/>
								)}
							/>
							{errors.phone && <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>}
						</div>

						<div className="*:not-first:mt-2">
							<Controller
								name="country"
								control={control}
								rules={{
									required: {
										value: true,
										message: "Country is required",
									},
								}}
								render={({ field }) => <CountryInput name="country" value={field.value} onChange={field.onChange} />}
							/>

							{/* <Input
								placeholder="Country"
								id={`${id}-country`}
								{...register("country", {
									required: {
										value: true,
										message: "Country is required",
									},
								})}
								type="text"
							/> */}
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
						<div className="*:not-first:mt-2">
							<Input
								placeholder="age"
								id={`${id}-age`}
								{...register("age", {
									required: {
										value: true,
										message: "age is required",
									},
								})}
								type="number"
							/>
							{errors.age && <span className="text-destructive">{String(errors.age.message)}</span>}
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
