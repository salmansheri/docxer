"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function CTASection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(headingRef);
  const isParagraphInView = useInView(paragraphRef);

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };
  return (
    <section className="relative overflow-hidden bg-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-[#db2777] via-[#d946ef] to-[#a21caf] opacity-10" />
      <div className="container relative mx-auto px-4 text-center py-16">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            ref={headingRef}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            className="text-3xl font-bold mb-6 text-white"
          >
            Ready to transform your document workflow?
          </motion.h2>
          <motion.p
            ref={paragraphRef}
            variants={{
              hidden: {
                opacity: 0,
                x: -50,
              },
              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            initial="hidden"
            animate={isParagraphInView ? "visible" : "hidden"}
            transition={{
              duration: 1,
              delay: 1,
              ease: "easeInOut"
            }}
            className="text-lg mb-8 text-neutral-300"
          >
            Join thousands of teams who have already made the switch to Docxer.
          </motion.p>
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.3,

            }}
          >


          <Link href="/sign-in">
            <Button
              size="lg"
              className="bg-white text-[#db2777] hover:bg-white/90 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
