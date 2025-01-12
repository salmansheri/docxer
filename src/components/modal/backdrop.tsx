"use client";
import { motion } from "motion/react";

import { ReactNode } from "react";

interface BackdropProps {
  children: ReactNode;
  handleClose: () => void;
}

const BackdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Backdrop = ({ children, handleClose }: BackdropProps) => {
  return (
    <motion.div
      variants={BackdropVariants}
      initial="hidden"
      animate="visible"
      className="fixed h-screen bg-black/20 inset-0 flex items-center justify-center"
      onClick={handleClose}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
