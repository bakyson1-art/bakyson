"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function PageTransition({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={pageVariants.initial}
        animate={pageVariants.enter}
        exit={pageVariants.exit}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
