"use client";
import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";

export default function EcommerceManagement() {
  // TODO: PM/PO focused content

  return (
    <div className="min-h-screen">
      <div className="fixed top-24 left-6 z-40">
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-[#cbd5e1] hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Back to Projects</span>
        </Link>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-400 mb-6">
            Home &gt; Product Work &gt; E-Commerce Product Management
          </p>
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-blue-400">
              PRODUCT MANAGEMENT · PORTFOLIO
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            E-Commerce Product Management
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            Project Manager & Product Designer
          </p>
          <p className="text-xl text-gray-300 mb-8">
            Managed multiple e-commerce projects with 95% client satisfaction
            and 90% on-time delivery.
          </p>
        </div>
      </section>

      <ProjectIntroCard
        image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
        title="Managing Complex E-Commerce Portfolios"
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          Managing multiple concurrent e-commerce projects requires balancing
          client expectations, technical constraints, and team capacity. Over
          three years, I led delivery of numerous WordPress and WooCommerce
          implementations for diverse clients.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Through agile methodologies, stakeholder management, and systematic
          quality processes, I maintained 95% client satisfaction while
          achieving 90% on-time delivery rates and boosting team productivity by
          20%.
        </p>
      </ProjectIntroCard>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 bg-[#0066ff] rounded-xl text-white font-semibold hover:bg-[#0052cc] transition-all"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
