import Image from "next/image";
import Landing from "@/components/Landing/Landing";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      {/* <h1 className="text-2xl md:text-4xl font-bold text-center">
        Welcome to My personalized email automation application
      </h1> */}
      <Landing/>
    </div>
  );
}
