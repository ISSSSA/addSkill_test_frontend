import React, { useState, useEffect } from 'react';
import '../styles/LogDetail.css';

function LogDetail({ log }) {
    const [typedContent, setTypedContent] = useState('');
    const [contentIndex, setContentIndex] = useState(0);
    const typingSpeed = 50;

    useEffect(() => {
        if (log) {
            setTypedContent('');
            setContentIndex(0);
        }
    }, [log]);

    useEffect(() => {
        if (log && contentIndex < log.content.length) {
            const timeout = setTimeout(() => {
                setTypedContent((prev) => prev + log.content[contentIndex]);
                setContentIndex((prev) => prev + 1);
            }, typingSpeed);

            return () => clearTimeout(timeout);
        }
    }, [log, contentIndex]);

    if (!log) return <div className="log-detail">Select a log to view details</div>;

    return (
        <div className="log-detail">
            <h3>Log Details</h3>
            <p><strong>Timestamp:</strong> {log.timestamp}</p>
            <p><strong>Computer Name:</strong> {log.computer_name}</p>
            <p><strong>Event Type:</strong> {log.event_type}</p>
            <p><strong>Application:</strong> {log.application}</p>
            <p><strong>Window Title:</strong> {log.window_title}</p>
            <p><strong>Content:</strong> <span>{typedContent}</span></p>
            {log.screenshot && <img src={`http://localhost:8000/${log.screenshot}`} alt="screenshot" />}
        </div>
    );
}

export default LogDetail;