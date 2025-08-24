import Link from "next/link";
import Image from "next/image";
import FooterSubscribe from "./FooterSubscribe";
import { MapPin, Mail, Phone } from "lucide-react";
// import medlogo from "Medlogo.png";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#000D44] text-white/90">
      <div className="mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 max-w-screen-xl">
        <div className="flex md:flex-row flex-col md:justify-between md:items-start gap-10">
          <div className="flex flex-col space-y-5 max-w-xs">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/Medlogo-notext.png"
                alt="MedReminder Logo"
                width={100}
                height={100}
                className="w-10 h-10"
              />
              <span className="font-semibold text-white text-xl tracking-wide">
                MedReminder
              </span>
            </Link>
            <p className="text-gray-200 text-base leading-relaxed">
              Enhancing medical crew schedules & patient safety through smart
              medication management solutions.
            </p>
            <div className="flex gap-2">
              <Social href="#" label="Facebook" icon="/facebooklogo.svg" />
              <Social href="#" label="Instagram" icon="/instagramlogo.svg" />
              <Social href="#" label="TikTok" icon="/tiktoklogo.svg" />
              <Social href="#" label="X" icon="/twitterlogo.svg" />
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="mt-3 mb-6 font-semibold text-white text-xl tracking-wide">
              SUPPORT
            </h4>
            <ul className="space-y-5 text-gray-200 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <span className="text-[12px]">
                  <Phone className="w-5 h-5" />
                </span>{" "}
                <span>+20 127 847 4336</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[12px]">
                  <Mail className="w-5 h-5" />
                </span>
                <span>support@medreminder.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[12px]">
                  <MapPin className="w-5 h-5" />
                </span>{" "}
                <span>Alexandria, Egypt</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3 max-w-sm">
            <h4 className="mt-3 mb-5 font-semibold text-white text-xl tracking-wide">
              JOIN US
            </h4>
            <p className="font-medium text-white text-base">
              Subscribe for the latest updates & insights.
            </p>

            <FooterSubscribe />
          </div>
        </div>
        <div className="mt-8 pt-6 border-white/10 border-t">
          <p className="text-gray-400 text-xs text-left md:text-center">
            © {year} MedReminder. All rights reserved.
          </p>
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
      className="flex justify-center items-center bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
    >
      <img src={icon} alt={label} className="w-4 md:w-5 h-4 md:h-5" />
    </Link>
  );
}

export default Footer;
