import React from "react";
import { ArrowRight, Mail, Check } from "lucide-react";

const MedicalNetwork: React.FC = () => {
  return (
    <div className="bg-gray-50 py-20 sm:py-28 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-xl">
          <div className="flex items-center text-xl mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-green-500 font-medium text-xl md:text-base tracking-wider">
              WHY CHOOSE MED-REMINDER
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full ml-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-blue-900 mb-6 leading-tight">
                Professional Medical Network
                <br />
                With Large Directory Listings
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                With a focus on compassionate and personalized treatment we
                strive to create a welcoming environment where patients feel
                valued respected and well informed about their health
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-medium text-lg">
                  Quality Control System
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-medium text-lg">
                  Highly Professional Staff
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-medium text-lg">
                  Medical And Surgical Services
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-medium text-lg">
                  Outpatient Services
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8">
              {/* Read More Button */}
              <button className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <span className="relative z-10">Read More</span>
                <div className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              {/* Support Email Button */}
              <button className="group relative overflow-hidden bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3">
                <div className="relative  w-10 h-10 bg-blue-500 group-hover:bg-[#000D44] rounded-full flex items-center justify-center transition-colors duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="relative  text-left">
                  <div className="text-sm text-gray-500">Support Email</div>
                  <div className="font-medium text-blue-500 group-hover:text-[#000D44] transition-colors duration-300">
                    support@medreminder.com
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative w-full">
            {/* Main large image */}
            <div className="relative z-10 bg-white rounded-2xl p-2 shadow-lg">
              <img
                src="/wh-img-5.jpg"
                alt="Medical professionals"
                className="w-full h-[260px] sm:h-[340px] lg:h-[420px] xl:h-[580px] object-cover rounded-xl"
              />
            </div>

            {/* Smaller overlay image */}
            <div className="hidden sm:block absolute bottom-0 left-2 sm:-left-6 md:-left-8 z-15 bg-white rounded-2xl p-2 shadow-lg">
              <img
                src="/wh-img-3.jpg"
                alt="Healthcare service"
                className="w-40 md:w-56 lg:w-72 h-auto object-cover rounded-lg"
              />
            </div>

            {/* Decorative elements */}
            <div className="hidden md:block absolute top-8 -right-4 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
            <div className="hidden md:block absolute -top-4 left-12 w-8 h-8 bg-green-200 rounded-full opacity-60"></div>
            <div className="hidden md:block absolute bottom-16 -right-8 w-12 h-12 bg-yellow-100 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalNetwork;
