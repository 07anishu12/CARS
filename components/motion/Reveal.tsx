'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { transitionSlow } from '../../lib/motion/tokens';

export interface RevealProps {
  children: React.ReactNode;
}

export const Reveal: React.FC<RevealProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionSlow
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
