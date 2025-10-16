import React from "react";
import { motion } from "framer-motion";

export default function ProjectIntroCard({
  image,
  title,
  children,
  aspectRatio = "3:2",
  showGradient = true,
}: {
  image: string;
  title: string;
  children: React.ReactNode;
  aspectRatio?: string;
  showGradient?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/30 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: Image */}

            <div className="relative h-64 md:h-auto min-h-[400px] bg-white">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-contain"
              />
              {showGradient && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0e27]/40"></div>
              )}
            </div>

            {/* Right: Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {title}
              </h2>
              <div className="prose prose-invert max-w-none space-y-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
