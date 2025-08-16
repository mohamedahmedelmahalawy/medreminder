import { useId } from "react";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";

interface Option {
	value: string;
	label: string;
}

interface SelectInputProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	options: Option[];
}

export default function SelectInput({
	label = "Select Option",
	options,
	...rest 
}: SelectInputProps) {
	const id = useId();

	return (
		<div className='*:not-first:mt-2'>
			<Label htmlFor={id}>{label}</Label>
			<SelectNative id={id} {...rest}>
				<option value=''>Select {label}</option>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</SelectNative>
		</div>
	);
}