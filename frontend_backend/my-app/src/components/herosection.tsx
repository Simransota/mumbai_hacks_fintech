"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import Link from "next/link";
export function HeroSection() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-600 text-center font-sans font-bold">
          Redefining Creditworthiness
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          India needs innovative solutions for assessing creditworthiness beyond traditional scores. 
          Imagine a world where AI harnesses alternative data sources to predict creditworthiness, making financial services accessible for everyone.
        </p>
        <div className="flex justify-center">
          <Link href={"/login"}>
    <button className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
        Get Started
    </button>
          </Link>
</div>
      </div>
      <BackgroundBeams />

    </div>
  );
}
