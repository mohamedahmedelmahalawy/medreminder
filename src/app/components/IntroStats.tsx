// app/components/IntroStats.tsx
export default function IntroStats() {
  return (
    <section aria-labelledby="intro-stats" className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-20">
        <div className="grid grid-cols-1 items-start gap-y-10 gap-x-16 lg:grid-cols-2">

          <div>
            <h2
              id="intro-stats"
              className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-gray-900"
            >
              <span className="block">Innovative Solutions</span>
              <span className="block">for Patient Safety</span>
            </h2>
          </div>


          <div>
            <p className="max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
              At MedReminder, we provide cutting-edge technology solutions to
              minimize medical administration errors, ensuring enhanced patient
              safety and optimized medication management for healthcare
              providers and patients alike.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-10">
              <div>
                <div className="text-4xl sm:text-5xl font-semibold text-[#4B4EFC] tabular-nums">
                  100%
                </div>
                <div className="mt-2 text-gray-500">Proven Results</div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-semibold text-[#4B4EFC] tabular-nums">
                  24/7
                </div>
                <div className="mt-2 text-gray-500">Monitored by Professionals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
    </section>
    
  );
}
