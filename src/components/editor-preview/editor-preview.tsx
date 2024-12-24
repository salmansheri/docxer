"use client";

import { EditorToolbar } from "@/components/editor-preview/editor-toolbar";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function EditorPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const variants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={containerRef}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-neutral-800 shadow-2xl"
    >
      <div className="bg-neutral-900 border-b border-neutral-800 p-2">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <span>File</span>
          <span>Edit</span>
          <span>Insert</span>
          <span>Format</span>
        </div>
      </div>
      <EditorToolbar />
      <div className="bg-neutral-800 p-8">
        <div className="bg-white w-full h-[600px] rounded shadow-lg" />
      </div>
    </motion.div>
  );
}
