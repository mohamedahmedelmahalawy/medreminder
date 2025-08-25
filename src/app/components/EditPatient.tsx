"use client";

import { useState, useEffect, useRef } from "react";
import { DoctorPatient } from "@/lib/interfaces/DoctorPatient";
import { updatePatient, getProfile } from "@/app/funcs/ProfileFunc";
import { Edit, X } from "lucide-react";
import { toast } from "react-toastify";

interface EditPatientProps {
  auth: DoctorPatient | null;
  onProfileUpdate?: () => void;
}

export default function EditPatient({
  auth,
  onProfileUpdate,
}: EditPatientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<DoctorPatient | null>(null);
  const [originalData, setOriginalData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && auth) {
      loadProfile();
    }
  }, [isOpen, auth]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const loadProfile = async () => {
    if (!auth) return;

    try {
      const profileData = await getProfile(auth);
      if (profileData) {
        setProfile(profileData);
        console.log(profile);

        const initialData = {
          name: profileData.name || "",
          age: (profileData.age || profileData.Age || "").toString(),
          email: profileData.email || "",
        };
        setOriginalData(initialData);
        setFormData(initialData);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile data");
    }
  };

  // Check if there are any changes
  const hasChanges = () => {
    return (
      formData.name !== originalData.name || formData.age !== originalData.age
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
        newErrors.age = "Age must be between 18 and 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !auth || !profile) {
      return;
    }

    setIsLoading(true);

    try {
      const updateData: Partial<DoctorPatient> = {
        name: formData.name,
        age: parseInt(formData.age),
      };

      console.log("Update data being sent:", updateData);
      console.log("Full profile data being sent:", {
        ...profile,
        ...updateData,
      });

      const updatedProfile = await updatePatient(auth, {
        ...profile,
        ...updateData,
      });

      if (updatedProfile) {
        toast.success("Profile updated successfully!");
        setIsOpen(false);

        // Reset form
        setFormData({
          name: "",
          age: "",
          email: "",
        });
        setErrors({});

        // Trigger parent component rerender to display changes
        if (onProfileUpdate) {
          onProfileUpdate();
        }
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) {
    return (
      <button
        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <Edit className="w-4 h-4" />
        <span>Edit Profile</span>
      </button>
    );
  }

  return (
    <div className=" w-full fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <div className="text-red-500 hover:text-red-700 text-2xl cursor-pointer transition-colors test-bold">
              <X className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age *</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              min="18"
              max="100"
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
              placeholder="Email cannot be changed"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !hasChanges()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
