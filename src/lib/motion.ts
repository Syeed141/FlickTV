export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const pageEnter = {
  duration: 0.55,
  ease: smoothEase,
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};
