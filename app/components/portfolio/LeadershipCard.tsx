import React from "react";
import GlassCard from "./GlassCard";

export default function LeadershipCard({ 
  icon: Icon, 
  title, 
  points, 
  delay = 0 
}: { 
  icon: React.ComponentType<{ size?: number; className?: string; }>;
  title: string;
  points: string[];
  delay?: number;
}) {
  return (
    <GlassCard hover={false} delay={delay}>
      <div className="flex flex-col h-full">
        <div className="w-14 h-14 glass rounded-full flex items-center justify-center mb-4 glow-blue mx-auto">
          <Icon size={28} className="text-[#0066ff]" />
        </div>
        <h3 className="text-2xl font-bold text-[#0066ff] mb-6 text-center">{title}</h3>
        <ul className="space-y-3 flex-1">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-[#cbd5e1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] mt-2 flex-shrink-0 glow-blue"></span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}