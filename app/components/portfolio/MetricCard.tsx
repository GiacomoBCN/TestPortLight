import React from "react";
import GlassCard from "./GlassCard";

export default function MetricCard({ 
  icon: Icon, 
  headline, 
  metrics, 
  delay = 0 
}: { 
  icon: React.ComponentType<{ size?: number; className?: string; }>;
  headline: string;
  metrics: string[];
  delay?: number;
}) {
  return (
    <GlassCard hover={true} delay={delay}>
      <div className="flex flex-col items-center text-center h-full">
        <div className="w-16 h-16 glass rounded-full flex items-center justify-center mb-6 glow-blue">
          <Icon size={32} className="text-[#0066ff]" />
        </div>
        <h3 className="text-5xl font-bold text-[#0066ff] mb-4">{headline}</h3>
        <div className="space-y-2 flex-1 flex flex-col justify-center">
          {metrics.map((metric, index) => (
            <p key={index} className="text-white text-base">
              {metric}
            </p>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}