"use client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

interface Doctor {
  id: number;
  name: string;
  speciality: string;
  image: string;
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialIcons = [
    {
      icon: Facebook,
      name: "facebook",
      bgColor: "bg-green-500",
      hoverColor: "bg-green-600",
    },
    {
      icon: Twitter,
      name: "twitter",
      bgColor: "bg-blue-900",
      hoverColor: "bg-black",
    },
    {
      icon: Instagram,
      name: "instagram",
      bgColor: "bg-blue-600",
      hoverColor: "bg-blue-700",
    },
    {
      icon: Linkedin,
      name: "linkedin",
      bgColor: "bg-blue-800",
      hoverColor: "bg-blue-900",
    },
  ];

  return (
    <div className="px-3 py-8">
      <div
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Doctor Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e: any) => {
              e.target.src = `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&crop=face&auto=format&q=80`;
            }}
          />

          {/* Social Media Icons Overlay - Bottom Positioned */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex justify-center space-x-3">
              {socialIcons.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <div
                    key={social.name}
                    className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform ${
                      isHovered
                        ? `translate-y-0 opacity-100`
                        : `translate-y-full opacity-0`
                    }`}
                    style={{
                      transitionDelay: isHovered ? `${index * 100}ms` : "0ms",
                      backgroundColor:
                        hoveredIcon === social.name
                          ? social.hoverColor.replace("bg-", "") === "green-600"
                            ? "#16a34a"
                            : social.hoverColor.replace("bg-", "") === "black"
                            ? "#000000"
                            : social.hoverColor.replace("bg-", "") ===
                              "blue-700"
                            ? "#1d4ed8"
                            : "#1e40af"
                          : social.bgColor.replace("bg-", "") === "green-500"
                          ? "#22c55e"
                          : social.bgColor.replace("bg-", "") === "blue-900"
                          ? "#1e3a8a"
                          : social.bgColor.replace("bg-", "") === "blue-600"
                          ? "#2563eb"
                          : "#1e40af",
                    }}
                    onMouseEnter={() => setHoveredIcon(social.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <IconComponent size={16} className="text-white" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="p-6 text-center">
          <h3
            className="text-xl font-bold mb-2 transition-all duration-300 cursor-pointer group-hover:text-blue-600"
            style={{
              color: isHovered ? "#2563eb" : "#111827",
            }}
          >
            {doctor.name.split("").map((char, index) => (
              <span
                key={index}
                style={{
                  color:
                    char === "i" &&
                    doctor.name.includes("Ottinger") &&
                    isHovered
                      ? "#22c55e"
                      : isHovered
                      ? "#2563eb"
                      : "#111827",
                }}
              >
                {char}
              </span>
            ))}
          </h3>
          <p className="text-gray-600 text-base">{doctor.speciality}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
