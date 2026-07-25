"use client";

import type {PropsWithChildren} from "react";
import {motion, useReducedMotion} from "motion/react";

export function HeroCaptionReveal({children}: PropsWithChildren) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-caption-reveal"
      initial={prefersReducedMotion ? {opacity: 1, y: 0} : {opacity: 1, y: 18}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: prefersReducedMotion ? 0 : 0.58, delay: prefersReducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1]}}
    >
      {children}
    </motion.div>
  );
}
