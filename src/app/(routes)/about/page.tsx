import React from 'react'

function about() {
  return (
     <main className="flex flex-col gap-14 mx-auto my-16 px-4 max-w-[1280px]">
      <section className="flex md:flex-row flex-col justify-center items-center gap-10">
        <div className="flex flex-col flex-shrink-0 gap-4 max-w-[24rem]">
          <h2 className="font-semibold text-3xl md:text-5xl">
            Contact MidReminder Team
          </h2>
          <p className="max-w-[32rem] text-base">
            Get in touch for inquiries about our technology solutions to enhance
            Medical Staff schedules & patient Medication Management .
          </p>
          <div>
            <h4 className="font-bold text-lg">Connect</h4>
            <p className="text-base">+201278474336</p>
          </div>
          <div>
            <h4 className="font-bold text-lg">Support</h4>
            <p className="text-base">MedReminder@gmail.com</p>
          </div>
          <p className="text-base">Alexandria, Egypt</p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm" htmlFor="name">
              Your First Name
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg"
              type="text"
              id="name"
              placeholder="Enter Your Name Address"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm" htmlFor="email">
              Your Email Address
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg"
              type="email"
              id="email"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm" htmlFor="message">
              Your Message
            </label>
            <textarea
              className="p-2 placeholder:p-2 border border-gray-300 rounded-lg"
              id="message"
              rows={4}
              placeholder="Type your message here"
              defaultValue="Type your message here"
            />
          </div>
          <button className="bg-[#4B4EFC] hover:bg-[#2a82c7] px-8 py-3 rounded-4xl w-fit font-semibold text-white transition">
            Submit Your Inquiry
          </button>
        </div>
      </section>
    </main>
  )
}

export default about