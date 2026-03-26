'use client'

import { useState } from 'react'
import './globals.css'
import { analyzeContent } from '@/lib/api'
import LogViewer from '@/components/LogViewer'
import InsightsPanel from '@/components/InsightsPanel'

export default function Dashboard() {
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('upload')
  const [textContent, setTextContent] = useState('')
  const [filename, setFilename] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFilename(file.name)
    const text = await file.text()

    // Detect log type
    const isLog = file.name.endsWith('.log') || file.name.endsWith('.txt')
    const type = isLog ? 'log' : 'file'

    setTextContent(text)
    performAnalysis(text, type)
  }

  const performAnalysis = async (content: string, type: string) => {
    setIsScanning(true)
    try {
      const data = await analyzeContent({
        input_type: type,
        content: content,
        options: { mask: true, block_high_risk: true, log_analysis: true }
      })

      // Use masked content if provided
      if (data.content) {
        setTextContent(data.content)
      }
      setResults(data)
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('Analysis failed. Make sure the backend is running at http://localhost:8005')
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <main className="main-container">
      <section className="hero-section">
        <h1 style={{ marginBottom: '0.5rem' }}>Secure Data Intelligence</h1>
        <p style={{ letterSpacing: '2px', fontSize: '1rem', opacity: 0.8 }}>Advanced Security Gateway • Log Analyzer • Risk Engine</p>
      </section>

      <div className="grid-layout">
        <div className="glass-card" style={{ border: results ? '1px solid var(--glass-border)' : '1px solid var(--accent-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Core Analysis Engine</h2>
              <div className="tabs">
                <button className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>Upload</button>
                <button className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>Live Text</button>
              </div>
          </div>
          
          <div className={`upload-area ${!filename ? 'upload-area-active' : ''}`} style={{ 
            flex: 1, 
            marginTop: '1rem', 
            textAlign: 'center', 
            border: '1px dashed var(--glass-border)', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            background: 'rgba(129, 140, 248, 0.02)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            position: 'relative'
          }}>
            {activeTab === 'upload' ? (
              <div style={{ padding: '0 1rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  margin: '0 auto 1.5rem', 
                  borderRadius: '12px', 
                  background: 'rgba(129, 140, 248, 0.1)', 
                  display: 'grid', 
                  placeItems: 'center',
                  border: '1px solid rgba(129, 140, 248, 0.2)'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>{filename ? '✓' : '↑'}</span>
                </div>
                {filename ? (
                  <>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{filename}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Source identification complete. Ready for analysis.</p>
                  </>
                ) : (
                  <>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Secure Ingestion</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>Drop system logs, audit traces, or security dumps to begin automated threat mapping.</p>
                  </>
                )}
                <input type="file" id="fileInput" hidden onChange={handleFileUpload} />
                <button className="button-primary" style={{ marginTop: '1.5rem', padding: '0.65rem 1.5rem', fontSize: '0.85rem' }} onClick={() => document.getElementById('fileInput')?.click()}>
                  {filename ? 'Replace Source' : 'Initialize Data Feed'}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'left', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <textarea 
                  placeholder="Enter raw log material or text to analyze..." 
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  style={{ flex: 1, minHeight: '150px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', padding: '1.25rem', borderRadius: '12px', fontSize: '0.9rem', fontFamily: 'monospace', outline: 'none', resize: 'none' }}
                />
                <button className="button-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => performAnalysis(textContent, 'chat')}>
                  Initiate Security Scan
                </button>
              </div>
            )}
          </div>
        </div>

        {results ? (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Source Visualization</h3>
              {filename && <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', background: 'rgba(129, 140, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{filename}</span>}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <LogViewer content={textContent} findings={results.findings} />
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>📋</div>
            <h3 style={{ fontSize: '1.1rem' }}>Source Manifest</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.85rem' }}>Visual telemetry will appear here after ingestion.</p>
          </div>
        )}

        {isScanning ? (
          <div className="glass-card" style={{ textAlign: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 2rem' }}>
                <div className="loader"></div>
                <div className="loader-inner"></div>
                <div className="scanning-line"></div>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Threat Discovery</h3>
            <p style={{ marginTop: '0.75rem', color: 'var(--accent-primary)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Security Analysis In Progress...</p>
          </div>
        ) : results ? (
          <div className="glass-card">
            <div style={{ flex: 1, overflow: 'auto' }}>
              <InsightsPanel 
                summary={results.summary} 
                insights={results.insights} 
                riskLevel={results.risk_level}
                riskScore={results.risk_score}
              />
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>⚡</div>
            <h3 style={{ fontSize: '1.1rem' }}>Security Intelligence</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.85rem' }}>Heuristic risk analysis and remediation roadmap.</p>
          </div>
        )}

        {results ? (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Detection Inventory</h3>
              <button 
                onClick={() => {
                    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `SISA_Report_${new Date().getTime()}.json`;
                    a.click();
                }}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                Export Protocol
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingRight: '0.5rem' }}>
                {results.findings.length > 0 ? (
                  results.findings.map((f: any, i: number) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '0.85rem 1rem', 
                      background: 'rgba(129, 140, 248, 0.02)', 
                      borderRadius: '12px', 
                      border: '1px solid var(--glass-border)',
                      fontSize: '0.8rem'
                    }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: `var(--risk-${f.risk})`, boxShadow: `0 0 8px var(--risk-${f.risk})` }}></div>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500, letterSpacing: '0.02em' }}>{f.type.replace(/_/g, ' ').toUpperCase()}</span>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '0.75rem' }}>LINE {f.line}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
                    <p style={{ fontSize: '0.85rem' }}>No vulnerabilities detected.</p>
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🛡️</div>
            <h3 style={{ fontSize: '1.1rem' }}>Protection Log</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.85rem' }}>Detailed findings inventory will be populated here.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }
        .loader {
          width: 80px;
          height: 80px;
          border: 2px solid rgba(129, 140, 248, 0.1);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: 0 0 15px rgba(129, 140, 248, 0.2);
        }
        .loader-inner {
          width: 50px;
          height: 50px;
          border: 2px solid rgba(129, 140, 248, 0.05);
          border-bottom-color: var(--accent-primary);
          border-radius: 50%;
          position: absolute;
          top: 15px;
          left: 15px;
          animation: rotation 1s reverse infinite;
          opacity: 0.5;
        }
        .scanning-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
          top: 50%;
          left: 0;
          animation: scanVertical 2s infinite ease-in-out;
          opacity: 0.3;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scanVertical {
          0%, 100% { transform: translateY(-30px); opacity: 0; }
          50% { transform: translateY(30px); opacity: 0.5; }
        }
      `}</style>
    </main>
  )
}
