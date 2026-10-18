import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Seamless, hover-pausable marquee. Content is duplicated for a gapless loop. */
export function Marquee({
  items,
  className,
  itemClassName,
  duration = 34,
}: {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  duration?: number;
}) {
  const renderGroup = (key: string, hidden = false) => (
    <ul
      key={key}
      aria-hidden={hidden || undefined}
      className={cn("flex shrink-0 items-center", itemClassName)}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <span className="px-5">{item}</span>
          <span className="h-1 w-1 rounded-full bg-accent/50" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee-mask", className)}>
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        {renderGroup("a")}
        {renderGroup("b", true)}
      </div>
    </div>
  );
}
