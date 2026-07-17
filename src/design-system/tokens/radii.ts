// Untitled UI PRO v4.0 — Border Radius Tokens
// Source: Figma file LI5N9OVI1Q0ycL1YfjeWay

export const radii = {
  none: '0px',
  xxs: '2px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '20px',
  '4xl': '24px',
  full: '9999px',
} as const;

export type RadiusKey = keyof typeof radii;
