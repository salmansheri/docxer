"use client";
import { motion, useInView } from "motion/react";
import { FC, type ReactNode, useEffect, useRef, useState } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
}

const FadeUp: FC<FadeUpProps> = ({ children, delay = 0.5 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef);

  const [isVisible, setIsVisible] = useState<boolean>();

  const variants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  return (
    <motion.div
      ref={containerRef}
      variants={variants}
      initial={"hidden"}
      animate={isVisible ? "visible" : "hidden"}
      transition={{
        delay: delay,
        duration: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
