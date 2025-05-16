import React, { useState, useEffect } from 'react';

function JournalEntry() {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState('');

    useEffect(() => {
        const savedEntries = localStorage.getItem('journalEntries');
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries));
        }
    }, []);

    const saveEntry = () => {
        if (currentEntry.trim() !== '') {
            const newEntries = [...entries, { date: new Date().toLocaleDateString(), text: currentEntry }];
            setEntries(newEntries);
            localStorage.setItem('journalEntries', JSON.stringify(newEntries));
            setCurrentEntry('');
        }
    };

    return (
        <div className="journal-entry">
            <h3>Journal Your Reflections</h3>
            <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Write your reflections here..."
                rows="4"
            />
            <button onClick={saveEntry}>Save Entry</button>
            <div className="journal-entries">
                <h4>Previous Entries</h4>
                {entries.map((entry, index) => (
                    <div key={index} className="entry">
                        <p><strong>{entry.date}</strong>: {entry.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JournalEntry;
