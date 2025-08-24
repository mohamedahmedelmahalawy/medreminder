"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";

import { Loader2, FileX, Trash2, PlusCircle } from "lucide-react";
import { DNA } from "react-loader-spinner";

export default function PatientPage() {
	const params = useParams<{ patient: string }>();
	const [diagnoses, setDiagnoses] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [formOpen, setFormOpen] = useState(false);
	const [newDiag, setNewDiag] = useState({
		diagnosis: "",
		complaint: "",
		prognosis: "",
		"medical-report": "",
		"medical-treatment": "",
		schedule: "",
	});

	const patient_phone = params?.patient
		? decodeURIComponent(params.patient)
		: undefined;

	let doctor_code: string | undefined = undefined;
	if (typeof window !== "undefined") {
		const urlDoctor = new URLSearchParams(window.location.search).get("doctor");
		if (urlDoctor) {
			doctor_code = urlDoctor;
		} else {
			const authData = localStorage.getItem("auth");
			if (authData) {
				try {
					const parsed = JSON.parse(authData);
					doctor_code = parsed.code;
				} catch (err) {
					console.error("❌ Error parsing auth from localStorage", err);
				}
			}
		}
	}

	//  Fetch diagnoses
	const fetchData = async () => {
		if (!doctor_code || !patient_phone) return;
		try {
			const url = `https://fast-api-dnk5.vercel.app/doctors/${doctor_code}/patients/${patient_phone}/diagnosis`;
			const res = await fetch(url);
			const data = await res.json();
			setDiagnoses(data);
		} catch (err) {
			console.error("❌ Error fetching diagnoses:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [doctor_code, patient_phone]);

	//  Add diagnosis
	const handleAdd = async (e: any) => {
		e.preventDefault();
		try {
			const url = `https://fast-api-dnk5.vercel.app/doctors/${doctor_code}/patients/${patient_phone}/diagnosis`;
			await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newDiag),
			});
			setNewDiag({
				diagnosis: "",
				complaint: "",
				prognosis: "",
				"medical-report": "",
				"medical-treatment": "",
				schedule: "",
			});
			setFormOpen(false);
			fetchData();
		} catch (err) {
			console.error("❌ Error adding diagnosis:", err);
		}
	};

	// Delete diagnosis
	const handleDelete = async (diag: any) => {
		try {
			const url = `https://fast-api-dnk5.vercel.app/doctors/${doctor_code}/patients/${patient_phone}/diagnosis`;
			await fetch(url, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					diagnosis: diag.diagnosis,
					complaint: diag.complaint,
				}),
			});
			fetchData();
		} catch (err) {
			console.error("❌ Error deleting diagnosis:", err);
		}
	};

	if (loading)
		return (
			<div className='flex items-center justify-center h-screen'>
				<DNA
					visible={true}
					height='200'
					width='200'
					ariaLabel='dna-loading'
					wrapperStyle={{}}
					wrapperClass='dna-wrapper'
				/>
			</div>
		);

	if (!diagnoses || diagnoses.detail)
		return (
			<div className='flex flex-col justify-center items-center min-h-screen bg-blue-900 text-white p-6'>
				<FileX className='w-14 h-14 mb-4 text-blue-300' />
				<p className='text-lg font-semibold'>No patient data found</p>
			</div>
		);

	//  Normalize diagnosis formats
	let diagnosisList: any[] = [];
	if (Array.isArray(diagnoses.diagnoses)) {
		diagnosisList = diagnoses.diagnoses;
	} else if (Array.isArray(diagnoses.cases)) {
		diagnosisList = diagnoses.cases.flatMap((c: any) => c.diagnosis || []);
	} else if (diagnoses.diagnosis) {
		diagnosisList = [diagnoses.diagnosis];
	}

	return (
		<div className='min-h-screen bg-gray-100 p-8'>
			<h1 className='text-4xl font-bold text-blue-900 mb-8 text-center'>
				Patient: {diagnoses.patient_name || "Unknown"}
			</h1>

			{/*  Add Button */}
			<div className='flex justify-center mb-6 gap-3'>
				<button
					onClick={() => setFormOpen(!formOpen)}
					className='flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-950  transition-colors duration-250'
				>
					<PlusCircle size={20} /> {formOpen ? "Cancel" : "Add Diagnosis"}
				</button>

				<button
					className='flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-red-400 hover:text-white  transition-colors duration-250'
					onClick={() => redirect("/dashboard")}
				>
					Go To Dashboard &rarr;
				</button>
				<button
					className='flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-red-400 hover:text-white  transition-colors duration-250'
					onClick={() => redirect("/profile")}
				>
					Go To Profile &rarr;
				</button>
			</div>

			{/*  Add Form */}
			{formOpen && (
				<form
					onSubmit={handleAdd}
					className='max-w-3xl mx-auto bg-white shadow rounded-xl p-6 mb-8 space-y-4 border border-blue-200'
				>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{Object.keys(newDiag).map((key) => (
							<div key={key} className='flex flex-col'>
								<label className='text-sm font-medium text-blue-900 mb-1'>
									{key.replace("medical-", "").replace("-", " ")}
								</label>
								<input
									type={key === "schedule" ? "datetime-local" : "text"}
									value={(newDiag as any)[key]}
									onChange={(e) => setNewDiag({ ...newDiag, [key]: e.target.value })}
									className='border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none'
									required={key !== "prognosis"}
								/>
							</div>
						))}
					</div>
					<button
						type='submit'
						className='w-full bg-blue-900 text-white py-2 rounded-lg shadow hover:bg-blue-950 transition'
					>
						Save Diagnosis
					</button>
				</form>
			)}

			{/*  Diagnoses List */}
			<div className='grid gap-6 max-w-4xl mx-auto'>
				{diagnosisList.length > 0 ? (
					diagnosisList.map((diag: any, i: number) => (
						<div
							key={i}
							className='relative bg-white border border-blue-300 text-gray-800 shadow rounded-xl p-6 space-y-3'
						>
							<h2 className='text-2xl font-semibold text-blue-900'>
								{diag.diagnosis || "N/A"}
							</h2>
							<p>
								<strong>Complaint:</strong> {diag.complaint || "N/A"}
							</p>
							<p>
								<strong>Prognosis:</strong> {diag.prognosis || "N/A"}
							</p>
							<p>
								<strong>Report:</strong>{" "}
								{diag["medical-report"] || diag.report || "N/A"}
							</p>
							<p>
								<strong>Treatment:</strong>{" "}
								{diag["medical-treatment"] || diag.treatment || "N/A"}
							</p>
							<p>
								<strong>Schedule:</strong>{" "}
								{diag.schedule ? new Date(diag.schedule).toLocaleString() : "N/A"}
							</p>

							{/* Delete button */}
							<button
								onClick={() => handleDelete(diag)}
								className='absolute top-4 right-4 text-red-500 hover:text-red-700 transition'
							>
								<Trash2 size={22} />
							</button>
						</div>
					))
				) : (
					<div className='flex flex-col items-center justify-center bg-white shadow rounded-xl p-8 border border-blue-200'>
						<FileX className='w-12 h-12 text-blue-700 mb-3' />
						<p className='text-blue-900 font-medium'>No diagnoses found</p>
					</div>
				)}
			</div>
		</div>
	);
}
