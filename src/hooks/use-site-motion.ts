import { createContext, useContext } from 'react';

export const SiteMotionContext = createContext({
  paused: false,
  reduced: false,
  toggle: () => {},
});

export function useSiteMotion() {
  return useContext(SiteMotionContext);
}
