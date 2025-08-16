import Image from "next/image";

const FEATURES = [
    {
        img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=224,fit=crop/A85wWwx8xRiM9XZP/pexels-shkrabaanthony-5214954-YbNvQ8ENywcMaBXq.jpg",
        title: "Dosage Accuracy",
        text:
            "Ensure precise dosage delivery with our advanced verification systems to minimize administration errors.",
        alt: "Hands holding assorted medication pills",
    },
    {
        img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=224,fit=crop/A85wWwx8xRiM9XZP/pexels-n-voitkevich-8830716-m5KwqoN0ypUZgKqx.jpg",
        title: "Medication Reminders",
        text:
            "Receive timely reminders for medical administration to ensure adherence and improve patient outcomes.",
        alt: "Vaccine vial placed on a calendar date",
    },
];

export default function MedicationManagement() {
    return (
        <section className="bg-sky-50 py-18">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:py-20">
          
                <div className="text-center">
                    <h3 className="text-3xl sm:text-5xl lg:text-[34px] font-extrabold tracking-tight text-gray-900 animate-pulse">
                        What's Different About Our App?
                    </h3>
                    <p className="mx-auto mt-5 max-w-3xl text-[17px] sm:text-[18px] leading-7 sm:leading-8 text-gray-600">
                        Through our innovative approach, we ensure medical crew schedule is organised and maintained to
                        Enhance patient safety for medical
                        administration and medication management.
                    </p>
                </div>

      
                <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="relative pb-20">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-black/5">
                                <Image
                                    src={f.img}
                                    alt={f.alt}
                                    fill
                                    sizes="(min-width: 1024px) 600px, 100vw"
                                    className="object-cover"
                                    priority={false}
                                />
                            </div>

                            <div className="absolute left-1/2 bottom-0 w-[88%] -translate-x-1/2 translate-y-6">
                                <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl ring-1 ring-black/5 text-center">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
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