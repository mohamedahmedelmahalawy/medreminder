const FEATURES = [
  {
    title: "Administration Roles",
    text: "For all Medical profession to organize their work.",
  },
  {
    title: "Patient Notifications",
    text: "Stay informed about medication dates & next visit.",
  },
  {
    title: "Interaction Alerts",
    text: "Where Medical Teams and Patients Stay in Sync.",
  },
];

export default function FeatureStrip() {
  return (
    <div className="flex items-center">
      <div className="mx-auto px-4 py-4 max-w-screen-2xl">
        <div className="justify-items-center gap-8 grid grid-cols-1 md:grid-cols-3 text-white">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex justify-center items-center bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,.15)] backdrop-blur-sm px-8 py-10 w-full min-h-[180px] text-center"
            >
              <div>
                <h3 className="font-semibold md:text-[28px] text-xl">
                  {f.title}
                </h3>
                <p className="text-shadow-2x mt-3 text-[16px] text-white/90 md:text-[18px] lg:text-[20px] leading-relaxed">
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
