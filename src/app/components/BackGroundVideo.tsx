"use client";
import { useEffect, useState } from "react";

export default function BackGroundVideo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="-z-10 absolute inset-0 opacity-95 overflow-hidden">
      {isClient && (
        <video
          className="w-full h-full object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/med.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
