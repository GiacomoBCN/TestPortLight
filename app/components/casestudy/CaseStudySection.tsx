import React from "react";
import { motion } from "framer-motion";

export default function CaseStudySection({ 
  number, 
  title, 
  children, 
  className = "" 
}: { 
  number: string; 
  title: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-16 px-6 ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-6 mb-8">
          <div className="text-6xl font-bold text-[#0066ff] opacity-20">
            {number}
          </div>
          <div className="flex-1 pt-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {title}
            </h2>
          </div>
        </div>
        <div className="pl-0 md:pl-24">
          {children}
        </div>
      </div>
    </motion.section>
  );
}