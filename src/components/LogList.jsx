import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../styles/LogList.css';
import AddLog from './AddLog';

function LogList({setSelectedLog}) {
    const [logs, setLogs] = useState([]);

    const handleLogAdded = (newLog) => {
        setLogs(prevLogs => [newLog, ...prevLogs]);
    };

    useEffect(() => {
        axios.get('http://localhost:8000/logs/')
            .then(response => setLogs(response.data.logs))
            .catch(error => console.error('Error fetching logs:', error));
    }, []);

    return (
        <div className="log-list">
            <AddLog onLogAdded={handleLogAdded}/>
            <h2>Event Logs</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index} onClick={() => setSelectedLog(log)}>
                        [{log.timestamp}] {log.event_type} in {log.application}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LogList;