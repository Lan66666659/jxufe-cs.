import { Link, type LinkProps } from 'react-router-dom';
import { useSiteMotion } from '../hooks/use-site-motion';
import { Fade } from './animate-ui/primitives/effects/fade';
import { Tilt, TiltContent } from './animate-ui/primitives/effects/tilt';
import { RippleButton, RippleButtonRipples } from './animate-ui/primitives/buttons/ripple';
import type { ComponentProps, ReactNode } from 'react';

export function ActionLink({ children, className = '', ...props }: LinkProps) {
  const { reduced } = useSiteMotion();
  return (
    <RippleButton asChild hoverScale={reduced ? 1 : 1.015} tapScale={reduced ? 1 : 0.98}>
      <Link className={`button ${className}`} {...props}>
        {children}
        {!reduced && <RippleButtonRipples color="currentColor" />}
      </Link>
    </RippleButton>
  );
}

export function ActionButton({
  children,
  ...props
}: Omit<ComponentProps<typeof RippleButton>, 'children' | 'asChild'> & { children: ReactNode }) {
  const { reduced } = useSiteMotion();
  return (
    <RippleButton
      type="button"
      hoverScale={reduced ? 1 : 1.015}
      tapScale={reduced ? 1 : 0.98}
      {...props}
    >
      {children}
      {!reduced && <RippleButtonRipples color="currentColor" />}
    </RippleButton>
  );
}

export function SoftReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { reduced } = useSiteMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <Fade
      inView
      inViewOnce
      initialOpacity={0.2}
      className={className}
      delay={delay * 1000}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Fade>
  );
}

export function PhotoTilt({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const { reduced } = useSiteMotion();
  return (
    <Tilt maxTilt={reduced ? 0 : 4} className={className}>
      <TiltContent className="h-full">{children}</TiltContent>
    </Tilt>
  );
}
