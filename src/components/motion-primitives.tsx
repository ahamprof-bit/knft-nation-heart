import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  // Reduced motion: render content immediately, no movement or fade.
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

/**
 * Animated number.
 *
 * The REAL value is rendered from the start (server render, no-JS,
 * screenshots, search engines and reduced-motion users all see it).
 * The count-up only plays in the browser, once, when scrolled into view.
 * It never shows a placeholder "0".
 */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const finalText = `${format(value)}${suffix}`;

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${format(v)}${suffix}`;
      },
      onComplete: () => {
        node.textContent = finalText;
      },
    });

    return () => {
      controls.stop();
      node.textContent = finalText;
    };
  }, [inView, reduceMotion, value, suffix, finalText]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {finalText}
    </span>
  );
}