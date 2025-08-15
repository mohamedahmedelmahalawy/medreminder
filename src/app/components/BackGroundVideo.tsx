export default function BackGroundVideo() {
  return (
    <div className="absolute inset-0 mt-3.5 -z-10 overflow-hidden opacity-95">
      <video
        className="w-full h-full  object-cover pointer-events-none"
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
      <div className="absolute inset-0 bg-black/30" /> 
    </div>
  );
}