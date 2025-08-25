"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";

import { Loader2, FileX, Trash2, PlusCircle } from "lucide-react";
import { DNA } from "react-loader-spinner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PatientPage() {
	const params = useParams<{ patient: string }>();
	const [diagnoses, setDiagnoses] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingDelete, setPendingDelete] = useState<any | null>(null);
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
			const url = `https://fast-api-dnk5.vercel.app/doctors/${doctor_code}/patients/${patient_phone}/diagnosis?diagnosis_name=${encodeURIComponent(
				diag.diagnosis
			)}`;
			await fetch(url, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			fetchData();
      
		} catch (err) {
			console.error("❌ Error deleting diagnosis:", err);
		}
	};

	if (loading)
		return (
			<div className='flex justify-center items-center bg-[#f3f4f6] h-screen'>
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
			<div className='flex flex-col justify-center items-center bg-blue-900 p-6 min-h-screen text-white'>
				<FileX className='mb-4 w-14 h-14 text-blue-300' />
				<p className='font-semibold text-lg'>No patient data found</p>
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
    <div className="bg-gray-100 p-8 min-h-screen pt-24">
      <h2 className="mb-8 font-bold text-blue-900 text-4xl text-center">
        <span className="font-semibold text-green-500 text-3xl">Patient:</span> {diagnoses.patient_name || "Unknown"}
      </h2>


			{/*  Add Button */}
			<div className='flex justify-center gap-3 mb-6'>
				<button
					onClick={() => setFormOpen(!formOpen)}
					className='flex items-center gap-2 bg-blue-600 hover:bg-blue-950 shadow px-5 py-2 rounded-lg text-white transition-colors duration-250'
				>
					<PlusCircle size={20} /> {formOpen ? "Cancel" : "Add Diagnosis"}
				</button>

				<button
					className='flex items-center gap-2 bg-gray-200 hover:bg-red-400 shadow px-5 py-2 rounded-lg text-gray-700 hover:text-white transition-colors duration-250'
					onClick={() => redirect("/dashboard")}
				>
					Go To Dashboard &rarr;
				</button>
				<button
					className='flex items-center gap-2 bg-gray-200 hover:bg-red-400 shadow px-5 py-2 rounded-lg text-gray-700 hover:text-white transition-colors duration-250'
					onClick={() => redirect("/profile")}
				>
					Go To Profile &rarr;
				</button>
			</div>

			{/*  Add Form */}
			{formOpen && (
				<form
					onSubmit={handleAdd}
					className='space-y-4 bg-white shadow mx-auto mb-8 p-6 border border-blue-200 rounded-xl max-w-3xl'
				>
					<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
						{Object.keys(newDiag).map((key) => (
							<div key={key} className='flex flex-col'>
								<label className='mb-1 font-medium text-blue-900 text-sm'>
									{key.replace("medical-", "").replace("-", " ")}
								</label>
								<input
									type={key === "schedule" ? "datetime-local" : "text"}
									value={(newDiag as any)[key]}
									onChange={(e) => setNewDiag({ ...newDiag, [key]: e.target.value })}
									className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
									required={key !== "prognosis"}
								/>
							</div>
						))}
					</div>
					<button
						type='submit'
						className='bg-blue-900 hover:bg-blue-950 shadow py-2 rounded-lg w-full text-white transition'
					>
						Save Diagnosis
					</button>
				</form>
			)}


      {/*  Diagnoses List */}
      <div className="gap-6 grid mx-auto max-w-4xl">
        {diagnosisList.length > 0 ? (
          diagnosisList.map((diag: any, i: number) => (
            <div
              key={i}
              className="relative space-y-3 bg-white shadow p-6 border border-blue-300 rounded-xl text-gray-800"
            >
              <h2 className="font-semibold text-blue-900 text-2xl">
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
                {diag["medical-report"] ?? diag.medical_report ?? diag.medicalReport ?? diag.report ?? "N/A"}
              </p>
              <p>
                <strong>Treatment:</strong>{" "}
                {diag["medical-treatment"] ?? diag.medical_treatment ?? diag.medicalTreatment ?? diag.treatment ?? "N/A"}
              </p>
              <p>
                <strong>Schedule:</strong>{" "}
                {diag.schedule
                  ? new Date(diag.schedule).toLocaleString()
                  : "N/A"}
              </p>

              {/* Delete button */}
              <button
                onClick={() => {
                  setPendingDelete(diag);
                  setConfirmOpen(true);
                }}
                className="top-4 right-4 absolute text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center bg-white shadow p-8 border border-blue-200 rounded-xl">
            <FileX className="mb-3 w-12 h-12 text-blue-700" />
            <p className="font-medium text-blue-900">No diagnoses found</p>
          </div>
        )}
      </div>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this diagnosis?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the diagnosis
              <strong className="mx-1">
                {pendingDelete?.diagnosis ?? "(unknown)"}
              </strong>
              {pendingDelete?.complaint ? (
                <> for complaint "<em>{pendingDelete.complaint}</em>".</>
              ) : (
                "."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setPendingDelete(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (pendingDelete) {
                  await handleDelete(pendingDelete);
                }
                setPendingDelete(null);
                setConfirmOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

}
