import React, { useState, useRef, useEffect } from 'react';
import './VirtualTryOn.css';

const hairstyles = {
    'long': '/images/long-hair-overlay.png',
    'medium': '/images/medium-hair-overlay.png',
    'short': '/images/short-hair-overlay.png',
    'pixie': '/images/pixie-hair-overlay.png',
};

function VirtualTryOn({ analysis }) {
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const canvasRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setUserImage(e.target.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (userImage && selectedStyle) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const overlay = new Image();
                overlay.src = hairstyles[selectedStyle];
                overlay.onload = () => {
                    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
                };
            };
            img.src = userImage;
        }
    }, [userImage, selectedStyle]);

    return (
        <div className="virtual-try-on">
            <h2>Virtual Try-On</h2>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <div className="style-buttons">
                {Object.keys(hairstyles).map(style => (
                    <button key={style} onClick={() => setSelectedStyle(style)}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                ))}
            </div>
            {userImage && (
                <div className="preview">
                    <canvas ref={canvasRef}></canvas>
                </div>
            )}
        </div>
    );
}

export default VirtualTryOn;