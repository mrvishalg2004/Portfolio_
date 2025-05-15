import React, { useState, useEffect } from 'react';

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const fullText = 'Vishal Golhar';
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;
    
    // Type out the name character by character
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        typingInterval = setTimeout(typeText, 150); // Adjust typing speed here
      } else {
        setIsComplete(true);
        // Brief pause after typing completes
        setTimeout(() => {
          // Fade out animation happens via CSS
          const loader = document.getElementById('loader-container');
          if (loader) {
            loader.classList.add('fade-out');
          }
          // Allow time for fade out animation
          setTimeout(onComplete, 1000);
        }, 800);
      }
    };

    // Start typing after a brief delay
    const startTimeout = setTimeout(() => {
      typeText();
    }, 500);

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText, onComplete]);

  return (
    <div 
      id="loader-container"
      className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50 transition-opacity duration-1000"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-cursive">
          <span className="text-white">{text}</span>
          <span className={`text-brand-blue ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          {isComplete ? "Welcome to my portfolio" : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Loader;
