import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  intro,
  number,
}: {
  eyebrow: string;
  title?: ReactNode;
  intro?: ReactNode;
  number?: string;
}) {
  const compact = !title;

  return (
    <section
      className={cn(
        "mx-auto max-w-7xl px-5 md:px-10",
        compact ? "pt-10 pb-6 md:pt-14 md:pb-8" : "pt-16 pb-12 md:pt-24",
      )}
    >
      <div className={cn("flex items-end justify-between gap-6 border-b border-border", compact ? "pb-6" : "pb-10")}>
        <div className="animate-rise max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          {title && <h1 className="mt-4 text-5xl leading-[0.95] md:text-7xl lg:text-8xl">{title}</h1>}
          {intro && (
            <p className={cn("max-w-xl text-lg leading-relaxed text-muted-foreground", title ? "mt-6" : "mt-3")}>
              {intro}
            </p>
          )}
        </div>
        {number && !compact && (
          <span className="hidden font-display text-[9rem] leading-none text-muted md:block">{number}</span>
        )}
      </div>
    </section>
  );
}
