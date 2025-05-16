import React, { useState } from 'react';
import './StyleAnalyzer.css';

function StyleAnalyzer({ image, onAnalysisComplete }) {
    const [analysis, setAnalysis] = useState(null);

    const analyzeStyle = () => {
        // Simulated AI analysis
        const simulatedAnalysis = {
            length: ['long', 'medium', 'short'][Math.floor(Math.random() * 3)],
            color: ['blonde', 'brunette', 'red', 'black'][Math.floor(Math.random() * 4)],
            texture: ['straight', 'wavy', 'curly'][Math.floor(Math.random() * 3)],
            style: ['layered', 'bob', 'pixie', 'bangs'][Math.floor(Math.random() * 4)]
        };
        setAnalysis(simulatedAnalysis);
        onAnalysisComplete(simulatedAnalysis);
    };

    return (
        <div className="style-analyzer">
            <h2>Style Analysis</h2>
            {image ? (
                <>
                    <button onClick={analyzeStyle}>Analyze Style</button>
                    {analysis && (
                        <div>
                            <h3>Analysis Results:</h3>
                            <ul>
                                {Object.entries(analysis).map(([key, value]) => (
                                    <li key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                    <p>Please upload an image to analyze</p>
                )}
        </div>
    );
}

export default StyleAnalyzer;