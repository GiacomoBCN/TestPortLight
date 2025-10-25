import React from "react";

export default function OverviewCard({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: React.ComponentType<{ size?: number; className?: string; }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--color-text-inverse)]/[0.03] backdrop-blur-xl border border-[var(--color-text-inverse)]/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-interactive-hover)]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--color-text-link-default)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-inverse)]">{title}</h3>
      </div>
      <div className="text-[var(--color-text-primary)] text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}