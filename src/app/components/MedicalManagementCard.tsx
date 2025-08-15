
import { MedicalManagementPost } from "@/lib/interfaces/medicalManagement.types";
import Image from "next/image";

function MedicalManagementCard({ image, title, desc }: MedicalManagementPost) {
  return (
    <article className="flex md:flex-row flex-col gap-12 max-w-[612px] md:max-w-none">
      <Image
        src={image}
        alt="image Name"
        width={606}
        height={360}
        className="flex-1/2 rounded-3xl"
      />
      <div className="flex flex-col flex-1/2 justify-center gap-4">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="font-base">{desc}</p>
      </div>
    </article>
  );
}

export default MedicalManagementCard;
