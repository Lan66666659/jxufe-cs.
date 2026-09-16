// Animate UI · MIT · upstream efeb96ffd7a3b7a4868667e4ac3c346620fb3044
'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { Slot, type WithAsChild } from '@/components/animate-ui/primitives/animate/slot';

type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function Button({ hoverScale = 1.05, tapScale = 0.95, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot : motion.button;

  return <Component whileTap={{ scale: tapScale }} whileHover={{ scale: hoverScale }} {...props} />;
}

export { Button, type ButtonProps };
