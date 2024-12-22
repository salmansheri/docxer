"use client";

import { Users, Lock, Zap } from "lucide-react";
import { FeatureCard } from "@/components/features/feature-card";

export function FeaturesSection() {
  return (
    <section className="bg-neutral-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Everything you need in a modern document editor
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Real-time Collaboration"
            description="Work together with your team in real-time. See changes as they happen."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Team Management"
            description="Organize your team, set permissions, and share documents effortlessly."
          />
          <FeatureCard
            icon={<Lock className="h-8 w-8" />}
            title="Enterprise Security"
            description="Bank-grade encryption and security features to protect your documents."
          />
        </div>
      </div>
    </section>
  );
}
