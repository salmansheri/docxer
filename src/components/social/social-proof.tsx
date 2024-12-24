"use client";
import { motion, useInView } from "motion/react";
import { JSX, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BsAmazon, BsGoogle, BsMeta, BsMicrosoft } from "react-icons/bs";

type CompaniesType = {
  id: number;
  label: string;
  icon: JSX.Element;
};

export function SocialProof() {
  const companies: CompaniesType[] = [
    {
      id: 1,
      label: "Microsoft",
      icon: <BsMicrosoft />,
    },
    {
      id: 2,
      label: "Google",
      icon: <BsGoogle />,
    },
    {
      id: 3,
      label: "Amazon",
      icon: <BsAmazon />,
    },
    {
      id: 4,
      label: "Meta",
      icon: <BsMeta />,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef);
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
    <section className="py-16 container mx-auto px-4 bg-neutral-900">
      <motion.h2
        ref={containerRef}
        variants={variants}
        initial={"hidden"}
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
        className="text-3xl font-bold text-center mb-8 text-white"
      >
        Trusted by innovative teams
      </motion.h2>
      <div className="">
        <motion.div
          transition={{
            duration: 2,
            delay: 1,
          }}
          className="w-[50%] mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {companies.map(({ id, label, icon }) => (
                <CarouselItem
                  key={id}
                  className="text-xl  font-semibold text-neutral-400"
                >
                  <span className="flex items-center justify-center flex-col text-2xl">
                    {icon}

                    {label}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
