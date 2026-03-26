'use client'

interface InsightsPanelProps {
  summary: string;
  insights: string[];
  riskLevel: string;
  riskScore: number;
}

export default function InsightsPanel({ summary, insights, riskLevel, riskScore }: InsightsPanelProps) {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  const scorePercentage = Math.min((riskScore / 20) * 100, 100);

  return (
    <div className="insights-panel" style={{ 
      height: '100%', 
      overflowY: 'auto', 
      paddingRight: '0.5rem',
      msOverflowStyle: 'none',  /* IE and Edge */
      scrollbarWidth: 'none'    /* Firefox */
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .insights-panel::-webkit-scrollbar {
          display: none;
        }
      `}} />
      <div className="risk-header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Posture</span>
            <h2 style={{ color: getRiskColor(riskLevel), textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.75rem', marginTop: '0.25rem' }}>{riskLevel}</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{riskScore}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.25rem' }}>/ 20</span>
          </div>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${scorePercentage}%`, background: getRiskColor(riskLevel), transition: 'width 1s ease-out' }}></div>
        </div>
      </div>

      <div className="summary-box" style={{ 
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)', 
        padding: '1.25rem', 
        borderRadius: '16px', 
        marginBottom: '2rem', 
        border: '1px solid var(--glass-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: getRiskColor(riskLevel) }}></div>
        <p style={{ color: '#f1f5f9', fontSize: '0.95rem', lineHeight: '1.6' }}>{summary}</p>
      </div>

      <div className="insights-list">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'var(--accent-primary)', display: 'grid', placeItems: 'center', fontSize: '0.7rem' }}>🛡️</div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600 }}>Security Intelligence</h4>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {insights.map((insight, idx) => (
            <li key={idx} style={{ 
              marginBottom: '1rem', 
              display: 'flex', 
              gap: '0.75rem', 
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              border: '1px solid transparent',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <span style={{ color: 'var(--accent-secondary)' }}>✦</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
