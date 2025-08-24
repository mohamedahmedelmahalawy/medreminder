import React from "react";
import { ArrowRight, Mail, Check } from "lucide-react";
import Image from "next/image";

const MedicalNetwork: React.FC = () => {
  return (
    <div className="bg-gray-50 py-18 sm:py-18 lg:py-18">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        {/* Header */}
        <div className="mb-6 text-xl">
          <div className="flex items-center mb-2 text-xl">
            <div className="bg-green-400 mr-2 rounded-full w-2 h-2"></div>
            <span className="font-semibold text-green-500 md:text-base text-xl tracking-wider">
              WHY CHOOSE MED-REMINDER
            </span>
            <div className="bg-green-400 ml-2 rounded-full w-2 h-2"></div>
          </div>
        </div>

        <div className="items-center gap-10 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 font-bold text-blue-900 text-2xl sm:text-3xl md:text-4xl lg:text-4xl leading-tight">
                Professional Medical Network
                <br />
                With Large Directory Listings
              </h3>
              <p className="mb-8 text-gray-600 text-base md:text-lg leading-relaxed">
                With a focus on compassionate and personalized treatment we
                strive to create a welcoming environment where patients feel
                valued respected and well informed about their health
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-500 rounded-full w-8 h-8">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800 text-lg">
                  Quality Control System
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-500 rounded-full w-8 h-8">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800 text-lg">
                  Highly Professional Staff
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-500 rounded-full w-8 h-8">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800 text-lg">
                  Medical And Surgical Services
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-500 rounded-full w-8 h-8">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800 text-lg">
                  Outpatient Services
                </span>
              </div>
            </div>

            {/* Action Buttons */}

            <div className="flex sm:flex-row flex-col gap-4 pt-6 sm:pt-8">
              {/* Read More Button */}

              <button className="group relative flex justify-center items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-4 rounded-lg overflow-hidden font-medium text-white transition-all duration-300 cursor-pointer">
                <a href="#FAQ" className="flex items-center gap-2">
                  <span className="z-10 relative">Read More</span>
                  <div className="z-10 relative transition-transform group-hover:translate-x-1 duration-600 transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#000D44] to-blue-500 transition-transform translate-x-full group-hover:translate-x-0 duration-600 ease-in-out transform"></div>
                </a>
              </button>

              {/* Support Email Button */}
              <button className="group relative flex justify-center items-center space-x-3 bg-white hover:bg-gray-50 px-4 py-3 border border-gray-200 rounded-lg overflow-hidden font-medium text-gray-700 transition-all duration-300">
                <div className="relative flex justify-center items-center bg-blue-500 group-hover:bg-[#000D44] rounded-full w-10 h-10 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="relative text-left">
                  <div className="text-gray-500 text-sm">Support Email</div>
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
            <div className="z-10 relative bg-white shadow-lg p-2 rounded-2xl h-[260px] sm:h-[340px] lg:h-[420px] xl:h-[580px]">
              <Image
                src="/wh-img-5.jpg"
                alt="Medical professionals"
                className="rounded-xl object-cover"
                fill
                sizes="100vw"
              />
            </div>

            {/* Smaller overlay image */}
            <div className="hidden lg:block bottom-0 left-2 sm:-left-6 md:-left-8 z-15 absolute bg-white shadow-lg p-2 rounded-2xl">
              <Image
                src="/wh-img-3.jpg"
                alt="Healthcare service"
                className="rounded-lg w-40 md:w-56 lg:w-72 h-auto object-cover"
                width={288}
                height={180}
                priority
              />
            </div>

            {/* Decorative elements */}
            <div className="hidden md:block top-8 -right-4 absolute bg-blue-200 opacity-50 rounded-full w-16 h-16"></div>
            <div className="hidden md:block -top-4 left-12 absolute bg-green-300 opacity-60 rounded-full w-8 h-8"></div>
            <div className="hidden md:block -right-8 bottom-16 absolute bg-yellow-200 opacity-40 rounded-full w-12 h-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalNetwork;
