import React, { useState, useEffect } from "react";
import GlassCard from "./GlassCard";

export default function BeforeAfterImpactCard({
  icon: Icon,
  headline,
  subHeadline,
  before,
  after,
  impact,
  delay = 0,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  subHeadline?: string;
  before: string;
  after: string;
  impact: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Extract number from headline (handles "8", "60%", "1000+")
    const match = headline.match(/^(\d+(?:%|(\+)|,)?)/);
    if (!match) return;

    const targetValue = parseInt(match[1].replace(/[^\d]/g, ""));
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, headline]);

  const displayHeadline = headline.replace(
    /^(\d+(?:%|(\+)|,)?)/,
    count.toString()
  );

  return (
    <GlassCard
      hover={false}
      delay={delay}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="w-16 h-16 glass rounded-full flex items-center justify-center mb-6 glow-blue">
          <Icon size={32} className="text-[#0066ff]" />
        </div>

        <h3 className="text-5xl font-bold text-[#0066ff] mb-6">
          {displayHeadline}
        </h3>

        {subHeadline && (
          <p className="text-lg font-semibold text-[#0066ff] mb-4 text-center">
            {subHeadline}
          </p>
        )}

        <div className="space-y-3 flex-1 flex flex-col w-full">
          <div className="glass p-3 rounded-lg flex-1 flex flex-col">
            <p className="text-white text-sm leading-relaxed text-left flex-1">
              <span className="text-sm uppercase tracking-wider text-[#0066ff] font-semibold">
                Before:&nbsp;
              </span>
              {before}
            </p>
          </div>

          <div className="glass p-3 rounded-lg flex-1 flex flex-col">
            <p className="text-white text-sm leading-relaxed text-left flex-1">
              <span className="text-sm uppercase tracking-wider text-[#0066ff] font-semibold">
                After:&nbsp;
              </span>
              {after}
            </p>
          </div>

          <div className="glass p-3 rounded-lg border-l-4 border-[#0066ff] flex-1 flex flex-col">
            <p className="text-white text-sm leading-relaxed text-left flex-1">
              <span className="text-sm uppercase tracking-wider text-[#0066ff] font-semibold">
                Impact:&nbsp;
              </span>
              {impact}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
