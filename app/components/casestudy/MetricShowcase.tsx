import React from "react";
import GlassCard from "../portfolio/GlassCard";

export default function MetricShowcase({ 
  metrics 
}: { 
  metrics: { value: string; label: string; context?: string; }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric, index) => (
        <GlassCard key={index} delay={index * 0.1}>
          <div className="text-center py-6">
            <div className="text-5xl md:text-6xl font-bold text-[#0066ff] mb-3 glow-blue">
              {metric.value}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {metric.label}
            </h3>
            {metric.context && (
              <p className="text-sm text-[#94a3b8]">
                {metric.context}
              </p>
            )}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}