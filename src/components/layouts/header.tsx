"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

export function Header() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <header className="relative overflow-hidden bg-zinc-950 border-b border-neutral-800">
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#db2777] to-[#d946ef]">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1
              id="logo"
              className=" text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#db2777] via-[#d946ef] to-[#a21caf] text-transparent bg-clip-text"
            >
              Docxer
            </h1>
          </motion.div>
          <motion.h2
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 2,
              ease: "easeIn",
            }}
            className="text-2xl md:text-3xl text-neutral-400 mb-6 max-w-2xl"
          >
            Create, collaborate, and bring your documents to life in real-time
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#db2777] to-[#d946ef] hover:opacity-90 transition-opacity text-white"
              >
                Get Started
                <motion.span
                  variants={{
                    hidden: { x: 0 },
                    visible: { x: 2 },
                  }}
                  whileHover={isHovered ? "visible" : "hidden"}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
