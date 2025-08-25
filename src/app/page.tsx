import Image from "next/image";
import BackGroundVideo from "./components/BackGroundVideo";
import Cards from "./components/Cards";
import IntroStats from "./components/IntroStats";
import MedicationManagement from "./components/MedicationManagement";
import AskedQuestions from "@/components/AskedQuestions";
import FeaturesSection from "./components/FeaturesSection";
import MedicalSlider from "./components/MedicalSlider";
import SpecialistsSlider from "./components/SpecialistsSlider";
import MedicalNetwork from "./components/MedicalNetwork";

export default function Home() {
  return (
    <>
      <main>
        <section className="relative flex flex-col [@media(min-width:1280px)]:justify-center [@media(min-width:2440px)]:justify-start [@media(min-width:920px)]:justify-center mx-auto px-8 py-18 [@media(min-width:1280px)]:py-0 [@media(min-width:2440px)]:py-9 md:py-24 min-h-screen overflow-hidden text-white">
          <BackGroundVideo />
          <div className="flex flex-col items-center gap-4 mb-4 text-center">
            <h1
              style={{ ["--n" as string]: "32ch" }}
              className="inline-block overflow-hidden font-mono font-semibold text-[48px] md:text-[84px] align-baseline leading-tight whitespace-nowrap animate-[type-hold_23s_steps(32,end)_infinite] /* 23s total = ~3s typing + 20s hold; no caret/border */"
            >
              Connecting Medical <br /> Staff and Patients
            </h1>

            <p className="inline-block mb-6 w-2/3 text-2xl animate-enter-pulse-3_5s md:1/3">
              One Powerful App for Every Step of Care
            </p>
            <a href="#features">
              <button className="inline-block bg-transparent mt-8 mb-10 px-14 py-4 border-2 border-white hover:border-blue-600 rounded-full font-semibold text-white animate-enter-pulse-3_5s">
                Learn More
              </button>
            </a>
          </div>
          <div>
            <Cards />
          </div>
        </section>

        <IntroStats />
        <MedicalNetwork />
        <SpecialistsSlider />
        <section className="mx-auto px-4 py-18 max-w-screen-xl">
          <div className="relative rounded-3xl aspect-[21/9] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1666887360680-9dc27a1d2753?auto=format&fit=crop&w=2000&q=80"
              alt="a doctor checking a patient's blood pressure"
              fill
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        </section>
        <MedicationManagement />
        <MedicalSlider />
        <FeaturesSection />
        <section className="mx-auto py-18 pt-26 max-w-[1280px]" id="faq">
          <AskedQuestions />
        </section>
      </main>
    </>
  );
}
