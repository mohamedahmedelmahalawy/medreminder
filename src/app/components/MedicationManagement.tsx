import Image from "next/image";

const upscaleZyro = (url: string, w = 1200, h = 750) =>
  url.replace(/w=\d+/, `w=${w}`).replace(/h=\d+/, `h=${h}`);

const FEATURES = [
  {
    img: upscaleZyro(
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=224,fit=crop/A85wWwx8xRiM9XZP/pexels-shkrabaanthony-5214954-YbNvQ8ENywcMaBXq.jpg"
    ),
    title: "Dosage Accuracy",
    text: "Ensure precise dosage delivery with our advanced verification systems to minimize administration errors.",
    alt: "Hands holding assorted medication pills",
  },
  {
    img: upscaleZyro(
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=224,fit=crop/A85wWwx8xRiM9XZP/pexels-n-voitkevich-8830716-m5KwqoN0ypUZgKqx.jpg"
    ),
    title: "Medication Reminders",
    text: "Receive timely reminders for medical administration to ensure adherence and improve patient outcomes.",
    alt: "Vaccine vial placed on a calendar date",
  },
];

export default function MedicationManagement() {
  return (
    <section className="bg-sky-50 py-18">
      <div className="mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col gap-5 text-center">
          <div className="flex justify-center items-center mb-2 text-xl">
            <div className="bg-green-400 mr-2 rounded-full w-2 h-2"></div>
            <span className="font-semibold text-green-500 md:text-base text-xl tracking-wider">
              WHY CHOOSE MED-REMINDER
            </span>
            <div className="bg-green-400 ml-2 rounded-full w-2 h-2"></div>
          </div>
          <h2 className="font-extrabold text-blue-900 text-5xl sm:text-5xl tracking-tight animate-pulse">
            What&apos;s Different About Our App?
          </h2>
          <p className="mx-auto md:px-0 w-full md:max-w-xl max-w-3xl text-gray-600 text-base leading-6">
            Through our innovative approach, we ensure medical crew schedule is
            organised and maintained to Enhance patient safety for medical
            administration and medication management.
          </p>
        </div>

        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 mt-12">
          {FEATURES.map((f) => (
            <div key={f.title} className="relative pb-20">
              <div className="relative rounded-3xl ring-1 ring-black/5 aspect-[16/10] overflow-hidden">
                <Image
                  src={f.img}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="bottom-0 left-1/2 absolute w-[88%] -translate-x-1/2 translate-y-6">
                <div className="bg-white shadow-xl p-6 sm:p-8 rounded-2xl ring-1 ring-black/5 text-center">
                  <h3 className="font-semibold text-gray-900 text-xl sm:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
