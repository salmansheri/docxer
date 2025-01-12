"use client";

import { motion } from "motion/react";
import { MouseEvent, ReactNode } from "react";
import Backdrop from "./backdrop";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  title: string;
  handleClose: () => void;
}

const Modal = ({ children, title, handleClose }: ModalProps) => {
  const ModalVariants = {
    hidden: {
      opacity: 0,
      y: "-100vh",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: "100vh",
    },
  };

  return (
    <Backdrop handleClose={handleClose}>
      <motion.div
        variants={ModalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-rose-200 text-neutral-900  p-6 border w-[90%] z-50 md:w-[50%] border-violet-200/20 shadow-xl rounded-xl  "
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <div className="grid grid-cols-[1fr,auto] justify-between items-center">
          <h3 className="text-xl font-bold text-balance">{title}</h3>
          <Button
            className="text-white"
            onClick={handleClose}
            variant="outline"
          >
            <X />
          </Button>
        </div>
        <div className="p-3">{children}</div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
