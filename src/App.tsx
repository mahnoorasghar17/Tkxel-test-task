import { useState } from 'react';
import AutomationsList from './screens/AutomationsList';
import BuilderCanvas from './screens/BuilderCanvas';
import { mockAutomations } from './data/mockAutomations';
import type { Automation } from './types';

function App() {
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleActive = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id && a.health !== 'no-trigger'
          ? { ...a, health: a.health === 'active' ? 'paused' : 'active' }
          : a
      )
    );
  };

  const openAutomation = automations.find((a) => a.id === openId);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#fff', minHeight: '100vh' }}>
      {openAutomation ? (
        <BuilderCanvas automation={openAutomation} onBack={() => setOpenId(null)} />
      ) : (
        <AutomationsList
          automations={automations}
          onOpen={setOpenId}
          onToggleActive={toggleActive}
        />
      )}
    </div>
  );
}

export default App;
