import { CaseRecord } from "./CaseRecord";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Role } from "./Role";

export interface DoctorPatient {
	id?: string;
	name: string;
	phone: string;
	country?: string;
	gender?: string;
	profession?: string;
	age?: number;
	Age?: number;
	dateOfAdmission?: string;
	cases?: CaseRecord[];
	title?: string;
	specialty?: string;
	email?: string;
	code?: string;
	city?: string;
	bio?: string;
	role?: Role;
	userDetails?: Doctor | Patient | null;
}
