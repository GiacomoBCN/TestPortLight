import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../portfolio/GlassCard";

export default function CaseStudyOverview({ 
  challenge, 
  role, 
  impact, 
  timeline 
}: { 
  challenge: string[]; 
  role: string[]; 
  impact: string[]; 
  timeline: string[]; 
}) {
  const sections = [
    { title: "Challenge", icon: "🎯", content: challenge },
    { title: "My Role", icon: "👤", content: role },
    { title: "Impact", icon: "📈", content: impact },
    { title: "Timeline", icon: "⏱️", content: timeline }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <GlassCard key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl mb-4">{section.icon}</div>
                <h3 className="type-work text-lg text-[var(--card-text-heading)] mb-3">{section.title}</h3>
                <div className="text-[var(--card-text-body)] text-sm space-y-2">
                  {Array.isArray(section.content) ? (
                    section.content.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}