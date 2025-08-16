import React, { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EmailInputOriginProps = React.ComponentPropsWithoutRef<"input"> & {
	label?: string;
};

const EmailInputOrigin = React.forwardRef<
	HTMLInputElement,
	EmailInputOriginProps
>(({ label = "Email", id, ...props }, ref) => {
	const generatedId = useId();
	const inputId = id || generatedId;

	return (
		<div className='*:not-first:mt-2'>
			{/* <Label htmlFor={inputId}>
				{label && <span className='text-destructive'>{label}</span>}
			</Label> */}
			<Input
				ref={ref}
				id={inputId}
				type='email'
				placeholder='Enter your email'
				{...props}
			/>
		</div>
	);
});

EmailInputOrigin.displayName = "EmailInputOrigin";

export default EmailInputOrigin;