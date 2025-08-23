"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordCheckOriginProps {
	register: ReturnType<any>; // from RHF's register("confirmPassword", {...})
	passwordValue: string; // watch("password")
	confirmPasswordValue: string; // watch("confirmPassword")
	error?: string;
}

export default function PasswordCheckOrigin({
	register,
	passwordValue,
	confirmPasswordValue,
	error,
}: PasswordCheckOriginProps) {
	const id = useId();
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible((prev) => !prev);

	const isMismatch =
		confirmPasswordValue &&
		passwordValue &&
		confirmPasswordValue !== passwordValue;

	return (
		<div className='*:not-first:mt-2'>
			<Label htmlFor={id}>Confirm Password</Label>
			<div className='relative'>
				<Input
					id={id}
					className={`pe-9 ${isMismatch ? "border-red-500" : ""}`}
					placeholder='Confirm Password'
					type={isVisible ? "text" : "password"}
					{...register}
				/>
				<button
					type='button'
					onClick={toggleVisibility}
					className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
					aria-label={isVisible ? "Hide password" : "Show password"}
				>
					{isVisible ? (
						<EyeOffIcon size={16} aria-hidden='true' />
					) : (
						<EyeIcon size={16} aria-hidden='true' />
					)}
				</button>
			</div>

			{error && <p className='text-red-500 text-sm'>{error}</p>}
			{!error && isMismatch && (
				<p className='text-red-500 text-sm'>Passwords do not match</p>
			)}
		</div>
	);
}