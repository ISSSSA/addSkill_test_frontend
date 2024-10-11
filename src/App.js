import React, { useState } from 'react';
import LogList from './components/LogList';
import LogDetail from './components/LogDetail';
import './styles/App.css';

function App() {
  const [selectedLog, setSelectedLog] = useState(null);

  return (
      <div className="app">
        <LogList setSelectedLog={setSelectedLog} />
        <LogDetail log={selectedLog} />
      </div>
  );
}

export default App;
