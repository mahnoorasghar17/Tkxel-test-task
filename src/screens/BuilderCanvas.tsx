import React, { useMemo, useState } from 'react';
import { Breadcrumb, Modal, Tooltip } from '../design-system/components';
import { colors } from '../design-system/tokens';
import {
  ArrowLeftIcon,
  MessageIcon,
  ClockIcon,
  TaskIcon,
  StopIcon,
  AlertTriangleIcon,
  LockIcon,
  InfoIcon,
  ZapIcon,
} from '../icons';
import type { Automation, SequenceStep } from '../types';

interface Props {
  automation: Automation;
  onBack: () => void;
}

const baseSteps: SequenceStep[] = [
  {
    id: 'trigger',
    kind: 'trigger',
    title: 'When a new lead submits the website form',
    detail: 'Trigger',
  },
  {
    id: 'send-1',
    kind: 'send-text',
    title: 'Text the lead back',
    detail: '"Thanks for reaching out! We got your request and will call you shortly."',
  },
  {
    id: 'wait-1',
    kind: 'wait-check',
    title: 'Wait 2 days — did they reply?',
    detail: 'If yes: stop here (see banner above). If no: continue below.',
  },
  {
    id: 'send-2',
    kind: 'send-text',
    title: 'Send a follow-up text',
    detail: '"Just checking in — still interested in getting this scheduled?"',
    guarded: true,
  },
  {
    id: 'wait-2',
    kind: 'wait-check',
    title: 'Wait 2 days — did they reply?',
    detail: 'If yes: stop here. If no: continue below.',
  },
  {
    id: 'task-1',
    kind: 'create-task',
    title: 'Create a call task for the team',
    detail: 'Assigned to: whoever is on lead follow-up today',
    terminal: true,
  },
];

function stepIcon(kind: SequenceStep['kind']) {
  switch (kind) {
    case 'trigger':
      return <ZapIcon size={18} color={colors.brand[600]} />;
    case 'send-text':
      return <MessageIcon size={18} color={colors.gray[700]} />;
    case 'create-task':
      return <TaskIcon size={18} color={colors.success[600]} />;
    default:
      return null;
  }
}

