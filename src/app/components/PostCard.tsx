
import { Post } from "@/lib/interfaces/post.types";
import Image from "next/image";


function PostCard({ image, title, desc }: Post) {
  return (
    <article
      tabIndex={0}
      className="
        group relative w-full max-w-[612px] overflow-hidden rounded-3xl bg-white
        shadow-md transition-transform duration-300 focus:outline-none
        hover:scale-[1.03] hover:shadow-xl focus:scale-[1.03] focus:shadow-xl
      "
    >

      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={606}
          height={360}
          className="h-56 w-full object-cover"
        />


        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t from-black/60 via-black/20 to-transparent
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100 group-focus-within:opacity-100
          "
        />
        <div
          className="
            pointer-events-none absolute bottom-0 left-0 right-0 p-4
            translate-y-4 opacity-0 transition-all duration-300
            group-hover:translate-y-0 group-hover:opacity-100
            group-focus-within:translate-y-0 group-focus-within:opacity-100
          "
        >
          <p className="text-[16px] leading-relaxed text-white">{desc}</p>
        </div>
      </div>

   
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
    </article>
  );
}

export default PostCard;