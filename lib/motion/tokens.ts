/**
 * Premium Motion Tokens for Kerb
 */

export const DURATIONS = {
  FAST: 0.12, // 120ms - micro-interactions, button presses
  BASE: 0.20, // 200ms - standard navigations, accordions, hovers
  SLOW: 0.40  // 400ms - large page sections scroll reveals
} as const;

export const EASING = [0.2, 0.8, 0.2, 1] as const; // cubic-bezier(.2, .8, .2, 1)
export const EASING_CSS = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

// Reusable Framer Motion transitions
export const transitionBase = {
  duration: DURATIONS.BASE,
  ease: EASING
} as const;

export const transitionSlow = {
  duration: DURATIONS.SLOW,
  ease: EASING
} as const;

export const springHeart = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 15,
  mass: 0.8
} as const;
