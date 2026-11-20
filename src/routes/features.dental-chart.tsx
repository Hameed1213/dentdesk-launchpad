import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { PillCard } from "@/components/site/cards";
import {
  BpeScreen,
  ChartScreen,
  ExamScreen,
  FollowUpScreen,
  HistoryScreen,
  XrayScreen,
} from "@/components/site/clinicalScreens";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Dental chart. HOLD: publish only on charting launch day (STATUS-2026-11-20-part2
 * §13.1 item 9). Until then the chart is demo-only (showChartTab / plan_links_demo_only).
 * Claims checked against hub main e1ed624 (20 Nov 2026): UR6 or FDI (16) numbering; adult, mixed,
 * child teeth; five surfaces written MOD; Quick add ("ur6 mod co"); findings on "To follow up",
 * closed with Resolved + "What happened?"; planned work drawn dashed red with a P; nothing deleted
 * (Change / Entered in error with a reason, full history per tooth, responsible clinician and
 * "entered by"); BPE (simplified by age) and BEWE with "BPE due"; examination with extra-oral and
 * 12 soft-tissue areas, optional occlusion, Write up exam -> Save to Notes; X-ray log with
 * justification, Justified by / Taken by, exposure, evaluation, Acceptable / Not acceptable,
 * "Evaluation needed"; chart permission per person; all of it in the practice export.
 * Wording rule (launch wording draft): record, chart, plan; never diagnose, detect, AI.
 * NOT claimed: full perio (pocket) chart, imaging software links, NHS claims, chart print,
 * custom colours, clinical note templates.
 * Photo (Unsplash, free licence): BiknMFl7iOw.
 */

const PATH = "/features/dental-chart";

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Dental chart", to: PATH },
    ],
    title: "A dental chart that",
    highlight: "keeps up with you",
    intro:
      "Chart existing work, findings, BPE, examinations and X-rays as you go, in the same system as your diary, forms and payments.",
    visual: (
      <PhotoPanel
        src="/images/pages/chart-exam.webp"
        alt="Dentist examining a smiling patient's teeth"
        height={933}
        position="object-[40%_40%]"
      >
        <PillCard
          className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="UR6 MOD composite · charted"
        />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Chart as you examine",
      body: "Fillings, crowns, root fillings, bridges and dentures on adult, mixed or child teeth, with five surfaces on every tooth.",
      points: [
        "UR6 or FDI numbering, your choice",
        "Quick add: type ur6 mod co and it's charted",
        "Planned work in red, kept apart from existing work",
      ],
      visual: <ChartScreen />,
    },
    {
      title: "Findings you won't lose",
      body: "Caries, watches, wear and fractures go on a To follow up list, so nothing found at one visit is forgotten at the next.",
      points: [
        "Urgent findings first",
        "Closed with a note of what happened",
        "Shown on the patient's profile",
      ],
      visual: <FollowUpScreen />,
    },
    {
      title: "BPE and BEWE in a few clicks",
      body: "Record a BPE and BEWE on the six-sextant grid, including the simplified BPE for children and teenagers.",
      points: [
        "Furcation and missing sextants",
        "BEWE total worked out",
        "A BPE due reminder on the tab",
      ],
      visual: <BpeScreen />,
    },
    {
      title: "Examinations written up for you",
      body: "Go through extra-oral and soft-tissue areas, then turn the visit's records into a clinical note to check and save.",
      points: [
        "Extra-oral and 12 soft-tissue areas",
        "Size, colour and referral for anything abnormal",
        "Write up exam, then Save to Notes",
      ],
      visual: <ExamScreen />,
    },
    {
      title: "An X-ray log with evaluations",
      body: "Record each X-ray with its justification, who justified and took it, the exposure and what it shows.",
      points: [
        "Bitewings, periapicals, DPTs and more",
        "Image quality graded",
        "Flagged until it's evaluated",
      ],
      visual: <XrayScreen />,
    },
    {
      title: "Nothing is ever deleted",
      body: "Mistakes are corrected, not rubbed out. Every change keeps the old entry, the reason and who made it.",
      points: [
        "Change or Entered in error, with a reason",
        "Full history for each tooth",
        "The responsible clinician on every entry",
      ],
      visual: <HistoryScreen />,
    },
  ],
  others: othersFor(["calendar", "forms", "security"]),
  faq: [
    {
      question: "What can I record on the chart?",
      answer:
        "Existing work (fillings, inlays, crowns, veneers, root fillings, posts, bridges, dentures and implants), tooth status (missing, unerupted, impacted, retained root), and findings such as caries, watches, wear, fractures and mobility. Each entry can have a note.",
    },
    {
      question: "Does it use Palmer or FDI numbering?",
      answer:
        "Both. Teeth show as UR6 by default, and you can switch to FDI (16) in Chart settings.",
    },
    {
      question: "Does DentDock do full perio charting?",
      answer:
        "Not yet. You can record a BPE (including the simplified BPE for under-18s) and a BEWE. A full six-point pocket chart isn't built.",
    },
    {
      question: "Does it connect to our X-ray software?",
      answer:
        "No. DentDock keeps an X-ray log with the justification, who took it, the evaluation and the quality grade, and you can attach the image to the patient's Files. It doesn't connect to imaging software.",
    },
    {
      question: "Who can add to the chart?",
      answer:
        "Owners, dentists and hygienists can by default, and you choose for each person in Settings. Everyone else on the team can read it. Every entry records the responsible clinician, and who typed it if that was someone else.",
    },
    {
      question: "Can a mistake be deleted?",
      answer:
        "No. You change it or mark it as entered in error, with a reason. The old entry stays in the history, crossed out, so the record is complete.",
    },
  ],
};

export const Route = createFileRoute("/features/dental-chart")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental charting software for private practices | DentDock",
      description:
        "Chart existing work and findings, record BPE, BEWE, examinations and an X-ray log, with a full history of every change. Part of DentDock, £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Dental chart", path: PATH },
      ],
      faq: content.faq,
    }),
});
