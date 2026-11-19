import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import teachingClinic from "@/assets/julian-teaching-clinic.jpg.asset.json";
import ensembleRehearsal from "@/assets/julian-ensemble-rehearsal.jpg.asset.json";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: pageMeta(
      "Lessons",
      "Private drum and music production lessons with Julian Frazier, for beginners through advanced players.",
    ),
  }),
  component: LessonsPage,
});

const OFFERINGS = [
  {
    n: "I",
    title: "Drums — Foundations",
    who: "Beginners & kids 8+",
    points: ["Grip, posture & technique", "Reading rhythms", "Your first grooves & fills"],
  },
  {
    n: "II",
    title: "Drums — Groove & Feel",
    who: "Intermediate to advanced",
    points: ["Pocket, time & dynamics", "Gospel, funk, hip-hop & jazz styles", "Playing with a band"],
  },
  {
    n: "III",
    title: "Music Production",
    who: "Beatmakers & artists",
    points: ["Beat making & sampling", "Recording drums at home", "Mixing fundamentals"],
  },
];

const STEPS = [
  { n: "01", title: "Reach out", text: "Tell me your level, goals and schedule." },
  { n: "02", title: "First session", text: "We'll find where you are and set a plan." },
  { n: "03", title: "Play", text: "Weekly lessons, in person or online." },
];

function LessonsPage() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=Lesson%20inquiry`;
  return (
    <>
      <PageHeader
        number="04"
        eyebrow="Lessons"
        title={
          <>
            Learn to play <em className="text-primary">with feel</em>
          </>
        }
        intro="Private drum and production lessons — in person or online — built around the music you love."
      />

      <section className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 md:px-10">
        <div className="grain overflow-hidden shadow-elegant">
          <img
            src={teachingClinic.url}
            alt="Julian Frazier demonstrating on a snare drum while two students watch"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
        <div className="grain overflow-hidden shadow-elegant">
          <img
            src={ensembleRehearsal.url}
            alt="Julian Frazier playing with a group of young musicians"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-10">
        {OFFERINGS.map((o) => (
          <article key={o.title} className="flex flex-col bg-card p-8">
            <span className="font-display text-5xl text-primary">{o.n}</span>
            <h2 className="mt-6 text-3xl">{o.title}</h2>
            <p className="eyebrow mt-2">{o.who}</p>
            <ul className="mt-6 space-y-3">
              {o.points.map((p) => (
                <li key={p} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-5xl leading-tight">Ready when you are.</h2>
          <p className="mt-4 text-muted-foreground">
            Send a note with what you'd like to learn and I'll reply with availability and rates.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href={mailto}>Book a lesson</a>
          </Button>
        </div>
        <ol className="grid gap-8 md:col-span-7">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-6 border-t border-border pt-6">
              <span className="font-display text-4xl text-sienna">{s.n}</span>
              <div>
                <h3 className="text-2xl">{s.title}</h3>
                <p className="mt-1 text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
