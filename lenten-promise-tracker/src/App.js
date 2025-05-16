import React from 'react';
import ProgressTracker from './components/ProgressTracker';
import DailyInspiration from './components/DailyInspiration';
import JournalEntry from './components/JournalEntry';
import CommunityBoard from './components/CommunityBoard';
import './components/DailyInspiration.css';
import './components/JournalEntry.css';
import './components/CommunityBoard.css';

function App() {
  return (
    <div className="App">
      <h1>Lenten Promise Tracker</h1>
      <ProgressTracker />
      <DailyInspiration />
      <JournalEntry />
      <CommunityBoard />
    </div>
  );
}

export default App;
