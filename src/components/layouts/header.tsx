"use client";

import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="relative overflow-hidden bg-zinc-950 border-b border-neutral-800">
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#db2777] to-[#d946ef]">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1
              id="logo"
              className=" text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#db2777] via-[#d946ef] to-[#a21caf] text-transparent bg-clip-text"
            >
              Docxer
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl text-neutral-400 mb-6 max-w-2xl">
            Create, collaborate, and bring your documents to life in real-time
          </h2>
          <Link href="/sign-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#db2777] to-[#d946ef] hover:opacity-90 transition-opacity text-white"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
