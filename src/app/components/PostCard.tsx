
import { Post } from "@/lib/interfaces/post.types";
import Image from "next/image";

function PostCard({ image, title, desc, date, readTime }: Post) {
  return (
    <article className="flex flex-col gap-6 max-w-[612px]">
      <Image src={image} alt="image Name" width={606} height={360} />
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl bold">{title}</h3>
        <p className="font-base">{desc}</p>
        <div className="flex gap-2 text-base">
        </div>
      </div>
    </article>
  );
}

export default PostCard;
