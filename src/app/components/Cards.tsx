const FEATURES = [
  {
    title: "Administration Roles",
    text: "For all Medical profession to oragnize their work.",
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
    <section className="relative">
      <div className="relative mx-auto max-w-screen-2xl px-4 py-12">
        <div
          className="grid grid-cols-1 md:grid-cols-3 text-white
                      gap-4 "
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="min-h-[180px] flex items-center justify-center text-center
                         px-8 py-10 bg-white/10 backdrop-blur-sm
                         shadow-[inset_0_0_0_1px_rgba(255,255,255,.15)] ]"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-[17px] text-shadow-2x md:text[12px] text-white/90 leading-relaxed">
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}