"use client";
import React from "react";
import { motion } from "framer-motion";
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
      image: getImagePath("images/univerity/Product_D_GB.png"),
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
        "Design Thinking & Toolsk",
      ],
      tools: ["Figma", "Miro", "Maze", "Notion"],
    },
    {
      name: "Cross Cultural managment",
      program: "Master in International Business",
      image: getImagePath("images/univerity/CCM.png"),
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
        "Cross-functional thinking",
        "Business case development",
        "Data-driven decisions",
      ],
      tools: ["Product Board", "JIRA", "Analytics", "SQL"],
    },
    {
      name: "AI Workshop",
      program: "Executive Education",
      image: getImagePath("images/univerity/AI_tools.png"),
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
      tools: ["Figma", "ChatGpt", "Midjourney"],
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center relative px-6 pt-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-[#00d4ff] rounded-full opacity-10 blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-3 glass rounded-full text-[#00d4ff] text-base md:text-lg uppercase tracking-[0.2em] font-semibold">
              Academic Leadership
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Teaching & Research
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[#cbd5e1] mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            I bring real-world product expertise into the classroom, helping
            1000+ students design impactful products and navigate the challenges
            of cross-cultural collaboration.
          </motion.p>
        </motion.div>
      </section>

      {/* Overview Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Teaching Stats */}
            <GlassCard>
              <h3 className="text-2xl font-bold text-white mb-6">
                Teaching Experience
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  >
                    <GraduationCap size={24} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#00d4ff]">
                      7 years
                    </div>
                    <div className="text-sm text-[#94a3b8]">
                      EAE Business School
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  >
                    <Users size={24} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#00d4ff]">
                      1000+
                    </div>
                    <div className="text-sm text-[#94a3b8]">
                      Students mentored
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  >
                    <BookOpen size={24} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#00d4ff]">2</div>
                    <div className="text-sm text-[#94a3b8]">
                      Master's courses across official programs
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  >
                    <TrendingUp size={24} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#00d4ff]">
                      19 teams
                    </div>
                    <div className="text-sm text-[#94a3b8]">
                      Guided through full product design projects each year
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Right: Quick Facts */}
            <GlassCard delay={0.1}>
              <h3 className="text-2xl font-bold text-white mb-6">
                Teaching Approach
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-[rgba(255,255,255,0.08)]">
                  <h4 className="font-semibold text-white mb-2">
                    Experiential Learning
                  </h4>
                  <p className="text-[#cbd5e1] text-sm leading-relaxed">
                    My teaching approach combines theory with real-world
                    application. Students learn by doing designing,
                    collaborating, and reflecting - through hands-on experiences
                    that connect academic concepts to professional practice.
                  </p>
                </div>

                <div className="pb-4 border-b border-[rgba(255,255,255,0.08)]">
                  <h4 className="font-semibold text-white mb-2">
                    Collaborative Learning Environments
                  </h4>
                  <p className="text-[#cbd5e1] text-sm leading-relaxed">
                    STeamwork is central to both courses. In Product Design
                    (UX/UI), students work in design teams to deliver complete
                    e-commerce projects. In Cross-Cultural Management, they
                    collaborate through case studies and role plays, learning
                    how cultural differences shape communication, leadership,
                    and teamwork.
                  </p>
                </div>

                <div className="pb-4 border-b border-[rgba(255,255,255,0.08)]">
                  <h4 className="font-semibold text-white mb-2">
                    Skill Development through Practice
                  </h4>
                  <p className="text-[#cbd5e1] text-sm leading-relaxed">
                    Through project-based and interactive activities, students
                    develop critical thinking, adaptability, and creative
                    problem-solving skills. Each exercise is designed to help
                    them perform effectively in diverse, multidisciplinary
                    environments.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Mentorship & Reflection
                  </h4>
                  <p className="text-[#cbd5e1] text-sm leading-relaxed">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60"></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {course.name}
                  </h3>
                  <p className="text-sm text-[#00d4ff]">{course.program}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                    Key Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs glass rounded-full border border-[rgba(255,255,255,0.1)] text-[#cbd5e1]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                    Learning Outcomes
                  </h4>
                  <ul className="space-y-2">
                    {course.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[#cbd5e1] text-sm"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-1.5 flex-shrink-0"
                          style={{
                            boxShadow: "0 0 8px rgba(0, 212, 255, 0.5)",
                          }}
                        ></span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                    Tools & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs glass rounded-full border border-[#00d4ff] text-[#00d4ff]"
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
              <p className="text-lg text-[#cbd5e1] leading-relaxed mb-6">
                I see teaching as a dialogue between theory and practice. My
                goal is to help students connect what they learn in class to the
                complexity of real professional life - where outcomes are
                uncertain, collaboration is essential, and critical thinking
                makes the difference.
              </p>

              <p className="text-lg text-[#cbd5e1] leading-relaxed mb-6">
                Drawing on my background in psychology and design, I approach
                education as a process of guided discovery. I encourage students
                to question, test, and refine their ideas through practice
                rather than memorization. Mistakes are treated as learning
                moments, and reflection is a constant part of the process.
              </p>

              <p className="text-lg text-[#cbd5e1] leading-relaxed mb-6">
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
                style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
              >
                <Award size={32} className="text-[#00d4ff]" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  PhD in Occupational Health and Industrial Relations
                </h3>
                <p className="text-[#cbd5e1] mb-4">
                  University of Bergamo • Focus: Human Factors, Behavioral
                  Systems & Labour Regulations
                </p>

                <div className="space-y-4 mt-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Research Focus
                    </h4>
                    <p className="text-[#cbd5e1] text-sm leading-relaxed">
                      My academic journey began with a PhD at the University of
                      Bergamo, where I explored how work environments,
                      organizational design, and labour relations shape team
                      performance, well-being, and collaboration. Through field
                      research in SMEs and collaborations with healthcare
                      organizations, I co-developed a scalable model for
                      assessing work-related stress - integrating insights from
                      human factors, behavioural systems, and labour law.
                    </p>
                    <p className="text-[#cbd5e1] text-sm leading-relaxed">
                      Over time, my focus evolved from occupational health and
                      organizational psychology toward technology - exploring
                      how digital products are created, experienced, and
                      improved through user interaction. This progression
                      allowed me to apply evidence-based research methods to
                      UX/UI design, team dynamics, and design system governance.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Applied to Practice and Teaching
                    </h4>
                    <p className="text-[#cbd5e1] text-sm leading-relaxed">
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