const BuilderCanvas: React.FC<Props> = ({ automation, onBack }) => {
  const [bannerExpanded, setBannerExpanded] = useState(false);
  const [dropLastStep, setDropLastStep] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);
  const [replySimulated, setReplySimulated] = useState<Record<string, boolean>>({});

  const steps = useMemo(
    () => (dropLastStep ? baseSteps.filter((s) => s.id !== 'task-1') : baseSteps),
    [dropLastStep]
  );

  const hasDeadEnd = dropLastStep;

  const handlePublish = () => {
    if (hasDeadEnd) {
      setShowBlockedModal(true);
      return;
    }
    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 2400);
  };

  const sampleLeads = [
    { id: 'lead-a', name: 'Marcus D.', atStep: 'wait-1' },
    { id: 'lead-b', name: 'Priya S.', atStep: 'wait-2' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.gray[50] }}>
      {/* Header */}
      <div
        style={{
          padding: '20px 32px 16px',
          background: '#fff',
          borderBottom: `1px solid ${colors.gray[200]}`,
        }}
      >
        <Breadcrumb
          items={[
            { label: 'Automations', onClick: onBack },
            { label: automation.name },
          ]}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: 8,
                border: `1px solid ${colors.gray[200]}`,
                background: '#fff',
                cursor: 'pointer',
              }}
              aria-label="Back to automations"
            >
              <ArrowLeftIcon size={16} color={colors.gray[600]} />
            </button>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.gray[900], margin: 0 }}>
              {automation.name}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setDropLastStep((v) => !v)}
              style={{
                fontSize: 13,
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px dashed ${colors.gray[300]}`,
                background: '#fff',
                color: colors.gray[600],
                cursor: 'pointer',
              }}
              title="Demo control — not part of the product UI"
            >
              {dropLastStep ? 'Restore call-task step' : 'Demo: remove last step'}
            </button>
            <button
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px solid ${colors.gray[300]}`,
                background: '#fff',
                color: colors.gray[700],
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Save draft
            </button>
            <button
              onClick={handlePublish}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: colors.brand[600],
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 24px 64px' }}>
        {/* Stop-guarantee banner */}
        <div
          style={{
            position: 'sticky',
            top: 16,
            zIndex: 5,
            background: colors.brand[50],
            border: `1px solid ${colors.brand[200]}`,
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 20,
            boxShadow: '0 1px 3px rgba(16,24,40,.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StopIcon size={20} color={colors.brand[700]} />
            <span style={{ fontSize: 14, fontWeight: 700, color: colors.brand[800], flex: 1 }}>
              Stops immediately if the lead replies by text
            </span>
            <button
              onClick={() => setBannerExpanded((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: colors.brand[700],
              }}
              aria-label="More detail"
            >
              <InfoIcon size={16} color={colors.brand[700]} />
            </button>
          </div>
          {bannerExpanded && (
            <div style={{ marginTop: 10, paddingLeft: 30, fontSize: 13, color: colors.brand[700], lineHeight: 1.5 }}>
              This applies to every step below — you don't need to add anything for it to work.
              <br />
              A text reply stops everything right away. An email reply can't be detected yet, so
              this guarantee only covers texts for now.
            </div>
          )}
        </div>

        {/* Sequence */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          {steps.map((step, i) => {
            const isConnectorAbove = i > 0;
            const isWait = step.kind === 'wait-check';

            return (
              <React.Fragment key={step.id}>
                {isConnectorAbove && (
                  <div
                    style={{
                      width: 2,
                      height: 20,
                      background: colors.gray[300],
                      marginLeft: 27,
                    }}
                  />
                )}

                {isWait ? (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      marginLeft: 8,
                      background: colors.gray[100],
                      border: `1px solid ${colors.gray[200]}`,
                      borderRadius: 9999,
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <ClockIcon size={16} color={colors.gray[500]} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: colors.gray[700] }}>
                      {step.title}
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      background: '#fff',
                      border: `1px solid ${step.kind === 'trigger' ? colors.brand[200] : colors.gray[200]}`,
                      borderRadius: step.terminal ? '16px 16px 24px 24px' : 16,
                      boxShadow: '0 1px 3px rgba(16,24,40,.08)',
                      padding: 16,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background:
                            step.kind === 'trigger'
                              ? colors.brand[50]
                              : step.kind === 'create-task'
                              ? colors.success[50]
                              : colors.gray[100],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {stepIcon(step.kind)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: colors.gray[500], textTransform: 'uppercase', letterSpacing: 0.3 }}>
                            {step.kind === 'trigger' ? 'When this happens' : step.kind === 'create-task' ? 'Then do this · ends the sequence' : 'Then do this'}
                          </span>
                          {step.guarded && (
                            <Tooltip
                              content="Can't be sent without checking for a reply first"
                              placement="top"
                              theme="dark"
                            >
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: colors.brand[700],
                                  background: colors.brand[50],
                                  border: `1px solid ${colors.brand[200]}`,
                                  borderRadius: 9999,
                                  padding: '2px 8px',
                                }}
                              >
                                <LockIcon size={11} color={colors.brand[700]} />
                                Guarded by stop-rule
                              </span>
                            </Tooltip>
                          )}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: colors.gray[900], marginTop: 4 }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: 13, color: colors.gray[500], marginTop: 2 }}>
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {hasDeadEnd && (
            <>
              <div style={{ width: 2, height: 20, background: colors.error[300], marginLeft: 27 }} />
              <div
                style={{
                  border: `1.5px dashed ${colors.error[300]}`,
                  borderRadius: 16,
                  padding: 16,
                  background: colors.error[25],
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <AlertTriangleIcon size={18} color={colors.error[600]} />
                <span style={{ fontSize: 13, color: colors.error[700] }}>
                  This path doesn't end anywhere — add a step or it will never resolve.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Reply simulation */}
        <div
          style={{
            marginTop: 40,
            background: '#fff',
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray[900], marginBottom: 4 }}>
            See the stop guarantee in action
          </div>
          <div style={{ fontSize: 13, color: colors.gray[500], marginBottom: 16 }}>
            These are leads currently partway through this sequence. Simulate a reply to see what happens.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sampleLeads.map((lead) => {
              const stopped = replySimulated[lead.id];
              const stepIndex = steps.findIndex((s) => s.id === lead.atStep);
              return (
                <div
                  key={lead.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: stopped ? colors.success[25] : colors.gray[50],
                    border: `1px solid ${stopped ? colors.success[200] : colors.gray[200]}`,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray[800] }}>{lead.name}</div>
                    <div style={{ fontSize: 12, color: colors.gray[500] }}>
                      {stopped
                        ? `Replied — sequence stopped before "${steps[stepIndex + 1]?.title ?? 'next step'}"`
                        : `Currently at: ${steps[stepIndex]?.title ?? '—'}`}
                    </div>
                  </div>
                  <button
                    disabled={stopped}
                    onClick={() => setReplySimulated((prev) => ({ ...prev, [lead.id]: true }))}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: `1px solid ${stopped ? colors.success[300] : colors.gray[300]}`,
                      background: stopped ? colors.success[50] : '#fff',
                      color: stopped ? colors.success[700] : colors.gray[700],
                      cursor: stopped ? 'default' : 'pointer',
                    }}
                  >
                    {stopped ? 'Stopped ✓' : 'Simulate reply'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guardrail A modal */}
      <Modal
        open={showBlockedModal}
        onClose={() => setShowBlockedModal(false)}
        size="sm"
        title="Can't publish yet"
        description="This sequence has a path that doesn't end anywhere — it would run and then go silent."
        iconVariant="error"
        footer={
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button
              onClick={() => setShowBlockedModal(false)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px solid ${colors.gray[300]}`,
                background: '#fff',
                color: colors.gray[700],
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
            <button
              onClick={() => {
                setDropLastStep(false);
                setShowBlockedModal(false);
              }}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: colors.brand[600],
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Take me there
            </button>
          </div>
        }
      />

      {publishedToast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: colors.success[600],
            color: '#fff',
            padding: '12px 20px',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            boxShadow: '0 12px 16px -4px rgba(16,24,40,.18)',
          }}
        >
          Published — every path ends somewhere, and replies stop it.
        </div>
      )}
    </div>
  );
};

export default BuilderCanvas;
