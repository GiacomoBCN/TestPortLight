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
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="text-gray-300 text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}