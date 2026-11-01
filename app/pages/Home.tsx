import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import { getImagePath } from "@/utils/image";
import {
  ChevronDown,
  ArrowUpRight,
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

import HomeTestimonials from "../components/home/HomeTestimonials";

// Testimonials data
const testimonials = [
  {
    quote: "Giacomo is a very good asset when it comes to building bridges between design and tech. Not only does he have a very good understanding of both sides; his best characteristic is the ability to talk to both in their own languages and to be the medium across the two worlds, communicating needs, constraints and opportunities efficiently. Last but not least, he is a good team player, able to build bonds with everyone in the office, which is a benefit to the design team. He is also very good at research and brings a humanistic approach. His ability to capture requirements and information out of interviews and focus groups is fantastic. Something I really value in a person in his position.",
    name: "Antonella Sassu",
    title: "Senior Manager Product Design B2B • Tech Company",
    image: "images/profile/1756901959970.webp",
    alt: "Antonella Sassu",
  },
  {
    quote: "I had the pleasure of working closely with Giacomo as a Design Lead Technologist at Dow Jones, and I can confidently say he is an exceptional professional. Giacomo played a critical role as a bridge between engineering and UX, which was instrumental in driving the success of our projects and ensuring smooth handoffs between teams. Additionally, I had the opportunity to collaborate with Giacomo on improving the User Acceptance Testing (UAT), Quality Assurance (QA), and Design acceptance processes. During this collaboration, Giacomo demonstrated his meticulous attention to detail, problem-solving skills, and dedication to optimizing workflows.",
    name: "Oana Stroe",
    title: "Design Lead | Product | UX Advocate #impact • Tech Company",
    image: "images/profile/1710886367232.webp",
    alt: "Oana Stroe",
  },
  {
    quote: "I had the pleasure of working with Giacomo while teaching Intelligent Capital and Talent Management in the Master's in International Business program at EAE Business School. He not only helped organize the course and structure content but also brought invaluable expertise in cross-cultural management, ensuring students gained a truly global perspective.\n\nHaving taught Inclusive Leadership, I can confidently say that Giacomo embodies its principles. He fosters diverse perspectives, builds trust, and creates space where all voices are heard. He doesn't just lead - he empowers, ensuring that learning and collaboration thrive.\n\nHis communication skills stand out - clear, engaging, and adaptable. Whether leading discussions, mentoring students, or working with colleagues, he knows how to connect with people, spark thoughtful conversations, and bring key insights to life. And when it comes to collaboration, Giacomo strengthens every team he's part of.\n\nHis leadership reflects the core values of global citizenship: inclusiveness, cultural competence, adaptability, and a genuine commitment to making a positive impact. I would highly recommend him for any role that values strong leadership, strategic management, and the ability to foster inclusive, cross-cultural collaboration. Any organization would be lucky to have him on board!",
    name: "Frank Longo",
    title: "Higher Education Leader • University",
    image: "images/profile/1685965339196.webp",
    alt: "Frank Longo",
  },
  {
    quote: "I had the opportunity to be instructed by Giacomo in UX/UI at EAE. Giacomo's extensive experience and insightful perspective in this field provided me a solid foundation to effectively prepare and manage digital products. He is truly a great professional.",
    name: "Ismael Ruiz Gutierrez",
    title: "Marketing Strategy & Business Consultant • Former Student",
    image: "images/profile/1685897244209.webp",
    alt: "Ismael Ruiz",
  },
  {
    quote: "Giacomo acted as consultant on a personal project that involved the design and implementation of a website. He mentored me and guided me through several difficult choices pointing at the direction to take for each of them. The project would not have been possible without his input. He is very professional and also fun to work with. Thanks, wish you all the best.",
    name: "Sergio D'Argenio",
    title: "Data Analyst • Tech Company",
    image: "images/profile/1517687171761.webp",
    alt: "Sergio D'Argenio",
  },
];

type IconType = React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" }>;

const impact: {
  icon: IconType;
  headline: string;
  subHeadline: string;
  before: string;
  after: string;
  impact: string;
}[] = [
  {
    icon: MonitorCog,
    headline: "60 +",
    subHeadline: "DOW JONES - 8 BRANDS ALIGNED",
    before:
      "8 brands with separate design and engineering teams. Each team had different processes, priorities, and platforms.",
    after:
      "Co-owned roadmap and led adoption across 60+ designers, 120+ stakeholders. Spearheaded token-first architecture. Reduced component complexity 20%.",
    impact:
      "200K+ components in production. 30% productivity increase through improved workflows. WCAG 2.2 compliant.",
  },
  {
    icon: TrendingUp,
    headline: "40 %",
    subHeadline: "INTERACTION FRICTION",
    before:
      "VOD platform required 10+ button presses to switch profiles. 3-axis navigation confused users.",
    after:
      "Heuristic evaluation identified friction. Redesigned to 4 presses. Clear 2-axis structure.",
    impact:
      "60% faster profile switching. WCAG AA accessible. Scaled across TV, mobile, tablet, car.",
  },
  {
    icon: GraduationCap,
    headline: "1000 +",
    subHeadline: "STUDENTS MENTORED",
    before: "Theory-heavy lectures with limited real-world application.",
    after: "Project-driven learning across design and management disciplines.",
    impact:
      "7 years teaching at EAE Business School. 2 master's programs. 19 project teams annually.",
  },
];

const leadership: { icon: IconType; title: string; points: string[] }[] = [
  {
    icon: Users,
    title: "Through People",
    points: [
      "Facilitated cross-brand collaboration and design critiques at Dow Jones",
      "Bridged design-engineering gap through 1:1 key role relationships and problem-solving meetings",
      "Taught 1000+ students across 2 official master's programs at EAE Business School",
    ],
  },
  {
    icon: Package,
    title: "Through Product",
    points: [
      "Co-owned design system roadmap and sprint planning",
      "Led SGPV product evolution over 18 months (PhoneGap → Flutter + AI) serving 15 FMCG clients",
      "Balanced user value with technical constraints across B2B and B2C platforms",
    ],
  },
  {
    icon: Zap,
    title: "Through Strategy",
    points: [
      "Improved UAT/QA workflows - 30% team productivity increase",
      "Proposed removing VOD welcome screen despite stakeholder attachment - prioritized user value over internal preference",
      "Managed feature backlog and prioritization for B2B platforms - balanced user value with technical constraints",
    ],
  },
];

const projects = [
  {
    role: "Enterprise Leadership",
    title: "Dow Jones Design System",
    company: "Dow Jones",
    description:
      "Co-led design system adoption across B2B and B2C brands, boosting team productivity by 30% and reducing component complexity by 20%.",
    image: "images/projects/DJ1.webp",
    metrics: [
      { value: "60+", label: "Designers" },
      { value: "200K+", label: "Component Refs" },
      { value: "30%", label: "Efficiency" },
    ],
    tags: [
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
    ],
    link: createPageUrl("DowJones"),
  },
  {
    role: "B2C Multi-platform",
    title: "VOD Platform Redesign",
    company: "Confidential Client",
    description:
      "Redesigned cross-device VOD experience with 40% fewer interaction steps (calculated via click-path analysis) and WCAG AA compliance across TV, mobile, and in-car displays.",
    image: "images/projects/Vod.webp",
    metrics: [
      { value: "40%", label: "Less Friction" },
      { value: "WCAG AA", label: "Compliant" },
      { value: "5", label: "Platforms" },
    ],
    tags: [
      "Consultant",
      "Heuristic Evaluation",
      "End-to-end UX/UI Process",
      "Figma",
      "Multi-platform Design",
      "UX Strategy",
      "WCAG 2.2 AA",
      "TV/10-foot UI",
    ],
    link: createPageUrl("VODplatform"),
  },
  {
    role: "B2B SaaS Long-term",
    title: "SGPV Product Evolution",
    company: "XpuntoCero -> SGPV",
    description:
      "Multi-year product evolution from PhoneGap to Flutter, serving 15 B2B clients. Redesigned user flows and AI-powered features reduced task time by 25%.",
    image: "images/projects/sgpv.webp",
    metrics: [
      { value: "15", label: "Global Brands" },
      { value: "25%", label: "Faster" },
      { value: "30%", label: "Satisfaction ↑" },
    ],
    tags: [
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
    ],
    link: createPageUrl("SGPVEvolution"),
  },
  {
    role: "Growth & Business Impact",
    title: "XpuntoCero Digital Transformation",
    company: "XpuntoCero",
    description:
      "Rebranded SaaS company with PWA redesign, increasing mobile traffic by 40%, leads by 15%, and customer satisfaction by 30%.",
    image: "images/projects/XP0.webp",
    metrics: [
      { value: "40%", label: "Mobile Traffic" },
      { value: "15%", label: "More Leads" },
      { value: "2×", label: "Demo Requests" },
    ],
    tags: [
      "Branding",
      "Strategy",
      "End-to-end UX/UI Process",
      "Figma",
      "Front-End",
      "PWA",
      "WordPress",
      "Elementor",
    ],
    link: createPageUrl("XpuntoCero"),
  },
];

const howIWork: { icon: IconType; title: string; lead: string; text: string }[] = [
  {
    icon: DraftingCompass,
    title: "Product Design",
    lead: "Research → Strategy → Design → Testing → Delivery.",
    text: "I run heuristic evaluations, user interviews, and usability tests to validate decisions before engineering builds.",
  },
  {
    icon: SquareDashedKanban,
    title: "Product Strategy",
    lead: "Roadmaps, Prioritization, Stakeholder Alignment.",
    text: "I co-own product roadmaps and prioritize features based on user research, business goals, and technical constraints. I have driven strategic decisions across design systems, mobile apps, and B2B platforms.",
  },
  {
    icon: Code,
    title: "Front-End Development",
    lead: "React, Flutter, Dart, HTML5, CSS3, JavaScript, TypeScript, Tailwind.",
    text: "I code functional prototypes to bridge design and engineering. This shared language helps me validate feasibility early and align teams on technical approach.",
  },
  {
    icon: Sparkles,
    title: "AI-Native Builder",
    lead: "Cursor, Claude Code, Claude API, n8n, Vercel, Ollama, GitHub Copilot, Vertex AI, ChatGPT, Midjourney.",
    text: "ML/AI certified (180h: Python, TensorFlow, Deep Learning). I build with Cursor, Claude Code, and local LLMs, shipping functional prototypes and AI-powered workflows, not just designing around them. Genuine technical fluency at the intersection of design craft and AI.",
  },
];

/* Section heading row: rule on top, title left, subtitle right. */
function SectionHead({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="m-rule-t grid grid-cols-1 gap-4 pt-6 md:grid-cols-12 md:gap-8">
      <h2 id={id} className="m-title text-[2rem] md:col-span-5 md:text-[2.5rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-[46ch] text-base leading-relaxed text-[var(--m-ink-2)] md:col-span-7 md:pt-2 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="px-5 md:px-8">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-title"
        className="flex flex-col py-10 md:min-h-[80vh] md:py-14"
      >
        <div>
          <h1
            id="hero-title"
            className="m-display text-[clamp(2.75rem,8.4vw,6rem)]"
          >
            Giacomo Bianchi, PhD
          </h1>
          <p className="m-role m-label-mark mt-6">Product &amp; Design Leadership</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12">
          <p className="text-[1.125rem] leading-relaxed md:col-span-8 md:text-[1.375rem] md:leading-[1.5]">
            I align designers and engineers to ship scalable systems. I reduce
            friction in complex interfaces, unify fragmented codebases, and{" "}
            <mark className="m-hl">
              establish governance that makes design systems work in production.
            </mark>{" "}
            <br />
            I&apos;ve taught 1000+ students across UX/UI and cross-cultural
            management.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-12 md:mt-2">
            <a href="#work" className="m-btn m-btn-solid">
              View Product Work
            </a>
            <Link href={createPageUrl("Teaching")} className="m-btn m-btn-ghost">
              View Teaching Portfolio
            </Link>
          </div>
        </div>

        <a
          href="#impact"
          aria-label="Scroll to impact"
          className="mt-auto hidden h-12 w-12 md:mt-16 lg:mt-auto items-center justify-center self-start rounded-[var(--m-radius)] border border-[var(--m-rule-strong)] text-[var(--m-ink)] transition-colors duration-150 hover:border-[var(--m-ink)] hover:bg-[var(--m-ink)] hover:text-[var(--m-paper)] md:flex"
        >
          <ChevronDown size={22} aria-hidden="true" />
        </a>
      </section>

      {/* Impact Metrics Section */}
      <section id="impact" aria-labelledby="impact-title" className="py-16 md:py-20">
        <SectionHead
          id="impact-title"
          title="Driving Measurable Impact"
          subtitle="From leading design systems at Dow Jones to teaching at EAE. I focus on systems that scale and teams that succeed."
        />

        <ol className="mt-10 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {impact.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={item.subHeadline}
                className={`flex flex-col ${
                  i > 0
                    ? "border-t border-[var(--m-rule)] pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0"
                    : ""
                }`}
              >
                <p className="m-display m-num text-[3.5rem] md:text-[4rem]">
                  {item.headline}
                </p>
                <p className="m-label mt-3 flex items-center gap-2">
                  <Icon size={18} aria-hidden="true" />
                  {item.subHeadline}
                </p>
                <dl className="mt-6 flex flex-col gap-4 text-[0.9375rem] leading-relaxed">
                  <div className="m-rule-t pt-3">
                    <dt className="m-label">Before</dt>
                    <dd className="mt-1">{item.before}</dd>
                  </div>
                  <div className="m-rule-t pt-3">
                    <dt className="m-label">After</dt>
                    <dd className="mt-1">{item.after}</dd>
                  </div>
                  <div className="m-rule-t pt-3">
                    <dt className="m-label m-label-mark">Impact</dt>
                    <dd className="mt-1 font-bold">{item.impact}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ol>
      </section>

      {/* How I Lead Section */}
      <section aria-labelledby="lead-title" className="py-16 md:py-20">
        <SectionHead id="lead-title" title="How I Lead" subtitle="Through people, product, and strategy" />

        <div className="mt-10 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10">
          {leadership.map((col, i) => {
            const Icon = col.icon;
            return (
              <div
                key={col.title}
                className={
                  i > 0
                    ? "border-t border-[var(--m-rule)] pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0"
                    : ""
                }
              >
                <h3 className="m-title flex items-center gap-3 text-2xl">
                  <Icon size={22} aria-hidden="true" className="text-[var(--m-ink-2)]" />
                  {col.title}
                </h3>
                <ul className="mt-6">
                  {col.points.map((point) => (
                    <li
                      key={point}
                      className="m-rule-t py-3 text-[0.9375rem] leading-relaxed"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="work" aria-labelledby="work-title" className="py-16 md:py-20">
        <SectionHead
          id="work-title"
          title="Featured Work"
          subtitle="Strategic product leadership with measurable impact"
        />

        <ol className="mt-10 flex flex-col">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={p.title}>
                <article className="m-rule-t grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-12">
                  <Link
                    href={p.link}
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`block md:col-span-7 ${flip ? "md:order-2" : ""}`}
                  >
                    <div className="m-box relative aspect-[16/10] w-full bg-[var(--m-paper-2)]">
                      <Image
                        src={getImagePath(p.image)}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        loading="lazy"
                        className="object-cover mix-blend-multiply"
                      />
                    </div>
                  </Link>

                  <div className={`flex flex-col md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                    <h3 className="m-title text-[1.75rem] md:text-[2rem]">
                      <Link
                        href={p.link}
                        className="decoration-[var(--m-rule-strong)] underline-offset-[0.12em] hover:underline"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-[var(--m-ink-2)]">
                      <span className="font-bold">{p.role}</span> · {p.company}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed">{p.description}</p>

                    <dl className="mt-6 grid grid-cols-3">
                      {p.metrics.map((m, j) => (
                        <div
                          key={m.label}
                          className={`m-rule-t flex min-w-0 flex-col-reverse pr-3 pt-3 ${j > 0 ? "m-rule-l pl-3" : ""}`}
                        >
                          <dt className="mt-1 text-xs text-[var(--m-ink-2)]">{m.label}</dt>
                          <dd className="m-title m-num whitespace-nowrap text-xl">{m.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul
                      aria-label="Skills and tools"
                      className="m-inline-list mt-5 text-xs text-[var(--m-ink-2)]"
                    >
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    <Link
                      href={p.link}
                      className="m-link mt-6 inline-flex items-center gap-1 self-start text-sm font-bold"
                    >
                      View case study
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      {/* How I Work Section */}
      <section id="about" aria-labelledby="about-title" className="py-16 md:py-20">
        <SectionHead
          id="about-title"
          title="How I Work"
          subtitle="Merging strategy, design, and technology through empathy and clarity"
        />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Image
              src={getImagePath("images/profile/gb.ven_2.webp")}
              alt="Giacomo Bianchi portrait"
              width={480}
              height={640}
              loading="lazy"
              className="h-auto w-full max-w-sm rounded-[var(--m-radius)] border border-[var(--m-rule)] object-cover"
            />
          </div>

          <div className="lg:col-span-8">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {howIWork.map((w) => {
                const Icon = w.icon;
                return (
                  <li key={w.title} className="m-rule-t pt-5">
                    <h3 className="m-title flex items-center gap-3 text-xl">
                      <Icon size={20} aria-hidden="true" className="text-[var(--m-ink-2)]" />
                      {w.title}
                    </h3>
                    <p className="mt-3 text-sm font-bold leading-relaxed">{w.lead}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--m-ink-2)]">
                      {w.text}
                    </p>
                  </li>
                );
              })}
            </ul>

            <p className="m-rule-t mt-10 pt-6 text-lg leading-relaxed md:text-xl">
              My technical background allows me to bridge design and engineering
              - prototyping rapidly and participating in architecture
              discussions. I use AI tools to validate ideas in hours instead of
              weeks, building working prototypes that teams can react to instead
              of debating abstract specs.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section aria-labelledby="say-title" className="py-16 md:py-20">
        <SectionHead id="say-title" title="What Colleagues Say" />
        <div className="mt-10">
          <HomeTestimonials testimonials={testimonials} />
        </div>
      </section>

      {/* Dual Path CTA Section */}
      <section aria-label="Two paths" className="m-rule-t py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
          {/* Product & Design Leadership */}
          <div className="flex flex-col items-start">
            <Briefcase size={26} aria-hidden="true" className="text-[var(--m-terracotta-deep)]" />
            <h3 className="m-title mt-4 text-[1.75rem] md:text-[2rem]">
              Product &amp; Design Leadership
            </h3>
            <p className="mt-4 max-w-[44ch] leading-relaxed text-[var(--m-ink-2)]">
              Explore my work leading cross-functional teams, building design
              systems, and driving measurable business impact.
            </p>
            <Link
              href={createPageUrl("ProductWork")}
              className="m-link mt-6 inline-flex items-center gap-1 font-bold"
            >
              Explore Product Work
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>

          {/* Teaching & Research */}
          <div className="flex flex-col items-start md:border-l md:border-[var(--m-rule)] md:pl-10">
            <GraduationCap size={26} aria-hidden="true" className="text-[var(--m-green)]" />
            <h3 className="m-title mt-4 text-[1.75rem] md:text-[2rem]">
              Teaching &amp; Research
            </h3>
            <p className="mt-4 max-w-[44ch] leading-relaxed text-[var(--m-ink-2)]">
              Discover my experience teaching 1000+ students and bridging
              academic research with industry practice.
            </p>
            <Link
              href={createPageUrl("Teaching")}
              className="m-link mt-6 inline-flex items-center gap-1 font-bold"
            >
              View Teaching Portfolio
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
