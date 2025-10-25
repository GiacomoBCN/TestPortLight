import React from "react";
import GlassCard from "../portfolio/GlassCard";
import { motion } from "framer-motion";

export default function LeadershipProfile({
  name = "Giacomo Bianchi, PhD",
  role,
  image = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  responsibilities = []
}: {
  name?: string;
  role: string;
  image?: string;
  responsibilities: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-[var(--color-border-interactive)] ring-offset-4 ring-offset-[var(--color-surface-secondary)]">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 glass rounded-full flex items-center justify-center glow-blue">
              <span className="text-2xl">👤</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[var(--color-text-inverse)] mb-1">{name}</h3>
            <p className="text-[var(--color-text-brand)] font-semibold mb-4">{role}</p>

            {responsibilities.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
                  Key Responsibilities
                </p>
                <ul className="space-y-2">
                  {responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-[var(--color-text-primary)] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-surface-interactive-default)] mt-2 flex-shrink-0 glow-blue"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}