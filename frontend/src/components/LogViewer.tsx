'use client'

interface Finding {
  type: string;
  value?: string;
  risk: string;
  line: number;
}

interface LogViewerProps {
  content: string;
  findings: Finding[];
}

export default function LogViewer({ content, findings }: LogViewerProps) {
  const lines = content.split('\n');

  const getRiskClass = (lineNum: number) => {
    const finding = findings.find(f => f.line === lineNum);
    if (!finding) return '';
    return `risk-marker-${finding.risk}`;
  };

  return (
    <div className="log-wrapper" style={{ height: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
      <div className="log-header" style={{ background: '#111', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#666', fontFamily: 'monospace' }}>TERMINAL_OUTPUT</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#444' }}>{lines.length} lines</span>
      </div>
      <div className="log-container" style={{ flex: 1, background: '#000', padding: '1rem 0', overflowY: 'auto', overflowX: 'auto' }}>
        {lines.map((line, index) => {
          const lineNum = index + 1;
          const riskClass = getRiskClass(lineNum);
          
          return (
            <div key={index} className={`log-line ${riskClass}`} style={{ display: 'flex', gap: '1.25rem' }}>
              <span style={{ color: '#333', minWidth: '45px', textAlign: 'right', userSelect: 'none', borderRight: '1px solid #111', paddingRight: '0.75rem', fontSize: '0.75rem' }}>{lineNum}</span>
              <span style={{ whiteSpace: 'pre', color: riskClass ? '#fff' : '#888', flex: 1 }}>{line || ' '}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
