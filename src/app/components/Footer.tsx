import React from 'react'
import Link from 'next/link';

function Footer() {
    const year = new Date().getFullYear();
  return (

    <footer className="bg-[#2f3f4f] text-white/90">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
       
          <div>
            <h3 className="text-2xl font-semibold text-white">Safety</h3>
            <p className="mt-4 max-w-sm text-gray-300">
              Enhancing Medical crew schedule & patient safety through medication management solutions.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Social href="#" label="Facebook" icon="/facebooklogo.svg" />
              <Social href="#" label="Instagram" icon="/instagramlogo.svg" />
              <Social href="#" label="TikTok" icon="/tiktoklogo.svg" />
              <Social href="#" label="X" icon="/twitterlogo.svg" />
            </div>

            <p className="mt-8 text-sm text-gray-400">© {year}. All rights reserved.</p>
          </div>


          <div>
            <h4 className="text-lg font-semibold tracking-wide text-white/95">CARE</h4>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>Tel: +201278474336</li>
              <li>Email: MedReminder@gmail.com</li>
              <li>Alexandria, Egypt</li>
            </ul>
          </div>


          <div>
            <h4 className="text-lg font-semibold tracking-wide text-white/95">TRUST</h4>
            <label htmlFor="footer-email" className="mt-4 block text-gray-200">
              Enter your email address
            </label>

            <input
              id="footer-email"
              type="email"
              placeholder="Your email for updates"
              className="mt-2 w-full rounded-xl bg-white text-gray-900 placeholder:text-gray-500
                         px-4 py-3 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button
              type="button"
              className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-3
                         bg-[#4B4EFC] text-white font-medium
                         shadow-md hover:opacity-95 focus:outline-none focus:ring-2
                         focus:ring-offset-2 focus:ring-sky-400 focus:ring-offset-[#2f3f4f]"
            >
              Submit for more information
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className=" rounded-full bg-white/10
                  hover:bg-white/20 transition"
    >
      <img src={icon} alt="" className="h-10 w-10" />
    </Link>
  );
}
export default Footer;

