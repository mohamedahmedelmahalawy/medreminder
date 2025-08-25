import {
	getPatientDoctors,
	getPatientSchedule,
	formatDate,
} from "@/app/funcs/ProfileFunc";
import jsPDF from "jspdf";

// Helper function to wrap text to fit within a specified width
function wrapText(text: string, maxWidth: number, doc: jsPDF): string[] {
	const words = text.split(" ");
	const lines: string[] = [];
	let currentLine = "";

	for (const word of words) {
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		const testWidth = doc.getTextWidth(testLine);

		if (testWidth > maxWidth && currentLine) {
			lines.push(currentLine);
			currentLine = word;
		} else {
			currentLine = testLine;
		}
	}

	if (currentLine) {
		lines.push(currentLine);
	}

	return lines;
}

export async function downloadPatientReport() {
	try {
		// Get auth data
		const auth = JSON.parse(localStorage.getItem("auth") || "{}");

		if (!auth.userDetails?.phone) {
			console.error("No patient phone found in auth");
			return;
		}

		// Get patient's doctors
		const doctors = await getPatientDoctors(auth.userDetails.phone);

		// Get patient's schedules
		const schedules = (await getPatientSchedule(auth)) || [];

		// Generate PDF
		const doc = new jsPDF();

		// Set colors
		const primaryColor: [number, number, number] = [41, 128, 185]; // Blue
		const secondaryColor: [number, number, number] = [52, 73, 94]; // Dark gray
		const lightGray: [number, number, number] = [236, 240, 241]; // Light gray
		const accentColor: [number, number, number] = [37, 99, 235]; // Blue

		let currentY = 28;

		// Header
		doc.setFillColor(...primaryColor);
		doc.rect(0, 0, 210, 25, "F");

		doc.setTextColor(255, 255, 255);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(20);
		doc.text("Medical Report", 105, 12, { align: "center" });

		doc.setFontSize(14);
		doc.text(`${auth.userDetails?.name || "Patient"}`, 105, 20, {
			align: "center",
		});

		// Reset text color
		doc.setTextColor(0, 0, 0);

		// Patient Information Section
		doc.setFillColor(...lightGray);
		doc.rect(10, currentY, 190, 8, "F");
		doc.setTextColor(...primaryColor);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(12);
		doc.text("Personal Information", 15, currentY + 6);

		currentY += 15;
		doc.setTextColor(...secondaryColor);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.text(`Name: ${auth.userDetails?.name || "N/A"}`, 15, currentY);
		doc.text(`Phone: ${auth.userDetails?.phone || "N/A"}`, 15, currentY + 6);
		doc.text(`Age: ${auth.userDetails?.age || "N/A"} years`, 15, currentY + 12);
		doc.text(`Country: ${auth.userDetails?.country || "N/A"}`, 15, currentY + 18);

		currentY += 30;

		// Doctors Information
		doc.setFillColor(...lightGray);
		doc.rect(10, currentY, 190, 8, "F");
		doc.setTextColor(...primaryColor);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(12);
		doc.text("Medical Team", 15, currentY + 6);

		currentY += 15;

		if (doctors.length === 0) {
			doc.setTextColor(...secondaryColor);
			doc.setFont("helvetica", "normal");
			doc.setFontSize(10);
			doc.text("No doctors assigned", 15, currentY);
			currentY += 10;
		} else {
			doctors.forEach((doctor, index) => {
				// Check if we need a new page
				if (currentY > 250) {
					doc.addPage();
					currentY = 20;
				}

				// Doctor header
				doc.setFillColor(...accentColor);
				doc.rect(15, currentY, 180, 6, "F");
				doc.setTextColor(255, 255, 255);
				doc.setFont("helvetica", "bold");
				doc.setFontSize(11);
				doc.text(`Dr. ${doctor.name}`, 20, currentY + 4);

				currentY += 10;

				// Doctor details
				doc.setTextColor(...secondaryColor);
				doc.setFont("helvetica", "normal");
				doc.setFontSize(9);
				doc.text(`Code: ${doctor.code}`, 20, currentY);
				currentY += 4;

				const specialtyLines = wrapText(
					`Specialty: ${doctor.specialty || "N/A"}`,
					160,
					doc
				);
				specialtyLines.forEach((line) => {
					doc.text(line, 20, currentY);
					currentY += 4;
				});

				const professionLines = wrapText(
					`Profession: ${doctor.profession || "N/A"}`,
					160,
					doc
				);
				professionLines.forEach((line) => {
					doc.text(line, 20, currentY);
					currentY += 4;
				});

				const locationLines = wrapText(
					`Location: ${doctor.city || "N/A"}, ${doctor.country}`,
					160,
					doc
				);
				locationLines.forEach((line) => {
					doc.text(line, 20, currentY);
					currentY += 4;
				});

				const contactLines = wrapText(`Contact: ${doctor.email}`, 160, doc);
				contactLines.forEach((line) => {
					doc.text(line, 20, currentY);
					currentY += 4;
				});

				currentY += 5;

				// Get doctor's schedule data
				const doctorSchedule = schedules.find((s) => s.doctorCode === doctor.code);
				if (doctorSchedule && doctorSchedule.schedules.length > 0) {
					// Diagnosis section
					doc.setFillColor(...lightGray);
					doc.rect(20, currentY, 170, 5, "F");
					doc.setTextColor(...primaryColor);
					doc.setFont("helvetica", "bold");
					doc.setFontSize(9);
					doc.text("Recent Diagnoses & Treatments", 25, currentY + 3);

					currentY += 8;

					doctorSchedule.schedules.forEach((schedule, sIndex) => {
						if (currentY > 250) {
							doc.addPage();
							currentY = 20;
						}

						doc.setTextColor(...secondaryColor);
						doc.setFont("helvetica", "normal");
						doc.setFontSize(8);

						// Schedule date
						doc.setFont("helvetica", "bold");
						doc.text(
							`Date: ${schedule.schedule ? formatDate(schedule.schedule) : "N/A"}`,
							25,
							currentY
						);
						currentY += 4;

						// Diagnosis
						if (schedule.diagnosis) {
							doc.setFont("helvetica", "normal");
							const diagnosisLines = wrapText(
								`Diagnosis: ${schedule.diagnosis}`,
								160,
								doc
							);
							diagnosisLines.forEach((line) => {
								doc.text(line, 25, currentY);
								currentY += 4;
							});
						}

						// Treatment
						if (schedule.medicalTreatment) {
							const treatmentLines = wrapText(
								`Treatment: ${schedule.medicalTreatment}`,
								160,
								doc
							);
							treatmentLines.forEach((line) => {
								doc.text(line, 25, currentY);
								currentY += 4;
							});
						}

						// Prognosis
						if (schedule.prognosis) {
							const prognosisLines = wrapText(
								`Prognosis: ${schedule.prognosis}`,
								160,
								doc
							);
							prognosisLines.forEach((line) => {
								doc.text(line, 25, currentY);
								currentY += 4;
							});
						}

						// Medical Report
						if (schedule["medical-report"]) {
							const reportLines = wrapText(
								`Medical Report: ${schedule["medical-report"]}`,
								160,
								doc
							);
							reportLines.forEach((line) => {
								doc.text(line, 25, currentY);
								currentY += 4;
							});
						}

						currentY += 3;
					});
				} else {
					doc.setTextColor(...secondaryColor);
					doc.setFont("helvetica", "normal");
					doc.setFontSize(9);
					doc.text("No recent medical records", 20, currentY);
					currentY += 8;
				}

				currentY += 10;
			});
		}

		// Footer
		doc.setTextColor(...secondaryColor);
		doc.setFont("helvetica", "italic");
		doc.setFontSize(8);
		const currentDate = new Date().toLocaleDateString();
		doc.text(`Generated on: ${currentDate}`, 15, 280);
		doc.text("MedReminder - Patient Medical Report", 105, 280, {
			align: "center",
		});

		doc.save("patient-medical-report.pdf");
	} catch (error) {
		console.error("Error generating patient report:", error);
	}
}
