"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import CaseStudyHero from "../components/casestudy/CaseStudyHero";
import CaseStudyOverview from "../components/casestudy/CaseStudyOverview";
import CaseStudySection from "../components/casestudy/CaseStudySection";
import MetricShowcase from "../components/casestudy/MetricShowcase";
import LeadershipProfile from "../components/casestudy/LeadershipProfile";
import GlassCard from "../components/portfolio/GlassCard";
import LeadershipCard from "../components/portfolio/LeadershipCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import { Users, Target, Zap } from "lucide-react";
 
export default function CaseStudyTemplate({ 
  projectData 
}: { 
  projectData: {
    title: string;
    company: string;
    role: string;
    year: string;
    tags: string[];
    heroImage: string;
    introCard?: {
      image: string;
      title: string;
      content: string[];
    };
    overview: {
      challenge: string[];
      role: string[];
      impact: string[];
      timeline: string[];
    };
    profileImage: string;
    responsibilities: string[];
    businessContext: string[];
    challenge: {
      userProblems: string[];
      businessConstraints: string[];
      technicalComplexity: string[];
    };
    leadershipApproach: {
      people: string[];
      product: string[];
      execution: string[];
    };
    keyDecisions: Array<{
      point: string;
      options: string[];
      rationale: string;
      impact: string;
    }>;
    outcomes: {
      metrics: Array<{
        value: string;
        label: string;
        context: string;
      }>;
      before: string[];
      after: string[];
    };
    learnings: Array<{
      title: string;
      description: string;
    }>;
    techStack: string[];
  };
}){
  const {
    // Hero data
    title,
    company,
    role,
    year,
    tags,
    heroImage,

    // Intro card data
    introCard,

    // Overview data
    overview,

    // Profile data
    profileImage,
    responsibilities,

    // Content sections
    businessContext,
    challenge,
    leadershipApproach,
    keyDecisions,
    outcomes,
    learnings,

    // Tech stack
    techStack
  } = projectData;

  return (
    <div className="overflow-hidden">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40">
        <Link
        href={createPageUrl("Home")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-[#cbd5e1] hover:text-white hover:border-[#0066ff] transition-all"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Back to Portfolio</span>
        </Link>
      </div>

      {/* Hero */}
      <CaseStudyHero
        title={title}
        company={company}
        role={role}
        year={year}
        tags={tags}
        image={heroImage}
      />

      {/* Intro Card */}
      {introCard && (
        <ProjectIntroCard image={introCard.image} title={introCard.title}>
          {introCard.content.map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </ProjectIntroCard>
      )}

      {/* Overview */}
      <CaseStudyOverview
        challenge={overview.challenge}
        role={overview.role}
        impact={overview.impact}
        timeline={overview.timeline}
      />

      {/* Leadership Profile */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Project Leadership
          </h2>
          <LeadershipProfile
            role={role}
            image={profileImage}
            responsibilities={responsibilities}
          />
        </div>
      </section>

      {/* Section 1: Business Context */}
      <CaseStudySection number="01" title="Business Context">
        <div className="prose prose-lg prose-invert max-w-none space-y-4">
          {businessContext.map((paragraph, index) => (
            <p key={index} className="text-[#cbd5e1] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </CaseStudySection>

      {/* Section 2: The Challenge */}
      <CaseStudySection number="02" title="The Challenge">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">👥</span>
              User Problems
            </h3>
            <ul className="space-y-2 text-[#cbd5e1] text-sm">
              {challenge.userProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#0066ff] mt-1">•</span>
                  {problem}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard delay={0.1}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💼</span>
              Business Constraints
            </h3>
            <ul className="space-y-2 text-[#cbd5e1] text-sm">
              {challenge.businessConstraints.map((constraint, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#0066ff] mt-1">•</span>
                  {constraint}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard delay={0.2}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              Technical Complexity
            </h3>
            <ul className="space-y-2 text-[#cbd5e1] text-sm">
              {challenge.technicalComplexity.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#0066ff] mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </CaseStudySection>

      {/* Section 3: My Leadership Approach */}
      <CaseStudySection number="03" title="My Leadership Approach">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LeadershipCard
            icon={Users}
            title="People Leadership"
            points={leadershipApproach.people}
          />
          <LeadershipCard
            icon={Target}
            title="Product Strategy"
            points={leadershipApproach.product}
            delay={0.1}
          />
          <LeadershipCard
            icon={Zap}
            title="Strategic Execution"
            points={leadershipApproach.execution}
            delay={0.2}
          />
        </div>
      </CaseStudySection>

      {/* Section 4: Key Decisions */}
      <CaseStudySection number="04" title="Key Decisions & Trade-offs">
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-4 px-4 text-white font-semibold">Decision Point</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Options Considered</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Why We Chose</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Impact</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {keyDecisions.map((decision, index) => (
                  <tr key={index} className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-4 px-4 text-white font-medium">{decision.point}</td>
                    <td className="py-4 px-4 text-[#cbd5e1]">
                      {decision.options.map((option, i) => (
                        <div key={i}>{i + 1}. {option}</div>
                      ))}
                    </td>
                    <td className="py-4 px-4 text-[#cbd5e1]">{decision.rationale}</td>
                    <td className="py-4 px-4 text-[#0066ff] font-semibold">{decision.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </CaseStudySection>

      {/* Section 5: Outcomes & Impact */}
      <CaseStudySection number="05" title="Outcomes & Impact">
        <MetricShowcase metrics={outcomes.metrics} />

        <div className="mt-12">
          <GlassCard>
            <h3 className="text-2xl font-bold text-white mb-6">Before → After</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-red-400">❌</span> Before
                </h4>
                <ul className="space-y-2 text-[#cbd5e1] text-sm">
                  {outcomes.before.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-green-400">✅</span> After
                </h4>
                <ul className="space-y-2 text-[#cbd5e1] text-sm">
                  {outcomes.after.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </CaseStudySection>

      {/* Section 6: What I Learned */}
      <CaseStudySection number="06" title="What I Learned">
        <GlassCard>
          <div className="space-y-6">
            {learnings.map((learning, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-white mb-3">
                  {learning.title}
                </h3>
                <p className="text-[#cbd5e1] leading-relaxed">
                  {learning.description}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </CaseStudySection>

      {/* Tech Stack */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Tech Stack</h2>
          <GlassCard>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 glass rounded-lg text-sm border border-[#0066ff] text-[#cbd5e1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Want to see more work?
              </h2>
              <p className="text-[#cbd5e1] mb-8 max-w-2xl mx-auto">
                This is just one example of how I lead cross-functional teams to deliver 
                measurable business impact through strategic design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                href={createPageUrl("Home")}
                  className="px-8 py-4 bg-[#0066ff] rounded-xl text-white font-semibold hover:bg-[#0052cc] transition-all glow-blue hover:scale-105"
                >
                  View All Projects
                </Link>
                <a
                  href="mailto:consulting@giacomobianchi.tech"
                  className="px-8 py-4 glass rounded-xl text-white font-semibold hover:bg-[#0066ff] hover:border-[#0066ff] transition-all"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
