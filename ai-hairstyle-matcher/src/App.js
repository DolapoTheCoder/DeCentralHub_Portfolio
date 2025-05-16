import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import StyleAnalyzer from './components/StyleAnalyzer';
import StylistMatcher from './components/StylistMatcher';
import VirtualTryOn from './components/VirtualTryOn';
import './App.css';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (image) => {
    setUploadedImage(image);
    setAnalysisResult(null);
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div className="App">
      <h1>AI Hairstyle Matcher</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      <StyleAnalyzer
        image={uploadedImage}
        onAnalysisComplete={handleAnalysisComplete}
      />
      <StylistMatcher analysis={analysisResult} />
      <VirtualTryOn analysis={analysisResult} />
    </div>
  );
}

export default App;