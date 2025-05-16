import React, { useState } from 'react';
import './ImageUploader.css';

function ImageUploader() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    return (
        <div className="image-uploader">
            <h2>Upload Your Desired Hairstyle</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="image-upload"
            />
            <label htmlFor="image-upload">Choose an image</label>
            {image && <p>Image uploaded: {image.name}</p>}
        </div>
    );
}

export default ImageUploader;