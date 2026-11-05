"use client";

import React from "react";
import ProjectListingCard from "../components/work/ProjectListingCard";
import { productWork } from "@/content/product-work";

export default function ProductWork() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block text-accent text-base md:text-lg uppercase tracking-[0.2em] font-semibold">
              {productWork.hero.eyebrow}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-ink-900 mb-6">
            {productWork.hero.title}
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            {productWork.hero.subtitle}
          </p>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {productWork.hero.description}
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productWork.projects.map((project, index) => (
              <ProjectListingCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
