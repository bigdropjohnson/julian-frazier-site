import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-drums.jpg";
import studio from "@/assets/studio.jpg";
import live from "@/assets/live.jpg";
import lesson from "@/assets/lesson.jpg";
import portrait from "@/assets/portrait.jpg";
import sticks from "@/assets/sticks.jpg";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "Drummer & Producer",
      "Julian Frazier — drummer, producer and teacher. Music, photos, press, lessons and bio.",
    ),
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Cover story */}
      <section className="mx-auto max-w-7xl px-5 pt-8 md:px-10 md:pt-12">
        <div className="grain relative overflow-hidden shadow-elegant">
          <img
            src={hero}
            alt="Julian Frazier seated behind a vintage drum kit"
            className="h-[70vh] min-h-[460px] w-full object-cover object-[60%_30%]"
            width={1536}
            height={1024}
          />
          <div className="bg-hero-fade absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
            <p className="eyebrow animate-rise">Issue No. 01 — The Pocket</p>
            <h1 className="animate-rise mt-4 max-w-4xl text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
              Julian <em className="text-copper-gradient">Frazier</em>
            </h1>
            <p className="animate-rise mt-5 max-w-lg text-lg text-foreground/85">
              Drummer. Producer. Teacher. Building grooves that sit deep and records that breathe.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial grid */}
      <section className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 md:grid-cols-12 md:px-10">
        <FeatureCard
          to="/music"
          img={studio}
          eyebrow="Music"
          title="Behind the kit & the console"
          text="Recent releases, session credits and productions."
          className="md:col-span-7"
          imgClass="aspect-[4/3]"
          big
        />
        <div className="flex flex-col gap-10 md:col-span-5">
          <FeatureCard
            to="/lessons"
            img={lesson}
            eyebrow="Lessons"
            title="Learn to play with feel"
            text="Private drum and production lessons for every level."
            imgClass="aspect-[16/10]"
          />
          <FeatureCard
            to="/press"
            img={live}
            eyebrow="Press"
            title="In the news"
            text="Reviews, features and the press kit."
            imgClass="aspect-[16/10]"
          />
        </div>
      </section>

      {/* Pull quote */}
      <section className="mx-auto mt-24 max-w-5xl px-5 text-center md:px-10">
        <p className="eyebrow">Philosophy</p>
        <blockquote className="mt-6 font-display text-3xl leading-tight md:text-5xl">
          “The groove isn't what you play — it's the space you leave for everyone else.”
        </blockquote>
        <p className="mt-6 text-sm uppercase tracking-[0.25em] text-muted-foreground">
          — Julian Frazier
        </p>
      </section>

      {/* Bottom row */}
      <section className="mx-auto mt-24 grid max-w-7xl gap-10 px-5 md:grid-cols-12 md:px-10">
        <FeatureCard
          to="/bio"
          img={portrait}
          eyebrow="Bio"
          title="The story so far"
          text="From church pews to studio sessions."
          className="md:col-span-4"
          imgClass="aspect-[3/4]"
        />
        <FeatureCard
          to="/photos"
          img={sticks}
          eyebrow="Photos"
          title="On stage, in the studio"
          text="A visual archive of shows, sessions and details."
          className="md:col-span-8"
          imgClass="aspect-[3/4] md:aspect-[16/12]"
          big
        />
      </section>
    </>
  );
}

function FeatureCard({
  to,
  img,
  eyebrow,
  title,
  text,
  className = "",
  imgClass = "",
  big = false,
}: {
  to: "/music" | "/photos" | "/lessons" | "/press" | "/bio";
  img: string;
  eyebrow: string;
  title: string;
  text: string;
  className?: string;
  imgClass?: string;
  big?: boolean;
}) {
  return (
    <Link to={to} className={`group block ${className}`}>
      <div className="overflow-hidden">
        <img
          src={img}
          alt=""
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${imgClass}`}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4 border-t border-border pt-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className={`mt-2 leading-tight ${big ? "text-4xl md:text-5xl" : "text-3xl"}`}>
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{text}</p>
        </div>
        <ArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </Link>
  );
}
