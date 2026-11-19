import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail } from "lucide-react";
import live from "@/assets/live.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: pageMeta(
      "Press",
      "Reviews, features, interviews and the press kit for drummer and producer Julian Frazier.",
    ),
  }),
  component: PressPage,
});

const QUOTES = [
  {
    quote: "Frazier plays like he's having a conversation — every fill answers a question.",
    source: "Groove Quarterly",
  },
  {
    quote: "A producer with a drummer's instincts: everything on Low Light sits exactly where it should.",
    source: "The Listening Room",
  },
  {
    quote: "Warm, patient, and impossibly deep in the pocket.",
    source: "City Sound Weekly",
  },
];

const FEATURES = [
  { date: "Oct 2026", outlet: "Groove Quarterly", title: "Inside the Low Light sessions" },
  { date: "Jun 2026", outlet: "Studio Notes Podcast", title: "Episode 42: Drummers who produce" },
  { date: "Feb 2025", outlet: "The Listening Room", title: "Copper Hours — single review" },
  { date: "Sep 2024", outlet: "City Sound Weekly", title: "Five local drummers to watch" },
];

function PressPage() {
  return (
    <>
      <PageHeader
        number="03"
        eyebrow="Press"
        title={
          <>
            What they're <em className="text-primary">saying</em>
          </>
        }
        intro="Reviews, interviews and features. Media can download the press kit or reach out directly."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-3 md:px-10">
        {QUOTES.map((q) => (
          <figure key={q.source} className="border-t-2 border-primary pt-6">
            <blockquote className="font-display text-2xl leading-snug md:text-3xl">“{q.quote}”</blockquote>
            <figcaption className="eyebrow mt-5">{q.source}</figcaption>
          </figure>
        ))}
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <div className="flex items-end justify-between border-b border-border pb-4">
            <h2 className="text-4xl">Features & interviews</h2>
          </div>
          <ul className="divide-y divide-border">
            {FEATURES.map((f) => (
              <li key={f.title} className="grid gap-1 py-6 md:grid-cols-[8rem_1fr]">
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{f.date}</span>
                <div>
                  <p className="eyebrow">{f.outlet}</p>
                  <p className="mt-1 font-display text-2xl">{f.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="md:col-span-5">
          <div className="bg-card p-8 shadow-elegant">
            <img src={live} alt="Julian performing live" className="aspect-[4/3] w-full object-cover" />
            <h3 className="mt-6 text-3xl">Press kit</h3>
            <p className="mt-2 text-muted-foreground">
              Hi-res photos, short and long bios, logos and tech rider — everything you need for coverage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${CONTACT_EMAIL}?subject=Press%20kit%20request`}>
                  <Download /> Request press kit
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${CONTACT_EMAIL}?subject=Press%20inquiry`}>
                  <Mail /> Press inquiry
                </a>
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
