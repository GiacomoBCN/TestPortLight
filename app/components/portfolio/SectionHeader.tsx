import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ 
  title, 
  subtitle, 
  className = "" 
}: { 
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-inverse)] mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-[var(--color-text-primary)] max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}