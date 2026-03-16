/* eslint-disable import/no-extraneous-dependencies */
"use client";

import type React from "react";
import { motion } from "framer-motion";

interface FadeInOnScrollProps {
  /** Content to reveal. */
  children: React.ReactNode;
  /** Additional Tailwind classes applied to the motion wrapper. */
  className?: string;
  /** Delay in ms before starting the animation. */
  delay?: number;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function FadeInOnScroll({
  children,
  className,
  delay = 0,
}: FadeInOnScrollProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

export const fadeUp = fadeUpVariants;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
