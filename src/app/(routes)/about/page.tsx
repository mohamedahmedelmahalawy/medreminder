"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Shield } from "lucide-react";

interface FormData {
  firstName: string;
  email: string;
  message: string;
}
export default function about() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({ firstName: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-gray-100 border-b">
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-gray-900 text-4xl">
              Contact MedReminder Team
            </h1>
            <p className="mx-auto max-w-3xl text-gray-600 text-lg leading-relaxed">
              Get in touch for inquiries about our technology solutions to
              enhance Medical Staff schedules & patient Medication Management
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-12 max-w-7xl">
        <div className="gap-12 grid lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 font-semibold text-gray-900 text-2xl">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-white shadow-sm hover:shadow-md p-4 border border-gray-100 rounded-lg transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Connect</p>
                    <a
                      href="tel:+201278474336"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      +201278474336
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white shadow-sm hover:shadow-md p-4 border border-gray-100 rounded-lg transition-shadow">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Support</p>
                    <a
                      href="mailto:support@medreminder.com"
                      className="text-green-600 hover:text-green-700"
                    >
                      support@medreminder.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white shadow-sm hover:shadow-md p-4 border border-gray-100 rounded-lg transition-shadow">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-purple-600">Alexandria, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-900 text-lg">
                Why Choose MedReminder?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">
                    Efficient Medical Staff Scheduling
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Secure Patient Medication Management
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">24/7 Technical Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg p-8 border border-gray-100 rounded-xl">
            <h2 className="mb-6 font-semibold text-gray-900 text-2xl">
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="bg-green-50 mb-6 p-4 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 mb-6 p-4 border border-red-200 rounded-lg">
                <p className="text-red-800">
                  Sorry, there was an error sending your message. Please try
                  again.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 font-medium text-gray-700 text-sm"
                >
                  Your First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full transition-colors"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-gray-700 text-sm"
                >
                  Your Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-medium text-gray-700 text-sm"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full transition-colors resize-vertical"
                  placeholder="Tell us about your inquiry or requirements..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-6 py-3 rounded-lg w-full font-medium text-white transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Your Inquiry</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 text-gray-500 text-sm text-center">
              We typically respond within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
