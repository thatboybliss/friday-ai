import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState("Connecting to Friday-AI Backend...");

  useEffect(() => {
    // Async fetch to backend API
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        setStatus(data.message || "System Online");
      } catch (err) {
        setStatus("Backend Offline (Check Connection)");
      }
    };
    fetchStatus();
  }, []);

  return (
    <div style={{ background: '#0d1117', color: '#58a6ff', height: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'monospace' }}>
      <h1>FRIDAY-AI INTERFACE</h1>
      <hr style={{ borderColor: '#30363d' }} />
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #30363d', borderRadius: '8px' }}>
        <p>SYSTEM STATUS: <span style={{ color: '#3fb950' }}>{status}</span></p>
      </div>
    </div>
  );
}

export default App;
