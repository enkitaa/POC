// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';

interface StatusData {
  pod_count: number;
  updated_at: string;
}

function App() {
  const [statusData, setStatusData] = useState<StatusData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/status');
        const data: StatusData = await response.json();
        setStatusData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>OpenShift Dashboard</h1>
      {statusData && (
        <div>
          <p>Pod Count: {statusData.pod_count}</p>
          <p>Last Updated: {new Date(statusData.updated_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
