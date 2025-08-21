'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

interface Diagnosis {
  id?: string;
  diagnosis: string;
  prognosis: string;
  ['medical-report']: string;
  ['medical-treatment']: string;
  schedule: string;
  complaint: string;
}

export function buildDiagnosisUrl(doctor_code: string, patient_phone: string) {
  return `https://fast-api-dnk5.vercel.app/doctors/${encodeURIComponent(
    doctor_code
  )}/patients/${encodeURIComponent(patient_phone)}/diagnosis`;
}

export default function PatientDiagnosisPage() {
  const routeParams = useParams();
  const doctor_code = Array.isArray(routeParams?.doctor_code)
    ? routeParams?.doctor_code[0]
    : (routeParams?.doctor_code as string | undefined);
  const patient_phone = Array.isArray(routeParams?.patient_phone)
    ? routeParams?.patient_phone[0]
    : (routeParams?.patient_phone as string | undefined);

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [patientName, setPatientName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newDiagnosis, setNewDiagnosis] = useState({
    diagnosis: '',
    prognosis: '',
    complaint: '',
    ['medical-report']: '',
    ['medical-treatment']: '',
    schedule: '',
  });

  const canQuery = useMemo(() => Boolean(doctor_code && patient_phone), [
    doctor_code,
    patient_phone,
  ]);

  const listUrl = useMemo(() => {
    if (!canQuery) return '';
    return buildDiagnosisUrl(doctor_code!, patient_phone!);
  }, [canQuery, doctor_code, patient_phone]);

  const fetchDiagnoses = useCallback(async () => {
    if (!canQuery) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(listUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch diagnoses: ${res.status}`);
      const data = await res.json();
      setDiagnoses(Array.isArray(data.diagnoses) ? data.diagnoses : []);
      setPatientName(data.patient_name || '');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load diagnoses');
    } finally {
      setLoading(false);
    }
  }, [canQuery, listUrl]);

  const addDiagnosis = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(listUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDiagnosis),
      });
      if (!res.ok) throw new Error('Failed to add diagnosis');
      setNewDiagnosis({
        diagnosis: '',
        prognosis: '',
        complaint: '',
        ['medical-report']: '',
        ['medical-treatment']: '',
        schedule: '',
      });
      await fetchDiagnoses();
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add diagnosis');
    } finally {
      setLoading(false);
    }
  };

  const deleteDiagnosis = async (id: string | undefined) => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(listUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete diagnosis');
      await fetchDiagnoses();
    } catch (err: any) {
      setError(err?.message ?? 'Failed to delete diagnosis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnoses();
  }, [fetchDiagnoses]);

  if (!canQuery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="shadow-xl border border-blue-200 rounded-2xl overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h2 className="text-xl font-bold">Patient Diagnoses</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-blue-800">Missing or invalid route params.</p>
              <code className="block bg-blue-100 text-blue-900 p-3 rounded-lg">
                app/doctors/[doctor_code]/patients/[patient_phone]/diagnosis/page.tsx
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="shadow-xl border border-blue-200 rounded-2xl overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h2 className="text-xl font-bold">Patient Diagnoses</h2>
            {patientName && <p className="text-sm text-blue-100">Patient: {patientName}</p>}
          </div>

          <div className="p-6 space-y-6">
            {error && (
              <div className="rounded-lg border border-blue-300 bg-blue-50 p-3 text-blue-900">
                {error}
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-3 text-blue-800">
                <span className="inline-block h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                Loading diagnoses...
              </div>
            )}

            <div className="space-y-3">
              {!loading && diagnoses.length === 0 ? (
                <p className="text-blue-700 text-center">No diagnoses found.</p>
              ) : (
                diagnoses.map((diag, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm space-y-2"
                  >
                    <h3 className="text-lg font-bold text-blue-900">{diag.diagnosis}</h3>
                    <p className="text-sm text-blue-700"><span className="font-semibold">Complaint:</span> {diag.complaint}</p>
                    <p className="text-sm text-blue-700"><span className="font-semibold">Prognosis:</span> {diag.prognosis}</p>
                    <p className="text-sm text-blue-700"><span className="font-semibold">Report:</span> {diag['medical-report']}</p>
                    <p className="text-sm text-blue-700"><span className="font-semibold">Treatment:</span> {diag['medical-treatment']}</p>
                    <p className="text-xs text-blue-600"><span className="font-semibold">Scheduled:</span> {new Date(diag.schedule).toLocaleString()}</p>
                    <button
                      onClick={() => deleteDiagnosis(diag.id)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-blue-200 pt-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Add New Diagnosis</h3>
              <div className="grid gap-2">
                <input
                  type="text"
                  placeholder="Diagnosis"
                  value={newDiagnosis.diagnosis}
                  onChange={(e) => setNewDiagnosis({ ...newDiagnosis, diagnosis: e.target.value })}
                  className="p-2 border border-blue-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Prognosis"
                  value={newDiagnosis.prognosis}
                  onChange={(e) => setNewDiagnosis({ ...newDiagnosis, prognosis: e.target.value })}
                  className="p-2 border border-blue-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Complaint"
                  value={newDiagnosis.complaint}
                  onChange={(e) => setNewDiagnosis({ ...newDiagnosis, complaint: e.target.value })}
                  className="p-2 border border-blue-300 rounded-lg"
                />
                <textarea
                  placeholder="Medical Report"
                  value={newDiagnosis['medical-report']}
                  onChange={(e) => setNewDiagnosis({ ...newDiagnosis, ['medical-report']: e.target.value })}
                  className="p-2 border border-blue-300 rounded-lg"
                />
                <textarea
                  placeholder="Medical Treatment"
                  value={newDiagnosis['medical-treatment']}
                  onChange={(e) => setNewDiagnosis({ ...newDiagnosis, ['medical-treatment']: e.target.value })}
                  className="p-2 border border-blue-300 rounded-lg"
                />
                <input
                  type="datetime-local"
                  value={newDiagnosis.schedule}
                  onChange={(e) => setNewDiagnosis({ ...newDiagnosis, schedule: e.target.value })}
                  className="p-2 border border-blue-300 rounded-lg"
                />
                <button
                  onClick={addDiagnosis}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Diagnosis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
