import React, { useState } from 'react';
import { PageHeader, Table, Badge, Input, Toggle } from '../design-system/components';
import type { TableColumn } from '../design-system/components/Table';
import type { Automation } from '../types';
import { PlusIcon, AlertTriangleIcon } from '../icons';
import { colors } from '../design-system/tokens';

interface Props {
  automations: Automation[];
  onOpen: (id: string) => void;
  onToggleActive: (id: string) => void;
}

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const AutomationsList: React.FC<Props> = ({ automations, onOpen, onToggleActive }) => {
  const [query, setQuery] = useState('');

  const filtered = automations.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const columns: TableColumn<Automation>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (_v, row) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.gray[900] }}>{row.name}</span>
          {row.health === 'no-trigger' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: colors.warning[700] }}>
              <AlertTriangleIcon size={12} color={colors.warning[600]} />
              Won't run — no trigger set
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (_v, row) => {
        if (row.health === 'no-trigger') {
          return <Badge label="Needs a trigger" color="warning" badgeStyle="pill-filled" dot />;
        }
        if (row.health === 'paused') {
          return <Badge label="Paused" color="gray" badgeStyle="pill-filled" dot />;
        }
        return <Badge label="Active" color="success" badgeStyle="pill-filled" dot />;
      },
    },
    {
      key: 'created',
      header: 'Created',
      render: (_v, row) => (
        <span style={{ fontSize: 14, color: colors.gray[600] }}>{formatDate(row.createdDate)}</span>
      ),
    },
    {
      key: 'lastTriggered',
      header: 'Last ran',
      render: (_v, row) => (
        <span style={{ fontSize: 14, color: row.lastTriggered ? colors.gray[600] : colors.gray[400] }}>
          {formatDate(row.lastTriggered)}
        </span>
      ),
    },
    {
      key: 'runCount',
      header: 'Runs',
      align: 'right',
      render: (_v, row) => (
        <span style={{ fontSize: 14, color: colors.gray[700] }}>{row.runCount}</span>
      ),
    },
    {
      key: 'toggle',
      header: 'On',
      align: 'right',
      render: (_v, row) => (
        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Toggle
            size="md"
            checked={row.health === 'active'}
            disabled={row.health === 'no-trigger'}
            onChange={() => onToggleActive(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Automations"
        description="When something happens in a job, automatically follow up — no manual texting."
        actions={
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
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
            <PlusIcon size={18} color="#fff" />
            New automation
          </button>
        }
      />
      <div style={{ padding: '0 32px 32px' }}>
        <div style={{ marginBottom: 16, maxWidth: 320 }}>
          <Input
            size="sm"
            placeholder="Search automations..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </div>
        <Table
          columns={columns}
          data={filtered}
          keyExtractor={(row) => row.id}
          onRowClick={(row) => onOpen(row.id)}
        />
      </div>
    </div>
  );
};

export default AutomationsList;
