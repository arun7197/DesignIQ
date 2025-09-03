"use client";
import React from "react";
import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Page() {
  return (
    
    <div className="bg-black text-white font-inter">
      <Header/>
      {/* Header Section */}
      <header
        className="relative flex h-screen flex-col items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="max-w-3xl px-6 z-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Elevate Your Space
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-12">
            Experience the perfect blend of aesthetics and functionality with our
            cutting-edge interior design solutions.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-12 py-4 text-lg font-medium border border-white/20 rounded-xl text-white bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:border-white/30"
          >
            Enter Dashboard
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </header>

      {/* Vision Section */}
      <section className="relative bg-[#0A0A0A] py-28 px-6 text-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
          Our Vision
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
          Creating extraordinary spaces that inspire and transform, tailored
          perfectly to your lifestyle.
        </p>
      </section>
    </div>
  );
}
