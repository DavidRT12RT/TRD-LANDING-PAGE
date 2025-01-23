"use client";
import { RainbowButton } from "@/components/ui/RainbowButton/rainbow-button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-50 h-50 mb-10"
        style={{objectFit:"contain"}}
      />

      <RainbowButton onClick={() => router.push("/registro")}>
       Comenzar con el registro
      </RainbowButton>
    </div>
  );
}
