import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import fullKitPerformance from "@/assets/julian-frazier-drumming.jpg.asset.json";
import closeUpPerformance from "@/assets/julian-frazier-close-up.jpg.asset.json";
import arkansasPerformance from "@/assets/julian-frazier-arkansas.jpg.asset.json";
import churchSet from "@/assets/julian-church-set.jpg.asset.json";
import liveSmile from "@/assets/julian-live-smile.webp.asset.json";
import warmLights from "@/assets/julian-warm-lights.webp.asset.json";
import blueWash from "@/assets/julian-blue-wash.webp.asset.json";
import fullTilt from "@/assets/julian-full-tilt.jpg.asset.json";
import closePlay from "@/assets/julian-close-play.jpg.asset.json";
import rehearsalRoom from "@/assets/julian-rehearsal-room.jpg.asset.json";
import teachingClinic from "@/assets/julian-teaching-clinic.jpg.asset.json";
import ensembleRehearsal from "@/assets/julian-ensemble-rehearsal.jpg.asset.json";
import { PageHeader } from "@/components/site/PageHeader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: pageMeta(
      "Photos",
      "Live shows, studio sessions, rehearsals and teaching moments of drummer and producer Julian Frazier.",
    ),
  }),
  component: PhotosPage,
});

const PHOTOS = [
  {
    src: fullKitPerformance.url,
    alt: "Julian Frazier smiling behind his drum kit on stage",
    caption: "On stage",
  },
  {
    src: churchSet.url,
    alt: "Julian Frazier playing drums in black and white, wearing headphones",
    caption: "Church set",
  },
  {
    src: liveSmile.url,
    alt: "Julian Frazier smiling mid-song with a drumstick raised",
    caption: "Mid-song",
  },
  {
    src: fullTilt.url,
    alt: "Julian Frazier leaning into a fill, in black and white",
    caption: "Full tilt",
  },
  {
    src: arkansasPerformance.url,
    alt: "Julian Frazier performing with a band in Arkansas",
    caption: "Playing in Arkansas",
  },
  {
    src: warmLights.url,
    alt: "Julian Frazier drumming in warm amber stage light, seen from the side",
    caption: "Warm lights",
  },
  {
    src: rehearsalRoom.url,
    alt: "Julian Frazier seated at his kit in a rehearsal room, holding a stick upright",
    caption: "Rehearsal room",
  },
  {
    src: closePlay.url,
    alt: "Close-up of Julian Frazier playing in a teal jacket under warm light",
    caption: "In the pocket",
  },
  {
    src: blueWash.url,
    alt: "Julian Frazier playing under blue and purple stage wash",
    caption: "Blue wash",
  },
  {
    src: teachingClinic.url,
    alt: "Julian Frazier demonstrating on a snare drum while two students watch",
    caption: "Teaching",
  },
  {
    src: ensembleRehearsal.url,
    alt: "Julian Frazier playing with a group of young musicians",
    caption: "With the band",
  },
  {
    src: closeUpPerformance.url,
    alt: "Close-up of Julian Frazier playing drums",
    caption: "At the kit",
  },
];

function PhotosPage() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open !== null ? PHOTOS[open] : null;

  return (
    <>
      <PageHeader
        eyebrow="Photos"
        intro="Moments from the stage, the rehearsal room and the classroom. Tap any photo to enlarge."
      />

      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden text-left"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </section>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl border-border bg-background p-2">
          <DialogTitle className="sr-only">{active?.caption ?? "Photo"}</DialogTitle>
          {active && (
            <img src={active.src} alt={active.alt} className="max-h-[85vh] w-full object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
