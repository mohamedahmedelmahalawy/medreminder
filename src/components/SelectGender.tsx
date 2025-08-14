import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Gender {
	value?: string;
	onChange: (val: string) => void;
}

export default function SelectGender({ value, onChange }: Gender) { 
	const id = useId();

	return (
		<div className="*:not-first:mt-2">
			
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger id={id}>
					<SelectValue placeholder="Select Gender" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="male">Male</SelectItem>
					<SelectItem value="female">Female</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
