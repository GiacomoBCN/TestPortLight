"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPageUrl } from "@/utils";
import {
  ArrowLeft,
  AlertCircle,
  User,
  Layers,
  ExternalLink,
  Github,
  Languages,
  Users,
  ShieldCheck,
  MessageSquare,
  Percent,
  BookOpen,
  Footprints,
  UserCheck,
  ClipboardCheck,
  Palette,
} from "lucide-react";
import OverviewCard from "../components/work/OverviewCard";
import DecisionTable from "../components/work/DecisionTable";
import GlassCard from "../components/portfolio/GlassCard";
import ProjectIntroCard from "../components/work/ProjectIntroCard";
import ProjectGallery from "../components/work/ProjectGallery";
import Lightbox from "../components/Lightbox";
import { getImagePath } from "@/utils/image";
import CopyEmailLink from "@/app/components/CopyEmailLink";

const DEMO_URL = "https://giacomobcn.github.io/chatTest/";
const REPO_URL = "https://github.com/GiacomoBCN/chatTest";

const img = (file: string) => getImagePath(`images/projects/falak/${file}`);

type Shot = { src: string; alt: string };

export default function FalakCaseStudy() {
  // Lightbox condivisa dalle card dell'approccio
  const [gallery, setGallery] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const open = (images: Shot[], i: number) => {
    setGallery(images);
    setIndex(i);
  };

  const shots = {
    overview: { src: img("01-desktop-overview.webp"), alt: "Falak demo: four scripted examples on the left, the chat on the right, opening with the AI disclosure" },
    balance: { src: img("02-desktop-balance.webp"), alt: "Balance answered directly, with its source and how fresh the data is" },
    spending: { src: img("04-desktop-spending-range.webp"), alt: "Spending shown as a range, split into confirmed, estimated and not yet synced" },
    items: { src: img("05-desktop-estimated-items.webp"), alt: "The six transactions behind the estimated amount, one tap away" },
    loan: { src: img("06-desktop-loan-handoff.webp"), alt: "Loan question handed to a licensed advisor, with wait time and the conversation passed along" },
    person: { src: img("07-desktop-talk-to-person.webp"), alt: "Talk to a person, always available from the header" },
    firstRead: { src: img("08-desktop-staff-first-read.webp"), alt: "Staff view: the relationship manager gives their own read before seeing the AI suggestion" },
    evidence: { src: img("09-desktop-staff-suggestion-evidence.webp"), alt: "AI suggestion with its evidence, inferred data labelled as such, and three named checks" },
    approve: { src: img("10-desktop-staff-checks-approve.webp"), alt: "Approving requires the checks and a reason, same as declining" },
    receipt: { src: img("11-desktop-staff-receipt.webp"), alt: "Receipt of the logged decision: reason, first read, who signed off, time, model, session" },
    decline: { src: img("12-desktop-staff-decline.webp"), alt: "Decline path, with a reason required" },
    dark: { src: img("13-desktop-dark-spending.webp"), alt: "Spending answer in the dark theme" },
    mobile: { src: img("14-mobile-overview.webp"), alt: "Mobile layout of the demo" },
    sheet: { src: img("15-mobile-examples-sheet.webp"), alt: "Examples sheet on mobile" },
    mobileBalance: { src: img("16-mobile-balance.webp"), alt: "Balance answer on mobile" },
    mobileSpending: { src: img("17-mobile-spending.webp"), alt: "Spending answer on mobile" },
    mobileLoan: { src: img("18-mobile-loan-handoff.webp"), alt: "Handoff to an advisor on mobile" },
    arSpending: { src: img("19-arabic-mobile-spending.webp"), alt: "Spending answer in Arabic, right-to-left, with the same marks and sources" },
    arBalance: { src: img("20-arabic-mobile-balance.webp"), alt: "Balance answer in Arabic" },
  };

  const patterns: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    text: string;
    images: Shot[];
  }> = [
    {
      icon: Layers,
      title: "Three behaviours, not one chat",
      text: "Every question lands in one of three tiers. A fact read from the system is answered straight away. An estimate is softened and broken down. A question an AI shouldn't decide goes to a person, with no best guess attached. The tier is set by the kind of question and the data available, not by a confidence number the model reports about itself.",
      images: [shots.balance, shots.spending, shots.loan],
    },
    {
      icon: Percent,
      title: "Words and marks instead of a percentage",
      text: "No \"87% confident\". Each answer carries a mark borrowed from banknote printing: solid for data read from the system, hatched for an estimate, dotted for something not yet synced. Estimates are shown as a range, and the estimated and unsynced amounts open the transactions behind them in one tap.",
      images: [shots.spending, shots.items],
    },
    {
      icon: BookOpen,
      title: "A source on every answer, the reasoning one tap away",
      text: "One line lists the sources actually used and how fresh each is. \"Why this answer\" is collapsed by default and lists the data the answer was built on, not a narrative of thinking.",
      images: [shots.balance, shots.dark],
    },
    {
      icon: Footprints,
      title: "No fake progress",
      text: "A balance arrives immediately. Steps appear only when the assistant consults several sources, each step names what it is reading, and the work can be stopped. No artificial delays to make the answer look considered.",
      images: [shots.spending],
    },
    {
      icon: UserCheck,
      title: "A person is always one tap away",
      text: "\"Talk to a person\" sits in the header. The loan question is handed to a licensed advisor with an honest wait time, a booking alternative, and the conversation passed along so nothing has to be repeated. Any answer can be flagged as wrong.",
      images: [shots.loan, shots.person],
    },
    {
      icon: ClipboardCheck,
      title: "Human oversight that isn't a rubber stamp",
      text: "The relationship manager sees the client data and answers \"should we contact them?\" before the AI suggestion appears. Three named checks replace a generic \"I have reviewed\" box. Approving needs a reason exactly as declining does. The form then turns into a receipt of what was logged. Inferred data (\"recently married\") is labelled as inferred, sensitive and not confirmed.",
      images: [shots.firstRead, shots.evidence, shots.approve, shots.receipt, shots.decline],
    },
    {
      icon: Languages,
      title: "Same signals in English and Arabic",
      text: "Switching language translates the whole conversation, screen-reader labels included, and flips the layout to right-to-left. Numbers stay unmirrored. The marks, sources and tiers are identical in both languages: culture changes how much people trust at the start, not the mechanism by which trust follows reliability.",
      images: [shots.arSpending, shots.arBalance, shots.mobileSpending],
    },
    {
      icon: Palette,
      title: "Red means error or decline, nothing else",
      text: "In banking red already means overdrafts, refusals and fraud. Uncertainty is never shown in red, and colour is never the only cue. Text contrast is at least 4.5:1 in light and dark, keyboard focus is visible, and motion is reduced when the system asks for it.",
      images: [shots.dark, shots.decline],
    },
  ];

  const keyDecisions = [
    {
      point: "How sure the answer is",
      options: [
        "Always-visible numeric score with a traffic light",
        "Verbal bands tied to an action, number on request",
        "Marks (solid / hatched / dotted) and ranges, no number",
      ],
      rationale:
        "With displayed confidence inflated and accuracy held fixed, people followed the AI more and most rated the overconfident AI as well calibrated. LLM self-reported confidence is systematically overestimated. Marks read without colour and without a reference class to misread.",
      impact: "Li et al. 2024 · PAIR Guidebook",
      impactHref: "https://arxiv.org/html/2402.07632v4",
    },
    {
      point: "Estimates",
      options: [
        "A precise total next to uncertain parts",
        "A range with the parts broken down",
      ],
      rationale:
        "A numeric range barely lowers trust in the source, while a single precise figure placed next to uncertain components distorts judgement. The breakdown tells the user where the uncertainty sits and what to check.",
      impact: "van der Bles et al. 2020 · Kale, Kay & Hullman",
      impactHref: "https://arxiv.org/pdf/2007.14516v3.pdf",
    },
    {
      point: "Cost of checking",
      options: [
        "More trust signals on the answer",
        "One tap to the transactions behind an estimate",
      ],
      rationale:
        "What reduces over-reliance on AI is making verification cheaper, not adding more signals. Every estimated or unsynced amount opens its items.",
      impact: "Vasconcelos et al. 2023",
      impactHref: "https://arxiv.org/abs/2212.06823",
    },
    {
      point: "Sources",
      options: [
        "A fixed list of three sources on every answer",
        "Only the sources actually used, with freshness",
      ],
      rationale:
        "Citations raise trust even when they are random, and under 10% of people check them. A source label is only worth showing if it is exact. Sources did reduce reliance on wrong answers, where explanations increased it.",
      impact: "Ding et al. 2025 · Kim et al. 2025",
      impactHref: "https://arxiv.org/pdf/2501.01303v1.pdf",
    },
    {
      point: "Visible steps",
      options: [
        "Scripted 'streaming validation' with fixed delays",
        "Steps only for real multi-source work, stoppable",
      ],
      rationale:
        "Slow algorithmic answers are judged less accurate, unlike slow human ones. A fake 'Authenticating credentials…' step is a false claim about a security check. AWS guidance: a step is a unit of real work; stream fast answers directly.",
      impact: "Efendić et al. · Cloudscape GenAI patterns",
      impactHref: "https://cloudscape.design/patterns/genai/progressive-steps",
    },
    {
      point: "Out-of-scope questions",
      options: [
        "Best guess with a low confidence label",
        "Handoff to a person, no guess shown",
      ],
      rationale:
        "Telling people the AI had declined, without showing its uncertain guess, gave the most accurate decisions. Showing the guess pulled people towards it even when it was wrong.",
      impact: "Bondi et al. 2022",
      impactHref: "https://ar5iv.labs.arxiv.org/html/2112.06751",
    },
    {
      point: "Staff checkpoint",
      options: [
        "Generic 'I have reviewed' attestation, reason only on decline",
        "Own read first, named checks, reason on both paths, receipt",
      ],
      rationale:
        "Automation bias hits experts and novices alike and isn't fixed by training. An independent judgement before seeing the suggestion reduces over-reliance more than explanations do. Asking for a reason only on decline makes approving the path of least resistance.",
      impact: "Parasuraman & Manzey · Buçinca et al. · Green",
      impactHref: "https://arxiv.org/pdf/2102.09692",
    },
    {
      point: "Cultural framing",
      options: [
        "Different trust mechanisms per language (high/low context)",
        "Same signals in both languages, style as a user preference",
      ],
      rationale:
        "Hall's high/low-context model isn't validated as a country classification, and Gulf preferences differ between countries. Across cultures trust starts at different levels but follows reliability the same way. The real risk is technical: calibration error is far worse in Arabic than in English.",
      impact: "Chien et al. · Zhou et al. 2025",
      impactHref: "https://d-scholarship.pitt.edu/34582/",
    },
  ];

  const delivered = [
    { value: "4", label: "Scripted scenarios", note: "3 for customers, 1 for bank staff" },
    { value: "2", label: "Languages", note: "English and Arabic, full RTL" },
    { value: "2", label: "Themes", note: "Light and dark, 4.5:1 contrast" },
    { value: "0", label: "Invented metrics", note: "No users tested yet" },
  ];

  const learnings = [
    {
      title: "Trust is the wrong success metric",
      text: "Almost every signal in the literature (percentages, citations, visible steps, reasoning) raises trust even on wrong answers. The patterns that hold up either move the decision from the user's interpretation to the system's behaviour, or make checking cheaper. A PoC should be judged on behaviour, not on a trust questionnaire.",
    },
    {
      title: "A scripted prototype can't measure calibration",
      text: "Falak always behaves the same, so it tells you nothing about how well people calibrate their trust. The next step is a test with deliberately wrong answers: how many errors people catch, how often they open the sources, how long staff reviews take and how much they vary.",
    },
    {
      title: "The evidence has gaps the bank could fill",
      text: "Most studies are lab or crowdsourced experiments on simplified tasks. There is no field study of banking chat, no attribution test on internal data, and no calibration measure for Gulf Arabic. A bank running this with real data would be producing new evidence, not confirming old.",
    },
    {
      title: "Regulation sets a floor, not a design",
      text: "The AI disclosure in the first message is the one duty that applies today (EU AI Act art. 50). Human oversight for high-risk credit decisions is required later, but GDPR art. 22 and the SCHUFA ruling already apply. The law says oversight must exist; it doesn't say how to keep it from becoming a stamp. That is the design problem.",
    },
  ];

  const regulations = [
    {
      rule: "EU AI Act art. 50(1)",
      duty: "Tell people they are interacting with an AI, at the start of the first interaction, clearly and accessibly",
      status: "Applies from 2 Aug 2026, untouched by the Digital Omnibus",
      falak: "Done: the first message says it is an AI, in English and Arabic",
    },
    {
      rule: "EU AI Act art. 50(2)",
      duty: "Marking of generated content",
      status: "Postponed to 2 Dec 2026 for systems placed before 2 Aug 2026",
      falak: "Marginal for a text chat",
    },
    {
      rule: "Digital Omnibus on AI",
      duty: "Postpones high-risk obligations (Annex III, credit scoring included, and art. 14)",
      status: "In force 27 Jul 2026; Annex III applies from 2 Dec 2027, Annex I from 2 Aug 2028",
      falak: "The staff tool becomes high-risk only if it embeds creditworthiness scores",
    },
    {
      rule: "EU AI Act art. 14(4)",
      duty: "Awareness of automation bias, ability to ignore or override the output, a stop control",
      status: "From 2 Dec 2027 for high-risk systems",
      falak: "Partly: own read first, decline path, stop on multi-step work. Automation-bias signals for staff are a next step",
    },
    {
      rule: "EU AI Act art. 86",
      duty: "Explanation of the AI's role in a decision affecting a person",
      status: "From 2 Aug 2026, tied to the high-risk classification",
      falak: "The checkpoint receipt logs decision, reason, first read, who signed off, model and session",
    },
    {
      rule: "EU AI Act art. 5",
      duty: "Ban on manipulation and on exploiting vulnerabilities",
      status: "In force since Feb 2025",
      falak: "Conversion-rate pitch removed; a vulnerability check is one of the three named checks",
    },
    {
      rule: "GDPR art. 22 / SCHUFA ruling",
      duty: "Human intervention, right to be heard and to contest, when the bank draws strongly on a score",
      status: "Already in force; the Omnibus delay does not delay this",
      falak: "Human sign-off with a reason on both paths; inferred data labelled and unconfirmed",
    },
    {
      rule: "QCB AI Guideline (Qatar, Sep 2024)",
      duty: "AI register, human-oversight protocol, board accountability, customer notice, explanation of decisions",
      status: "In force for QCB-licensed institutions; which points bind is to be checked on qcb.gov.qa",
      falak: "Notice and explanations identical in English and Arabic",
    },
    {
      rule: "CFPB Issue Spotlight (US, Jun 2023)",
      duty: "No doom loops, recognise disputes and rights, accurate information",
      status: "Supervisory expectation",
      falak: "A person always one tap away; any answer can be flagged as wrong",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40" style={{ left: "calc(var(--band) + 1.5rem)" }}>
        <Link
          href={createPageUrl("ProductWork")}
          className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-300 hover:text-ink-900 hover:border-blue transition-all"
        >
          <ArrowLeft size={20} />
          <span className="sr-only md:not-sr-only">Back to Projects</span>
        </Link>
      </div>

      {/* 1. Hero */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-sm text-gray-400 mb-6">
            Home &gt; Product Work &gt; Falak AI Assistant
          </p>

          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-accent">
              AI INTERACTION DESIGN · TRUST &amp; ACCOUNTABILITY · BANKING
            </span>
          </div>

          <h1 className="text-5xl font-bold text-ink-900 mb-4">
            Falak: an AI assistant that shows its sources
          </h1>

          <p className="text-lg text-gray-400 mb-4">
            Concept, Research &amp; Coded Prototype
          </p>

          <p className="text-xl text-gray-300 mb-8">
            A research-led study of how an AI assistant in a bank should handle
            uncertainty, hand over to people, and keep human oversight honest.
            Eight interaction patterns, each checked against the 2019–2026
            literature, built as a bilingual{" "}
            <span className="text-ink-900 font-semibold">English / Arabic</span>{" "}
            Flutter prototype. Falak is a fictional bank; every name and figure
            is invented.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue"
            >
              Open the live demo
              <ExternalLink size={18} aria-hidden="true" />
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
            >
              <Github size={18} aria-hidden="true" />
              Source on GitHub
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "AI Interaction Patterns",
              "Trust Calibration",
              "Human Oversight",
              "Research Synthesis",
              "Flutter",
              "Claude Code",
              "Arabic / RTL",
              "WCAG 2.2 AA",
              "EU AI Act",
            ].map((tag, i) => (
              <span key={i} className="px-4 py-2 glass rounded-full text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Card */}
      <ProjectIntroCard
        image={shots.overview.src}
        title="Four ways an AI answer earns trust"
        showGradient={false}
      >
        <p className="text-gray-300 leading-relaxed">
          Falak is a coded prototype of a banking assistant that shows where
          each answer comes from, how sure it is, and hands over to a person
          when it should. It runs four scripted examples: a balance (a fact), a
          spending estimate, a loan question an AI shouldn't decide, and a staff
          view where a relationship manager signs off an AI suggestion.
        </p>
        <p className="text-gray-300 leading-relaxed">
          One finding shaped everything. Trust signals such as percentages,
          citations, visible steps and explanations raise trust even when the
          AI is wrong. They only make trust <em>appropriate</em> when they lower
          the cost of checking an answer, or push the person to form their own
          judgement first.
        </p>
      </ProjectIntroCard>

      {/* 2–4. Challenge / Role / Scope */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard icon={AlertCircle} title="The Challenge">
              In finance a single AI error costs more trust than a human
              adviser's would. How does a bank's assistant handle uncertainty
              and responsibility without either hiding it or dressing it up in
              fake precision? And how does a staff checkpoint stay a real
              decision instead of a rubber stamp?
            </OverviewCard>

            <OverviewCard icon={User} title="My Role">
              <p className="font-semibold mb-2">Concept, research and prototype</p>
              <ul className="space-y-1">
                <li><span aria-hidden="true">•</span> Defined the eight interaction patterns of the first PoC.</li>
                <li><span aria-hidden="true">•</span> Validated each against the literature; three were reworked, one dropped.</li>
                <li><span aria-hidden="true">•</span> Designed the interaction, visual language and bilingual copy.</li>
                <li><span aria-hidden="true">•</span> Built the prototype in Flutter with Claude Code.</li>
              </ul>
            </OverviewCard>

            <OverviewCard icon={Users} title="Scope">
              <ul className="space-y-1">
                <li><span aria-hidden="true">•</span> Two audiences: customers and bank staff</li>
                <li><span aria-hidden="true">•</span> English and Arabic, full right-to-left</li>
                <li><span aria-hidden="true">•</span> Four scripted scenarios, light and dark</li>
                <li><span aria-hidden="true">•</span> No backend, no live model: the conversations are scripted to study the patterns</li>
              </ul>
            </OverviewCard>
          </div>
        </div>
      </section>

      {/* 5. Approach */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">01</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">Approach</h2>
              <p className="text-gray-400 mt-2">
                Eight patterns. Each one either changes what the system does,
                or makes checking cheaper.
              </p>
            </div>
          </div>

          <div className="pl-0 md:pl-24 space-y-6">
            {patterns.map((p, i) => (
              <GlassCard key={i}>
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="md:w-3/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-5 h-5 text-accent-icon" />
                      </div>
                      <h3 className="text-xl font-semibold text-ink-900">{p.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{p.text}</p>
                  </div>
                  <div className="md:w-2/5 grid grid-cols-2 gap-3 content-start">
                    {p.images.map((im, j) => (
                      <button
                        type="button"
                        key={j}
                        onClick={() => open(p.images, j)}
                        className="relative aspect-[3/2] rounded-lg overflow-hidden border border-ink-900/10 bg-white group cursor-pointer"
                        aria-label={`Enlarge image: ${im.alt}`}
                      >
                        <Image
                          src={im.src}
                          alt={im.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 20vw"
                          className="object-cover object-top"
                        />
                        <div
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="text-white text-xs font-medium">Enlarge</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Key Decisions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">02</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">Key Decisions &amp; Trade-offs</h2>
              <p className="text-gray-400 mt-2">
                The first PoC had all eight patterns. The literature confirmed
                four, reworked three and replaced one. Every row links to the
                evidence.
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            <DecisionTable decisions={keyDecisions} impactLabel="Evidence" />
          </div>
        </div>
      </section>

      {/* Gallery: the prototype on mobile */}
      <ProjectGallery
        title="The prototype on mobile"
        images={[shots.mobile, shots.sheet, shots.mobileBalance, shots.mobileLoan, shots.arSpending, shots.arBalance]}
      />

      {/* 8. Impact / Results */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">03</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">What was delivered</h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {delivered.map((d, i) => (
                <GlassCard key={i}>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="text-4xl font-bold text-ink-900 mb-1">{d.value}</div>
                    <div className="text-sm font-semibold text-accent mb-1">{d.label}</div>
                    <div className="text-xs text-gray-400">{d.note}</div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent-icon" />
                  <h3 className="text-lg font-semibold text-ink-900">No numbers that weren't measured</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  This is a concept study, not a shipped product. There are no
                  conversion rates, no satisfaction scores and no time savings
                  to report, because no user has been tested yet. What exists is
                  a working, accessible, bilingual prototype and a documented
                  rationale for every choice in it, including the ones the
                  research overturned.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 pt-2">
                  <li><span aria-hidden="true">•</span> Coded prototype, public demo and source</li>
                  <li><span aria-hidden="true">•</span> Research synthesis covering ~60 papers and guidelines, with a verdict per pattern</li>
                  <li><span aria-hidden="true">•</span> Regulatory map: EU AI Act art. 50 and 14, GDPR art. 22, QCB guideline, CFPB expectations</li>
                  <li><span aria-hidden="true">•</span> A test protocol for the next step, with behavioural metrics</li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 9. What I learned */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">04</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">What I Learned</h2>
            </div>
          </div>
          <div className="pl-0 md:pl-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnings.map((l, i) => (
              <GlassCard key={i}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink-900 mb-3">{l.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{l.text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Regulatory reference */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl font-bold text-accent opacity-20" aria-hidden="true">05</div>
            <div className="flex-1 pt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-900">Regulatory Reference</h2>
              <p className="text-gray-400 mt-2">
                The rules the design was checked against, as they stand after
                the EU Digital Omnibus. A design map, not legal advice. No rule
                found requires citing the data source on every answer: that
                pattern is good practice, not a duty.
              </p>
            </div>
          </div>
          <div className="pl-0 md:pl-24">
            {/* Desktop table */}
            <GlassCard className="hidden lg:block">
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="pb-4 pr-4 text-accent font-semibold align-bottom">Rule</th>
                      <th className="pb-4 pr-4 text-accent font-semibold align-bottom">Relevant duty</th>
                      <th className="pb-4 pr-4 text-accent font-semibold align-bottom">Date / status</th>
                      <th className="pb-4 text-accent font-semibold align-bottom">What Falak does</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {regulations.map((r, i) => (
                      <tr key={i} className="border-b border-gray-800 last:border-0 align-top">
                        <td className="py-4 pr-4 text-ink-900 font-medium w-40">{r.rule}</td>
                        <td className="py-4 pr-4">{r.duty}</td>
                        <td className="py-4 pr-4">{r.status}</td>
                        <td className="py-4 text-ink-900">{r.falak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-4">
              {regulations.map((r, i) => (
                <GlassCard key={i}>
                  <div className="p-5">
                    <h3 className="text-ink-900 font-semibold text-base mb-3">{r.rule}</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">Relevant duty</div>
                        <div className="text-gray-300">{r.duty}</div>
                      </div>
                      <div>
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">Date / status</div>
                        <div className="text-gray-300">{r.status}</div>
                      </div>
                      <div>
                        <div className="text-ink-900/70 text-xs font-semibold uppercase tracking-wide mb-1">What Falak does</div>
                        <div className="text-ink-900">{r.falak}</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              Sources:{" "}
              {[
                ["Freshfields on the Digital Omnibus", "https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/eu-ai-act-unpacked-34-the-final-digital-omnibus-on-ai-key-amendments-to-the-a-102nber"],
                ["Usercentrics", "https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/"],
                ["BSI on art. 50", "https://www.bsigroup.com/en-US/insights-and-media/media-center/press-releases/2026/august/eu-ai-act-article-50-transparency-obligations/"],
                ["art. 14", "https://euaiact.com/article/14"],
                ["art. 86", "https://www.artificialintelligenceact.eu/article/86/"],
                ["A&O Shearman on SCHUFA", "https://www.aoshearman.com/en/insights/ao-shearman-on-data/cjeu-rules-that-a-credit-score-constitutes-automated-decision-making-under-the-gdpr"],
                ["QCB guideline", "https://regulations.ai/regulations/RAI-QA-DO-CBAGXXX-2024"],
                ["CFPB", "https://files.consumerfinance.gov/f/documents/cfpb_chatbot-issue-spotlight_2023-06.pdf"],
                ["Bird & Bird on the EBA mapping", "https://cm.twobirds.com/en/insights/2026/recent-developments-on-the-interplay-between-ai-and-financial-institutions"],
              ].map(([label, href], i, arr) => (
                <React.Fragment key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-900">
                    {label}
                  </a>
                  {i < arr.length - 1 ? " · " : "."}
                </React.Fragment>
              ))}{" "}
              The EBA mapping (Nov 2025) finds no significant conflict between the AI Act and banking law, and lists as high-risk only creditworthiness assessment and credit scoring of natural persons.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <GlassCard>
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-ink-900 mb-4">Try it, or talk about it</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                The demo runs in the browser, in English and Arabic. If you are
                building an assistant where being wrong is expensive, I'd like
                to compare notes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-hover transition-all glow-blue hover:scale-105"
                >
                  <MessageSquare size={18} aria-hidden="true" />
                  Open the demo
                </a>
                <Link
                  href={createPageUrl("ProductWork")}
                  className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all"
                >
                  View All Projects
                </Link>
                <CopyEmailLink className="px-8 py-4 glass rounded-xl text-ink-900 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue transition-all">
                  Let's Talk
                </CopyEmailLink>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {index !== null && (
        <Lightbox
          images={gallery}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setIndex((i) => (i !== null && i < gallery.length - 1 ? i + 1 : i))}
        />
      )}
    </div>
  );
}
