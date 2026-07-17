import type { Automation } from '../types';

export const mockAutomations: Automation[] = [
  {
    id: 'auto-1',
    name: 'New lead follow-up (HVAC)',
    createdDate: '2026-06-02',
    lastTriggered: '2026-07-16',
    runCount: 214,
    health: 'active',
  },
  {
    id: 'auto-2',
    name: 'Quote sent — 3 day nudge',
    createdDate: '2026-05-11',
    lastTriggered: '2026-07-10',
    runCount: 58,
    health: 'active',
  },
  {
    id: 'auto-3',
    name: 'Missed appointment text',
    createdDate: '2026-04-22',
    lastTriggered: null,
    runCount: 0,
    health: 'no-trigger',
  },
  {
    id: 'auto-4',
    name: 'Seasonal maintenance reminder',
    createdDate: '2026-03-14',
    lastTriggered: '2026-06-01',
    runCount: 41,
    health: 'paused',
  },
  {
    id: 'auto-5',
    name: 'Review request after job close',
    createdDate: '2026-02-27',
    lastTriggered: '2026-07-15',
    runCount: 130,
    health: 'active',
  },
  {
    id: 'auto-6',
    name: 'Old promo blast (unused)',
    createdDate: '2025-11-09',
    lastTriggered: null,
    runCount: 0,
    health: 'no-trigger',
  },
];
