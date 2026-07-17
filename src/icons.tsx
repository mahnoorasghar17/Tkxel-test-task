import React from 'react';

type IconProps = { size?: number; color?: string; style?: React.CSSProperties };

const base = (size = 20, color = 'currentColor') => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: color,
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const PlusIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><path d="M12 5v14M5 12h14" /></svg>
);

export const MessageIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
);

export const TaskIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 12l2 2 4-4" /></svg>
);

export const StopIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><circle cx="12" cy="12" r="9" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><path d="M6 9l6 6 6-6" /></svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><path d="M9 6l6 6-6 6" /></svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
);

export const LockIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
);

export const ZapIcon: React.FC<IconProps> = ({ size, color, style }) => (
  <svg {...base(size, color)} style={style}><path d="M13 2 3 14h8l-1 8 10-12h-8z" /></svg>
);
