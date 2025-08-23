import MedicalManagementCard from "@/app/components/MedicalManagementCard";
import PostCard from "@/app/components/PostCard";
import { MedicalManagementPost } from "@/lib/interfaces/medicalManagement.types";
import { Post } from "@/lib/interfaces/post.types";

const posts: Post[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1623964782698-188bc2eed35a?auto=format&fit=crop&w=1800&h=1080",
    prevImage:
      "https://images.unsplash.com/photo-1666886573203-ddb885d42900?auto=format&fit=crop&w=812&h=344",
    title:
      "Dashboard for Medical Staff to Track Patient's Medication and Treatment",
    desc: "Our well designed dashboard allows medical staff to easily track patients' medications, treatment plans, and progress. It provides a comprehensive overview of each patient's health status, ensuring that medical professionals can deliver timely and effective care.",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?auto=format&fit=crop&w=1800&h=1080",
    prevImage:
      "https://images.unsplash.com/photo-1683714395912-66c19b776532?auto=format&fit=crop&w=812&h=344",
    title:
      "Notification System for Patients to Stay Updated on Their Medication",
    desc: "Our app features a robust notification system that keeps patients informed about their medication schedules, upcoming appointments, and any changes in their treatment plans. This ensures that patients never miss a dose and stay on top of their healthcare needs.",
  },
];
const medicalManagementPosts: MedicalManagementPost[] = [
  {
    id: "1001",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=606&h=360",

    title: "Tracking and Documentation for Medical Staff",
    desc: "Our app helps medical staff by organizing patient schedules, medications, diagnoses, and prognoses—so they can focus on delivering care instead of managing files.",
  },
  {
    id: "1002",
    image:
      "https://images.unsplash.com/photo-1583088580067-16d1109aeacb?auto=format&fit=crop&w=606&h=360",

    title: "Personalized Care Access For patients",
    desc: "Our app gives patients a clear view of their medical treatment plan, including accurate dosages prescribed by their doctor, precise timing for each medication, and upcoming visit schedules—ensuring they stay informed and on track with their care.",
  },
];

function Features() {
  return (
    <main className="mx-auto pt-8 max-w-[1280px]">
      <section className="flex flex-col justify-center gap-5 pb-7 w-full">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center mb-2 text-xl">
            <div className="bg-green-400 mr-2 rounded-full w-2 h-2"></div>
            <span className="font-semibold text-green-500 md:text-base text-xl tracking-wider">
              FEATURES
            </span>
            <div className="bg-green-400 ml-2 rounded-full w-2 h-2"></div>
          </div>
          </div>
          <h2 className="mb-5 font-extrabold  text-blue-900 text-5xl text-center animate-pulse">
            Application Features
          </h2>
          <p className="mb-4 text-center">
            How Medical crew and patient stay in sync?
          </p>
          <ul className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto w-full">
            {medicalManagementPosts?.map((post) => {
              return <MedicalManagementCard key={post.id} {...post} />;
            })}
          </ul>
      </section>
      <section className="flex flex-col justify-center gap-5 pb-7 w-full">
        <ul className="gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto w-full">
          {posts?.map((post) => {
            return <PostCard key={post.id} {...post} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Features;
