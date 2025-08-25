import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4 h-[60.7vh]">
      <div className="max-w-md">
        <Image
          src="/not-found.png"
          alt="Medical professionals"
          className="rounded-xl w-full h-auto"
          width={400}
          height={300}
          priority
        />
      </div>
      <h2 className="font-extrabold text-[#1c398f] text-5xl">Page Not Found</h2>
      {/* <Link href="/" className="bg-[#1c398f] mt-5 p-2 rounded-md text-white">
        Go back home
      </Link> */}
    </div>
  );
}

export default NotFound;
