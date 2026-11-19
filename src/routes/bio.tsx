import { createFileRoute } from "@tanstack/react-router";
import arkansasPerformance from "@/assets/julian-frazier-arkansas.jpg.asset.json";
import { PageHeader } from "@/components/site/PageHeader";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/bio")({
  head: () => ({
    meta: pageMeta(
      "Bio",
      "Julian Frazier — professional drummer, Berklee College of Music junior, YoungArts Honorable Mention and teacher.",
    ),
  }),
  component: BioPage,
});

const FACTS = [
  { label: "Studying", value: "Berklee College of Music · Junior" },
  { label: "Teaching", value: "4 years & counting" },
  { label: "Recognition", value: "2023 YoungArts Honorable Mention" },
];

const PLAYED_WITH = [
  "Button Masher",
  "MonoNeon",
  "Sean Jones",
  "Tia Fuller",
  "Brandon Woody",
  "Vicente Archer",
  "Terell Stafford",
  "Brent Birckhead",
  "Don Braden",
];

function BioPage() {
  return (
    <>
      <PageHeader
        number="05"
        eyebrow="Bio"
        title={
          <>
            The story <em className="text-primary">so far</em>
          </>
        }
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="grain overflow-hidden shadow-elegant md:sticky md:top-28">
            <img
              src={arkansasPerformance.url}
              alt="Julian Frazier playing drums on stage in Arkansas"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>

        <article className="md:col-span-7">
          <p className="font-display text-3xl leading-snug md:text-4xl">
            <span className="float-left mr-3 font-display text-8xl leading-[0.8] text-primary">J</span>
            ulian is a professional drummer and musician, now studying as a Junior at Berklee College of
            Music. He has been playing drums since the young age of 1 and has loved it ever since.
          </p>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Julian was fortunate enough to be the 2023 YoungArts Honorable Mention. He was also selected
              to be a part of the 2023 and 2024 Herbie Hancock Institute of Jazz Peer to Peer group, going
              on tour with Don Braden and Lisa Henry and playing in Arkansas. He was the first junior
              drummer to ever be selected for the tour.
            </p>
            <p>
              He has been fortunate enough to play with Grammy award winning musicians — Button Masher,
              MonoNeon, Sean Jones, Tia Fuller, Brandon Woody, Vicente Archer, Terell Stafford, Brent
              Birckhead, Don Braden, and more.
            </p>
            <p>
              He has been teaching kids for 4 years and loves teaching and finding out new and interesting
              ways to keep his students engaged.
            </p>
            <p>
              In his free time Julian enjoys practicing other instruments, as well as playing basketball,
              running, working out, hanging out with friends, and watching tv.
            </p>
          </div>

          <dl className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-2 font-display text-xl">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 border-t border-border pt-8">
            <p className="eyebrow">On stage with</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {PLAYED_WITH.map((name) => (
                <li key={name} className="font-display text-xl">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}
