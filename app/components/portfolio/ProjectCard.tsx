import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function ProjectCard({
  role,
  title,
  company,
  timeframe,
  description,
  metrics = [],
  tags = [],
  link,
  image,
  delay = 0,
}: {
  role: string;
  title: string;
  company: string;
  timeframe: string;
  description: string;
  metrics?: { value: string; label: string }[];
  tags?: string[];
  link?: string;
  image?: string;
  delay?: number;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardContent = (
    <article className="flex flex-col h-full">
      {/* Project Image - Fixed height */}
      {image && (
        <div className="mb-6 -mx-8 -mt-8 overflow-hidden rounded-t-xl">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      )}

      {/* Header Section - Fixed height */}
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider text-[#0066ff] font-semibold block">
          {role}
        </span>
        <h3 className="text-2xl font-bold text-white mt-2 mb-1 transition-colors duration-300 group-hover:text-[#0066ff] min-h-[64px]">
          {title}
        </h3>
        <p className="text-sm text-[#94a3b8]">
          {company}
          {timeframe && ` • ${timeframe}`}
        </p>
      </div>

      {/* Description - Fixed height */}
      <p className="text-[#cbd5e1] mb-6 min-h-[72px]">{description}</p>

      {/* Spacer to push metrics and tags to bottom */}
      <div className="flex-1"></div>

      {/* Metrics - Fixed height */}
      <div className="mb-6 pb-6 border-b border-[rgba(255,255,255,0.08)] min-h-[88px]">
        {metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#0066ff] mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-[#94a3b8] leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Tags - Responsive height with better mobile handling */}
      <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs glass rounded-full border border-[#0066ff] text-[#cbd5e1]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );

  // If there's a link, wrap the entire card in a Link component
  if (link) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay }}
        className="h-full"
      >
        <Link
          href={link}
          className="block h-full glass rounded-xl p-8 transition-all duration-300 cursor-pointer group
                     hover:scale-[1.02] hover:border-[#0066ff] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)]
                     focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 focus:ring-offset-[#0a0e27]"
          aria-label={`View case study: ${title}`}
        >
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  // If no link, return a non-clickable card
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-xl p-8"
    >
      {cardContent}
    </motion.div>
  );
}
