"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-[#db2777] via-[#d946ef] to-[#a21caf] opacity-10" />
      <div className="container relative mx-auto px-4 text-center py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to transform your document workflow?
          </h2>
          <p className="text-lg mb-8 text-neutral-300">
            Join thousands of teams who have already made the switch to Docxer.
          </p>
          <Link href="/sign-in">
            <Button
              size="lg"
              className="bg-white text-[#db2777] hover:bg-white/90 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
