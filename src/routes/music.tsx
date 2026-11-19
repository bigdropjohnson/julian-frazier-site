import { createFileRoute } from "@tanstack/react-router";
import { Disc3, Play } from "lucide-react";
import studio from "@/assets/studio.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: pageMeta(
      "Music",
      "Releases, productions and session credits from drummer and producer Julian Frazier.",
    ),
  }),
  component: MusicPage,
});

const RELEASES = [
  { title: "Low Light", type: "EP", year: "2026", role: "Artist · Drums · Production" },
  { title: "Copper Hours", type: "Single", year: "2025", role: "Artist · Drums · Production" },
  { title: "Sunday Service Sessions", type: "Live album", year: "2024", role: "Drums" },
  { title: "Brick & Mortar", type: "LP", year: "2023", role: "Producer" },
];

const TRACKS = [
  { n: "01", title: "Low Light", time: "3:42" },
  { n: "02", title: "Pocket Watch", time: "4:10" },
  { n: "03", title: "Ember (Interlude)", time: "1:28" },
  { n: "04", title: "Ghost Notes", time: "3:56" },
  { n: "05", title: "After Hours", time: "5:03" },
];

function MusicPage() {
  return (
    <>
      <PageHeader
        number="01"
        eyebrow="Music"
        title={
          <>
            Records, sessions <em className="text-primary">& sounds</em>
          </>
        }
        intro="Original releases, productions for other artists, and drum sessions from the studio and the stage."
      />

      {/* Featured release */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-10">
        <div className="grain overflow-hidden shadow-elegant">
          <img
            src={studio}
            alt="Julian's recording studio"
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">Latest release</p>
          <h2 className="mt-3 text-5xl md:text-6xl">Low Light</h2>
          <p className="mt-2 text-muted-foreground">EP · 2026 · Written, played & produced by Julian Frazier</p>
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {TRACKS.map((t) => (
              <li key={t.n} className="group flex items-center gap-5 py-4">
                <span className="w-6 font-display text-lg text-muted-foreground">{t.n}</span>
                <Play className="h-4 w-4 text-primary opacity-60 transition-opacity group-hover:opacity-100" />
                <span className="flex-1 text-lg">{t.title}</span>
                <span className="text-sm tabular-nums text-muted-foreground">{t.time}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Discography */}
      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-10">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <h2 className="text-4xl">Discography</h2>
          <p className="eyebrow">Selected works</p>
        </div>
        <ul className="divide-y divide-border">
          {RELEASES.map((r) => (
            <li
              key={r.title}
              className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-1 py-6 md:grid-cols-[auto_2fr_1fr_1fr_auto]"
            >
              <Disc3 className="row-span-2 h-8 w-8 text-sienna md:row-span-1" />
              <span className="font-display text-2xl md:text-3xl">{r.title}</span>
              <span className="text-sm text-muted-foreground md:text-base">{r.type}</span>
              <span className="hidden text-muted-foreground md:block">{r.role}</span>
              <span className="hidden font-display text-2xl text-primary md:block">{r.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
