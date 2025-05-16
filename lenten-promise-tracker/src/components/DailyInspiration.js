import React, { useState, useEffect } from 'react';

const quotes = [
    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16",
    "I can do all this through him who gives me strength. - Philippians 4:13",
    "Trust in the LORD with all your heart and lean not on your own understanding. - Proverbs 3:5",
    "The LORD is my shepherd, I lack nothing. - Psalm 23:1",
    "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go. - Joshua 1:9"
];

function DailyInspiration() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="daily-inspiration">
            <h3>Your Daily Bible Verse</h3>
            <p>{quote}</p>
            <button onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}>
                New Verse
      </button>
        </div>
    );
}

export default DailyInspiration;
