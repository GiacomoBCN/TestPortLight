"use client";
import React from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";
import { getImagePath } from "@/utils/image";
import ExpandableText from "@/Components/ExpandableText";
import GlassCard from "@/Components/portfolio/GlassCard";
import SectionHeader from "@/Components/portfolio/SectionHeader";

export default function Teaching() {
  const courses = [
    {
      name: "Product Design (UX/UI)",
      program: "Master in Digital Marketing",
      image: getImagePath("images/univerity/Product_D_GB.webp"),
      topics: [
        "User Research",
        "Information Architecture",
        "Wireframing & Prototyping",
        "UI Design Patterns",
        "Usability Testing",
        "Design Systems",
        "Cross-Cultural Communication",
      ],
      outcomes: [
        "End-to-End Design Process",
        "Practical Team Projects",
        "Design Thinking & Tools",
      ],
      tools: ["Figma", "Miro", "Maze", "Notion"],
    },
    {
      name: "Cross-Cultural Management",
      program: "Master in International Business",
      image: getImagePath("images/univerity/CCM.webp"),
      topics: [
        "Management Across Cultures",
        "Global Leadership",
        "Cultural Environment",
        "Organizational Culture",
        "Intercultural Communication",
        "Negotiation",
        "Managing Global Teams",
        "Ethics & Responsibility in Global Contexts",
      ],
      outcomes: [
        "Managing global and multicultural teams",
        "Cross-cultural negotiation and communication",
        "Ethical decision-making in global contexts",
      ],
      tools: ["Case Studies", "Role-Play Simulations", "Miro", "Notion"],
    },
    {
      name: "AI Workshop",
      program: "Executive Education",
      image: getImagePath("images/univerity/AI_tools.webp"),
      topics: [
        "AI in Design Workflows",
        "Prompt Engineering",
        "Rapid Prototyping",
      ],
      outcomes: [
        "AI-Enhanced Creativity",
        "Prompt Engineering for Design",
        "AI Integration in UX Workflows",
      ],
      tools: ["Figma", "ChatGPT", "Midjourney"],
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center relative px-6 pt-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-transparent rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Entrata della hero in CSS: parte al primo paint, senza aspettare il JS */}
        <div className="hero-in hero-in-container max-w-4xl mx-auto text-center relative z-10">
          <div className="hero-in hero-in-fade mb-6" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block text-[var(--color-text-teaching)] text-base md:text-lg uppercase tracking-[0.2em] font-semibold">
              Academic Leadership
            </span>
          </div>

          <h1
            className="hero-in text-5xl md:text-6xl font-bold text-ink-900 mb-6"
            style={{ animationDelay: "0.3s" }}
          >
            Teaching & Research
          </h1>

          <p
            style={{ animationDelay: "0.4s" }}
            className="hero-in text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            I bring real-world product expertise into the classroom, helping
            1000+ students design impactful products and navigate the challenges
            of cross-cultural collaboration.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Teaching Stats */}
            <GlassCard>
              <h2 className="text-2xl font-bold text-ink-900 mb-6">
                Teaching Experience
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <GraduationCap size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">
                      7 years
                    </div>
                    <div className="text-sm text-slate-400">
                      EAE Business School
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <Users size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">
                      1000+
                    </div>
                    <div className="text-sm text-slate-400">
                      Students mentored
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <BookOpen size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">2</div>
                    <div className="text-sm text-slate-400">
                      Master's courses across official programs
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
                  >
                    <TrendingUp size={24} className="text-[var(--color-text-teaching)]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-text-teaching)]">
                      19 teams
                    </div>
                    <div className="text-sm text-slate-400">
                      Guided through full product design projects each year
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Right: Quick Facts */}
            <GlassCard delay={0.1}>
              <h2 className="text-2xl font-bold text-ink-900 mb-6">
                Teaching Approach
              </h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-[rgba(7,9,11,0.10)]">
                  <h3 className="font-semibold text-ink-900 mb-2">
                    Experiential Learning
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    My teaching approach combines theory with real-world
                    application. Students learn by doing - designing,
                    collaborating, and reflecting - through hands-on experiences
                    that connect academic concepts to professional practice.
                  </p>
                </div>

                <div className="pb-4 border-b border-[rgba(7,9,11,0.10)]">
                  <h3 className="font-semibold text-ink-900 mb-2">
                    Collaborative Learning Environments
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Teamwork is central to both courses. In Product Design
                    (UX/UI), students work in design teams to deliver complete
                    e-commerce projects. In Cross-Cultural Management, they
                    collaborate through case studies and role plays, learning
                    how cultural differences shape communication, leadership,
                    and teamwork.
                  </p>
                </div>

                <div className="pb-4 border-b border-[rgba(7,9,11,0.10)]">
                  <h3 className="font-semibold text-ink-900 mb-2">
                    Skill Development through Practice
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Through project-based and interactive activities, students
                    develop critical thinking, adaptability, and creative
                    problem-solving skills. Each exercise is designed to help
                    them perform effectively in diverse, multidisciplinary
                    environments.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-ink-900 mb-2">
                    Mentorship & Reflection
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    I guide students throughout their learning journey,
                    fostering awareness of their strengths and areas for growth.
                    Reflection and feedback are key to helping them translate
                    classroom experience into professional confidence and
                    real-world competence.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Courses Taught"
            subtitle="Bridging academic theory with industry practice"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <GlassCard key={index} delay={index * 0.1}>
                <div className="mb-4">
                  <div className="mb-6 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                    <div className="relative aspect-video overflow-hidden group/image">
                      <Image
                        src={course.image}
                        alt={course.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F4F5F6] via-transparent to-transparent opacity-60"></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-ink-900 mb-2">
                    {course.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-teaching)]">{course.program}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-ink-900 mb-3 uppercase tracking-wider">
                    Key Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs glass rounded-full border border-[rgba(7,9,11,0.12)] text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-ink-900 mb-3 uppercase tracking-wider">
                    Learning Outcomes
                  </h4>
                  <ul className="space-y-2">
                    {course.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-300 text-sm"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[var(--teaching-accent-border)] mt-1.5 flex-shrink-0"
                          style={{
                            boxShadow: "0 0 8px rgba(245, 195, 59, 0.5)",
                          }}
                        ></span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-ink-900 mb-3 uppercase tracking-wider">
                    Tools & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs glass rounded-full border border-[var(--teaching-accent-border)] text-[var(--color-text-teaching)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Teaching Philosophy" />

          <GlassCard>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I see teaching as a dialogue between theory and practice. My
                goal is to help students connect what they learn in class to the
                complexity of real professional life - where outcomes are
                uncertain, collaboration is essential, and critical thinking
                makes the difference.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Drawing on my background in psychology and design, I approach
                education as a process of guided discovery. I encourage students
                to question, test, and refine their ideas through practice
                rather than memorization. Mistakes are treated as learning
                moments, and reflection is a constant part of the process.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Ultimately, I aim to prepare students who can think
                independently and work effectively across disciplines and
                cultures. Beyond technical skills, I want them to leave the
                classroom with a clear sense of responsibility, curiosity, and
                confidence in their ability to contribute meaningfully to the
                world around them.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Research Background */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Research Background" />

          <GlassCard>
            <div className="flex items-start gap-6">
              <div
                className="w-16 h-16 glass rounded-full flex items-center justify-center flex-shrink-0 hidden md:flex"
                style={{ boxShadow: "0 0 20px rgba(245, 195, 59, 0.3)" }}
              >
                <Award size={32} className="text-[var(--color-text-teaching)]" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-ink-900 mb-2">
                  PhD in Human Capital Formation and Labour Relations
                </h3>
                <p className="text-slate-300 mb-4">
                  University of Bergamo • Focus: Human Factors, Behavioral
                  Systems & Labour Regulations
                </p>

                <div className="space-y-4 mt-6">
                  <div>
                    <h4 className="font-semibold text-ink-900 mb-2">
                      Research Focus
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      My academic journey began with a PhD at the University of
                      Bergamo, where I explored how work environments,
                      organizational design, and labour relations shape team
                      performance, well-being, and collaboration. Through field
                      research in SMEs and collaborations with healthcare
                      organizations, I co-developed a scalable model for
                      assessing work-related stress - integrating insights from
                      human factors, behavioural systems, and labour law.
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Over time, my focus evolved from occupational health and
                      organizational psychology toward technology - exploring
                      how digital products are created, experienced, and
                      improved through user interaction. This progression
                      allowed me to apply evidence-based research methods to
                      UX/UI design, team dynamics, and design system governance.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink-900 mb-2">
                      Applied to Practice and Teaching
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Today, my work bridges research and practice through
                      industry-driven methodologies in UX/UI design and
                      cross-cultural management. I guide teams and students in
                      understanding how human behaviour, collaboration, and
                      organizational design intersect - fostering scalable,
                      people-centred frameworks that connect academic insight
                      with real-world impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
