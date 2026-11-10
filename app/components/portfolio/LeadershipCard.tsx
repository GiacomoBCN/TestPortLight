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
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 mx-auto">
          <Icon size={20} className="text-accent-icon" aria-hidden="true" />
        </div>
        <h3 className="type-work-title text-[var(--color-text-brand)] mb-6 text-center">{title}</h3>
        <ul className="space-y-3 flex-1">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-[var(--color-text-primary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-surface-interactive-default)] mt-2 flex-shrink-0 glow-blue"></span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}