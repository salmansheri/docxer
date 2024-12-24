"use client";

import { Lock, Users, Zap } from "lucide-react";
import { FeatureCard } from "@/components/features/feature-card";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import FadeUp from "@/components/ui/motion/animate-on-scroll";

export function FeaturesSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(headingRef);

  return (
    <section className="bg-neutral-800 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={headingRef}
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.5,
            },
            visible: {
              opacity: 1,
              scale: 1,
            },
          }}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          Everything you need in a modern document editor
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FadeUp delay={1}>
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Real-time Collaboration"
              description="Work together with your team in real-time. See changes as they happen."
            />
          </FadeUp>
          <FadeUp delay={1.5}>
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Team Management"
              description="Organize your team, set permissions, and share documents effortlessly."
            />
          </FadeUp>
          <FadeUp delay={2}>
            <FeatureCard
              icon={<Lock className="h-8 w-8" />}
              title="Enterprise Security"
              description="Bank-grade encryption and security features to protect your documents."
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
