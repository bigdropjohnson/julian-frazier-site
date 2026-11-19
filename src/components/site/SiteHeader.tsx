import { Link } from "@tanstack/react-router";
import { NAV_ITEMS, SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10">
        <Link to="/" className="font-display text-2xl leading-none text-foreground">
          {SITE_NAME}
          <span className="text-primary">.</span>
        </Link>
        <nav className="-mx-1 flex gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap px-2 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] md:px-3 md:text-xs md:tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary hover:text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
