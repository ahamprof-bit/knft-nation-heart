import { Image as ImageIcon, Play, FileText, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Base = { className?: string; label?: string };

/**
 * Placeholder primitives.
 * Every media slot on the site goes through one of these. When the client
 * supplies real media, pass `src` and the placeholder disappears.
 */

export function ImagePlaceholder({
  className,
  label = "IMAGE PLACEHOLDER",
  src,
  alt,
  ratio = "aspect-[4/3]",
}: Base & { src?: string; alt?: string; ratio?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full rounded-xl object-cover", ratio, className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "placeholder-surface flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-border/70 text-center",
        ratio,
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 text-primary/60" aria-hidden />
      <span className="px-3 text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
        [ {label} ]
      </span>
    </div>
  );
}

export function VideoPlaceholder({
  className,
  label = "VIDEO PLACEHOLDER",
  url,
  poster,
  ratio = "aspect-video",
}: Base & { url?: string; poster?: string; ratio?: string }) {
  if (url) {
    return (
      <video
        controls
        preload="none"
        poster={poster || undefined}
        className={cn("w-full rounded-xl bg-charcoal", ratio, className)}
      >
        <source src={url} />
      </video>
    );
  }
  return (
    <div
      className={cn(
        "placeholder-surface group relative flex w-full items-center justify-center rounded-xl border border-border/70",
        ratio,
        className,
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform group-hover:scale-105">
        <Play className="h-6 w-6" aria-hidden />
      </span>
      <span className="absolute bottom-3 text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
        [ {label} ]
      </span>
    </div>
  );
}

export function LogoPlaceholder({
  className,
  label = "LOGO",
  src,
}: Base & { src?: string }) {
  if (src) {
    return <img src={src} alt={label} loading="lazy" className={cn("h-14 object-contain", className)} />;
  }
  return (
    <div
      className={cn(
        "flex h-24 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-offwhite text-muted-foreground",
        className,
      )}
    >
      <Building2 className="h-5 w-5 text-primary/50" aria-hidden />
      <span className="text-[11px] font-semibold tracking-widest uppercase">[ {label} ]</span>
    </div>
  );
}

export function AvatarPlaceholder({
  className,
  label = "PORTRAIT PLACEHOLDER",
  src,
}: Base & { src?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        loading="lazy"
        className={cn("h-24 w-24 rounded-full object-cover", className)}
      />
    );
  }
  return (
    <div
      aria-label={label}
      className={cn(
        "flex h-24 w-24 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground",
        className,
      )}
    >
      <User className="h-9 w-9 opacity-60" aria-hidden />
    </div>
  );
}

export function DocumentPlaceholder({ className, label = "DOCUMENT" }: Base) {
  return (
    <div
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-primary",
        className,
      )}
      aria-label={label}
    >
      <FileText className="h-7 w-7" aria-hidden />
    </div>
  );
}
