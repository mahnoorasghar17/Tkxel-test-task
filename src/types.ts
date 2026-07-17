export type AutomationHealth = 'active' | 'paused' | 'no-trigger';

export interface Automation {
  id: string;
  name: string;
  createdDate: string;
  lastTriggered: string | null;
  runCount: number;
  health: AutomationHealth;
}

export type StepKind = 'trigger' | 'send-text' | 'wait-check' | 'create-task';

export interface SequenceStep {
  id: string;
  kind: StepKind;
  title: string;
  detail: string;
  guarded?: boolean;
  terminal?: boolean;
  hasGap?: boolean;
}
