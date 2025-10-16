import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";

interface ProjectListingCardProps {
  category: string;
  title: string;
  role: string;
  year: string;
  description: string;
  metrics?: { value: string; label: string }[];
  tags?: string[];
  slug: string;
}

export default function ProjectListingCard({
  category,
  title,
  role,
  year,
  description,
  metrics = [],
  tags = [],
  slug,
}: ProjectListingCardProps) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.05] hover:border-blue-400/30 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] hover:-translate-y-2 flex flex-col min-h-[480px] max-h-[600px]">
      {/* TOP SECTION - Header (flexible height) */}
      <div className="mb-4 flex-shrink-0">
        <div className="text-xs uppercase tracking-wider text-blue-400 mb-2">
          {category}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-400">
          {role}
          {year && " · "}
          {year && <span className="text-gray-400">{year}</span>}
        </p>
      </div>
      {/* MIDDLE SECTION - Description (fixed height) */}
      <div className="mb-4 flex-shrink-0" style={{ height: "120px" }}>
        <p className="text-gray-300 leading-relaxed text-sm line-clamp-4">
          {description}
        </p>
      </div>

      {/* CONTENT SECTION - Metrics & Tags (scrollable if needed) */}
      <div className="flex-grow mb-4 overflow-y-auto">
        {metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white/[0.03] rounded-lg p-2 text-center"
              >
                <div className="text-lg font-bold text-blue-400">
                  {metric.value}
                </div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-white/[0.05] border border-white/10 rounded-full text-gray-300 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM SECTION - CTA (fixed position, never overflows) */}
      <div className="mt-auto pt-2 border-t border-white/5 flex-shrink-0">
        <Link
          href={createPageUrl(slug)}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
        >
          View Case Study
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
