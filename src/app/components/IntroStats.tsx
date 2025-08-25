// app/components/IntroStats.tsx
export default function IntroStats() {
  return (
    <section aria-labelledby="intro-stats" className="bg-white py-4">
      <div className="mx-auto px-4 py-18 max-w-screen-xl">
        <div className="mb-6 text-xl">
          <div className="flex justify-center lg:justify-start items-center mb-2 text-xl">
            <div className="bg-green-400 mr-2 rounded-full w-2 h-2" />
            <span className="font-semibold text-green-500 md:text-base text-xl tracking-wider">
              WHAT&apos;S OUR SOLUTION?
            </span>
            <div className="bg-green-400 ml-2 rounded-full w-2 h-2" />
          </div>
        </div>

        <div className="items-start gap-x-16 gap-y-10 grid grid-cols-1 lg:grid-cols-2">
          <div>
            <h2
              id="intro-stats"
              className="font-bold text-blue-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-left text-center tracking-tight"
            >
              <span className="block">Innovative Solutions</span>
              <span className="block">For Patient Safety</span>
            </h2>
          </div>

          <div>
            <p className="mx-auto px-2 md:px-0 w-full max-w-md md:max-w-xl text-[#000D44] text-base leading-7 sm:leading-8">
              At MedReminder, we provide cutting-edge technology solutions to
              minimize medical administration errors, ensuring enhanced patient
              safety and optimized medication management for healthcare
              providers and patients alike.
            </p>

            <div className="gap-6 sm:gap-10 grid grid-cols-1 sm:grid-cols-2 mx-auto mt-10 w-full md:max-w-none max-w-md">
              <div className="lg:text-left text-center">
                <div className="font-semibold tabular-nums text-[#0021b4] text-4xl sm:text-5xl">
                  100%
                </div>
                <div className="mt-2 text-[#000D44]">Proven Results</div>
              </div>

              <div className="lg:text-left text-center">
                <div className="font-semibold tabular-nums text-[#0021b4] text-4xl sm:text-5xl">
                  24/7
                </div>
                <div className="mt-2 text-[#000D44]">
                  Monitored by Professionals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
