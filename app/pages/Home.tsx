import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import { getImagePath } from "@/utils/image";
import {
  ChevronDown,
  Layers,
  TrendingUp,
  GraduationCap,
  Users,
  Package,
  Zap,
  Code,
  Sparkles,
  Briefcase,
  MonitorCog,
  DraftingCompass,
  SquareDashedKanban,
} from "lucide-react";

import { motion } from "framer-motion";
import SectionHeader from "../components/portfolio/SectionHeader";
import MetricCard from "../components/portfolio/MetricCard";
import LeadershipCard from "../components/portfolio/LeadershipCard";
import ProjectCard from "../components/portfolio/ProjectCard";
import GlassCard from "../components/portfolio/GlassCard";
import ExpandableText from "../components/ExpandableText";
import BeforeAfterImpactCard from "../components/portfolio/BeforeAfterImpactCard";
export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[85vh] md:min-h-screen flex items-center justify-center relative px-6">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-[#0066ff] rounded-full opacity-10 blur-3xl"></div>
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
            className="mb-3 md:mb-6"
          >
            <span className="inline-block px-6 py-3 glass rounded-full text-[#0066ff] text-base md:text-lg uppercase tracking-[0.2em] font-semibold">
              Product & Design Leadership
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Giacomo Bianchi, PhD
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[#cbd5e1] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            I align designers and engineers to ship scalable systems. I reduce
            friction in complex interfaces, unify fragmented codebases, and
            establish governance that makes design systems work in production.{" "}
            <br />
            I've taught 1000+ students across UX/UI and cross-cultural
            management.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="#work"
              className="px-8 py-4 bg-[#0066ff] rounded-xl text-white font-semibold hover:bg-[#0052cc] transition-all duration-200 glow-blue hover:scale-105"
            >
              View Product Work
            </a>
            <Link
              href={createPageUrl("Teaching")}
              className="px-8 py-4 glass rounded-xl text-white font-semibold hover:bg-[#0066ff] hover:border-[#0066ff] transition-all duration-200 hover:scale-105"
            >
              View Teaching Portfolio
            </Link>
          </motion.div>

          <motion.a
            href="#impact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
            className="flex justify-center cursor-pointer"
          >
            <ChevronDown size={32} className="text-[#0066ff] glow-blue" />
          </motion.a>
        </motion.div>
      </section>

      {/* Impact Metrics Section */}
      <section id="impact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Driving Measurable Impact"
            subtitle="From From leading design systems at Dow Jones to teaching at EAE. 
            I focus on systems that scale and teams that succeed."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BeforeAfterImpactCard
              icon={MonitorCog}
              headline="60 +"
              subHeadline="DOW JONES - 8 BRANDS ALIGNED" // <- New sub-headline
              before="8 brands with separate design and engineering teams. Each team had different processes, priorities, and platforms."
              after="Co-owned roadmap and led adoption across 60+ designers, 120+ stakeholders. Spearheaded token-first architecture. Reduced component complexity 20%."
              impact="200K+ components in production. 30% productivity increase through improved workflows. WCAG 2.2 compliant."
              delay={0}
            />
            <BeforeAfterImpactCard
              icon={TrendingUp}
              headline="40 %"
              subHeadline="INTERACTION FRICTION"
              before="VOD platform required 10+ button presses to switch profiles. 3-axis navigation confused users."
              after="Heuristic evaluation identified friction. Redesigned to 4 presses. Clear 2-axis structure."
              impact="60% faster profile switching. WCAG AA accessible. Scaled across TV, mobile, tablet, car."
              delay={0.1}
            />
            <BeforeAfterImpactCard
              icon={GraduationCap}
              headline="1000 +"
              subHeadline="STUDENTS MENTORED" // <- New sub-headline
              before="Theory-heavy lectures with limited real-world application."
              after="Project-driven learning across design and management disciplines."
              impact="7 years teaching at EAE Business School. 2 master's programs. 19 project teams annually."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* How I Lead Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="How I Lead"
            subtitle="Through people, product, and strategy"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LeadershipCard
              icon={Users}
              title="Through People"
              points={[
                "Facilitated cross-brand collaboration and design critiques at Dow Jones",
                "Bridged design-engineering gap through 1:1 key role relationships and problem-solving meetings",
                "Taught 1000+ students across 2 official master's programs at EAE Business School",
              ]}
              delay={0}
            />
            <LeadershipCard
              icon={Package}
              title="Through Product"
              points={[
                "Co-owned design system roadmap and sprint planning",
                "Led SGPV product evolution over 18 months (PhoneGap → Flutter + AI) serving 15 FMCG clients",
                "Balanced user value with technical constraints across B2B and B2C platforms",
              ]}
              delay={0.1}
            />
            <LeadershipCard
              icon={Zap}
              title="Through Strategy"
              points={[
                "Improved UAT/QA workflows - 30% team productivity increase",
                "Proposed removing VOD welcome screen despite stakeholder attachment - prioritized user value over internal preference",
                "Managed feature backlog and prioritization for B2B platforms - balanced user value with technical constraints",
              ]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Featured Work"
            subtitle="Strategic product leadership with measurable impact"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              role="Enterprise Leadership"
              title="Dow Jones Design System"
              company="Dow Jones"
              timeframe=""
              description="Co-led design system adoption across B2B and B2C brands, boosting team productivity by 30% and reducing component complexity by 20%."
              image={getImagePath("images/projects/DJ1.png")}
              metrics={[
                { value: "60+", label: "Designers" },
                { value: "200K+", label: "Component Refs" },
                { value: "30%", label: "Efficiency" },
              ]}
              tags={[
                "Leadership",
                "AI-Enhanced",
                "Product Strategy",
                "Design Systems",
                "SAFe Agile",
                "WCAG 2.2",
                "CI/CD",
                "Storybook",
                "Style Dictionary",
                "Design Tokens",
                "React",
                "Figma",
              ]}
              link={createPageUrl("DowJones")}
              delay={0}
            />

            <ProjectCard
              role="B2C Multi-platform"
              title="VOD Platform Redesign"
              company="Confidential Client"
              timeframe=""
              description="Redesigned cross-device VOD experience with 40% fewer interaction steps (calculated via click-path analysis) and WCAG AA compliance across TV, mobile, and in-car displays."
              image={getImagePath("images/projects/Vod.png")}
              metrics={[
                { value: "40%", label: "Less Friction" },
                { value: "WCAG AA", label: "Compliant" },
                { value: "5", label: "Platforms" },
              ]}
              tags={[
                "Consultant",
                "Heuristic Evaluation",
                "End-to-end UX/UI Process",
                "Figma",
                "Multi-platform Design",
                "UX Strategy",
                "WCAG 2.2 AA",
                "TV/10-foot UI",
              ]}
              link={createPageUrl("VODplatform")}
              delay={0.1}
            />

            <ProjectCard
              role="B2B SaaS Long-term"
              title="SGPV Product Evolution"
              company="XpuntoCero -> SGPV"
              timeframe=""
              description="Multi-year product evolution from PhoneGap to Flutter, serving 15 B2B clients. Redesigned user flows and AI-powered features reduced task time by 25%."
              image={getImagePath("images/projects/sgpv.png")}
              metrics={[
                { value: "15", label: "Global Brands" },
                { value: "25%", label: "Faster" },
                { value: "30%", label: "Satisfaction ↑" },
              ]}
              tags={[
                "Product Strategy",
                "End-to-end UX/UI Process",
                "Design System",
                "Figma",
                "AI",
                "Mobile",
                "B2B",
                "SaaS",
                "Flutter",
                "Dart",
                "PhoneGap",
                "JavaScript",
                "Bootstrap",
                "Agile/SCRUM",
              ]}
              link={createPageUrl("SGPVEvolution")}
              delay={0.3}
            />

            <ProjectCard
              role="Growth & Business Impact"
              title="XpuntoCero Digital Transformation"
              company="XpuntoCero"
              timeframe=""
              description="Rebranded SaaS company with PWA redesign, increasing mobile traffic by 40%, leads by 15%, and customer satisfaction by 30%."
              image={getImagePath("images/projects/XP0.png")}
              metrics={[
                { value: "40%", label: "Mobile Trafic" },
                { value: "15%", label: "More Leads" },
                { value: "2 X", label: "Demo Requests" },
              ]}
              tags={[
                "Branding",
                "Strategy",
                "End-to-end UX/UI Process",
                "Figma",
                "Front-End",
                "PWA",
                "WordPress",
                "Elementor",
              ]}
              link={createPageUrl("XpuntoCero")}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* How I Work Section (updated layout with portrait) */}
      <section id="about" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0066ff]/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            title="How I Work"
            subtitle="Merging strategy, design, and technology through empathy and clarity"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl max-w-sm">
                <Image
                  src={getImagePath("images/profile/gb.ven_2.png")}
                  alt="Giacomo Bianchi portrait"
                  width={480}
                  height={640}
                  className="object-cover w-full h-auto grayscale"
                />
              </div>
            </motion.div>

            {/* Cards + Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <GlassCard hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <DraftingCompass size={24} className="text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Product Design
                      </h3>
                      <p className="text-sm font-semibold text-[#cbd5e1] mb-2">
                        Research → Strategy → Design → Testing → Delivery.
                      </p>
                      <p className="text-sm text-[#94a3b8]">
                        I run heuristic evaluations, user interviews, and
                        usability tests to validate decisions before engineering
                        builds.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard hover={false} delay={0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <SquareDashedKanban
                        size={24}
                        className="text-[#0066ff]"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Product Strategy
                      </h3>
                      <p className="text-sm font-semibold text-[#cbd5e1] mb-2">
                        Roadmaps, Prioritization, Stakeholder Alignment.
                      </p>
                      <p className="text-sm text-[#94a3b8]">
                        I co-own product roadmaps and prioritize features based
                        on user research, business goals, and technical
                        constraints. I've led strategic decisions across design
                        systems, mobile apps, and B2B platforms.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <Code size={24} className="text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Front-End Development
                      </h3>
                      <p className="text-sm font-semibold text-[#cbd5e1] mb-2">
                        React, Flutter, Dart, HTML5, CSS3, JavaScript,
                        TypeScript, Tailwind.
                      </p>
                      <p className="text-sm text-[#94a3b8]">
                        I code functional prototypes to bridge design and
                        engineering. This shared language helps me validate
                        feasibility early and align teams on technical approach.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard hover={false} delay={0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center flex-shrink-0 glow-blue">
                      <Sparkles size={24} className="text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        AI-Augmented Workflow
                      </h3>
                      <p className="text-sm font-semibold text-[#cbd5e1] mb-2">
                        ChatGPT, GitHub Copilot, Vertex AI, Midjourney, Cursor,
                        AI Agents.
                      </p>
                      <p className="text-sm text-[#94a3b8]">
                        I use AI throughout my design process. Following design
                        thinking principles, I accelerate feedback loops and
                        improve decision-making through rapid iteration.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
              <GlassCard hover={false} delay={0.1}>
                <p className="text-lg text-[#cbd5e1] leading-relaxed ">
                  My technical background allows me to bridge design and
                  engineering - prototyping rapidly and participating in
                  architecture discussions. I use AI tools to validate ideas in
                  hours instead of weeks, building working prototypes that teams
                  can react to instead of debating abstract specs.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="What Colleagues Say" />

          <div className="space-y-12">
            <GlassCard hover={false}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-1">
                  <ExpandableText>
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-4">
                      "Giacomo is a very good assets when it comes to build
                      bridges between design and tech. Not only he has a very
                      good understanding of both sides. His best characteristic
                      is the ability to talk to both in their own languages and
                      to be the medium across the two world, communicating
                      efficiently needs, constraints and opportunities. Last but
                      not least, he his a good team player, able to build
                      boundaries with everyone in the office, which comes to a
                      benefit to the design team. He is also very good in
                      research and humanistic approach. His ability to capture
                      requirements and information out of interviews and focus
                      groups is fantastic. Something I really value from a
                      person in his position."{" "}
                    </p>
                  </ExpandableText>
                  <div>
                    <p className="font-semibold text-white">Antonella Sassu</p>
                    <p className="text-sm text-[#94a3b8]">
                      Senior Manager Product Design B2B • Tech Company
                    </p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex-shrink-0">
                  <Image
                    src={getImagePath("images/profile/1756901959970.jpg")}
                    alt="Antonella Sassu"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard hover={false} delay={0.1}>
              <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6">
                <div className="flex-1">
                  <ExpandableText>
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-4">
                      "I had the pleasure of working closely with Giacomo as a
                      Design Lead Technologist at Dow Jones, and I can
                      confidently say he is an exceptional professional. Giacomo
                      played a critical role as a bridge between engineering and
                      UX, which was instrumental in driving the success of our
                      projects and ensuring smooth handoffs between teams.
                      Additionally, I had the opportunity to collaborate with
                      Giacomo on improving the User Acceptance Testing (UAT),
                      Quality Assurance (QA), and Design acceptance processes.
                      During this collaboration, Giacomo demonstrated his
                      meticulous attention to detail, problem-solving skills,
                      and dedication to optimizing workflows."
                    </p>
                  </ExpandableText>
                  <div>
                    <p className="font-semibold text-white">Oana Stroe</p>
                    <p className="text-sm text-[#94a3b8]">
                      Design Lead | Product | UX Advocate• Tech Company
                    </p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex-shrink-0">
                  <Image
                    src={getImagePath("images/profile/1710886367232.jpg")}
                    alt="Oana Stroe"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard hover={false} delay={0.2}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-1">
                  <ExpandableText>
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-4">
                      "I had the pleasure of working with Giacomo while teaching
                      Intelligent Capital and Talent Management in the Master´s
                      in International Business program at EAE Business School.
                      He not only helped organize the course and structure
                      content but also brought invaluable expertise in
                      cross-cultural management, ensuring students gained a
                      truly global perspective.
                      <br />
                      Having taught Inclusive Leadership, I can confidently say
                      that Giacomo embodies its principles. He fosters diverse
                      perspectives, builds trust, and creates space where all
                      voices are heard. He doesn't just lead - he empowers,
                      ensuring that learning and collaboration thrive.
                      <br />
                      His communication skills stand out -clear, engaging, and
                      adaptable. Whether leading discussions, mentoring
                      students, or working with colleagues, he knows how to
                      connect with people, spark thoughtful conversations, and
                      bring key insights to life. And when it comes to
                      collaboration, Giacomo strengthens every team he's part
                      of. <br />
                      His leadership reflects the core values of global
                      citizenship-inclusiveness, cultural competence,
                      adaptability, and a genuine commitment to making a
                      positive impact. I would highly recommend him for any role
                      that values strong leadership, strategic management, and
                      the ability to foster inclusive, cross-cultural
                      collaboration. Any organization would be lucky to have him
                      on board!"
                    </p>
                  </ExpandableText>
                  <div>
                    <p className="font-semibold text-white"> Frank Longo </p>
                    <p className="text-sm text-[#94a3b8]">
                      {" "}
                      Higher Education Leader • Universty
                    </p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex-shrink-0">
                  <Image
                    src={getImagePath("images/profile/1685965339196.jpg")}
                    alt="Frank Longo"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard hover={false} delay={0.1}>
              <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6">
                <div className="flex-1">
                  <ExpandableText>
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-4">
                      " I had the opportunity to be instructed by Giacomo in
                      UX/UI at EAE. Giacomo's extensive experience and
                      insightful perspective in this field provided me a solid
                      foundation to effectively prepare and manage digital
                      products. He is truly a great professional."
                    </p>
                  </ExpandableText>
                  <div>
                    <p className="font-semibold text-white">
                      Ismael Ruiz Gutierrez
                    </p>
                    <p className="text-sm text-[#94a3b8]">
                      Marketing Strategy & Business Consultant • Former Student
                    </p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex-shrink-0">
                  <Image
                    src={getImagePath("images/profile/1685897244209.jpg")}
                    alt="Ismael Ruiz"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard hover={false} delay={0.2}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-1">
                  <ExpandableText>
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-4">
                      "Giacomo acted as consultant on a personal project that
                      involved the design and implementation of a website. He
                      mentored me and guided me through several difficult
                      choices pointing at the direction to take for each of
                      them. The project would not have been possible without his
                      input. He is very professional and also fun to work with.
                      Thanks, wish you all the best. "
                    </p>
                  </ExpandableText>
                  <div>
                    <p className="font-semibold text-white">
                      {" "}
                      Sergio D'Argenio
                    </p>
                    <p className="text-sm text-[#94a3b8]">
                      {" "}
                      Data Analyst • Tech Company
                    </p>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex-shrink-0">
                  <Image
                    src={getImagePath("images/profile/1517687171761.jpg")}
                    alt="Sergio D'Argenio"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Dual Path CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
            {/* Product & Design Leadership */}
            <div className="glass p-12 relative group hover:bg-[rgba(0,102,255,0.1)] transition-all duration-300 border-r border-[rgba(255,255,255,0.08)]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0066ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center mb-6 glow-blue">
                  <Briefcase size={32} className="text-[#0066ff]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Product & Design Leadership
                </h3>
                <p className="text-[#cbd5e1] mb-8 leading-relaxed">
                  Explore my work leading cross-functional teams, building
                  design systems, and driving measurable business impact.
                </p>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="inline-block px-8 py-4 bg-[#0066ff] rounded-xl text-white font-semibold hover:bg-[#0052cc] transition-all duration-200 glow-blue hover:scale-105"
                >
                  Explore Product Work
                </Link>
              </div>
            </div>

            {/* Teaching & Research */}
            <div className="glass p-12 relative group hover:bg-[rgba(0,212,255,0.1)] transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00d4ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 glass rounded-full flex items-center justify-center mb-6"
                  style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                >
                  <GraduationCap size={32} className="text-[#00d4ff]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Teaching & Research
                </h3>
                <p className="text-[#cbd5e1] mb-8 leading-relaxed">
                  Discover my experience teaching 1000+ students and bridging
                  academic research with industry practice.
                </p>
                <Link
                  href={createPageUrl("Teaching")}
                  className="inline-block px-8 py-4 glass rounded-xl text-white font-semibold border-2 border-[#00d4ff] hover:bg-[#00d4ff] transition-all duration-200 hover:scale-105"
                  style={{ boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)" }}
                >
                  View Teaching Portfolio{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
