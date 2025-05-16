import React, { useState } from 'react';
import './ProgressTracker.css';

function ProgressTracker() {
    const [progress, setProgress] = useState(0);

    const handleProgressChange = (event) => {
        setProgress(event.target.value);
    };

    return (
        <div className="progress-tracker">
            <h2>Your Lenten Promise Progress</h2>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
            />
            <p className="progress-text">Progress: {progress}%</p>
        </div>
    );
}

export default ProgressTracker;
