import { AxiosInterceptor } from "@/interceptor/interceptor";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { log } from "console";

// export async function getProfile(): Promise<DoctorPatient> {
// 	const auth = JSON.parse(localStorage.getItem("auth") || "{}");
// 	let code: string = "";
// 	let url: string = "";

// 	if (auth.role === "medical") {
// 		code = auth.code || "";
// 		url = "/doctors/";
// 	} else if (auth.role === "patient") {
// 		code = auth.userDetails?.phone || "";
// 		url = "/patients/";
// 	}
// 	const profile = AxiosInterceptor.get(url + code)
// 		.then((res) => {
// 			return res.data;
// 		})
// 		.catch((error) => console.log(error));
// 	return profile;
// }

export async function getProfile(
	auth: DoctorPatient
): Promise<DoctorPatient | null> {
	try {
		let url = "";

		if (auth.role === "medical") {
			url = `/doctors/${auth.code}`;
		} else if (auth.role === "patient") {
			url = `/patients/phone/${auth.userDetails?.phone}`;
		}
		const res = await AxiosInterceptor.get(url);
		return res.data;
	} catch (error) {
		console.error("Error fetching profile:", error);
		return null;
	}
}

export async function getPatients(
	auth: DoctorPatient
): Promise<DoctorPatient[] | null> {
	try {
		const url = `/doctors/${auth.code}/patients`;
		const res = await AxiosInterceptor.get(url);
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.error("Error fetching patients:", error);
		return null;
	}
}

export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
