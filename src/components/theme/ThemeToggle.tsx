import React from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div 
      className="theme-toggle-wrapper relative cursor-pointer"
      onClick={toggleTheme}
    >
      {/* Toggle Container with subtle shadow to appear more 3D like reference images */}
      <div 
        className={`
          w-14 h-7 rounded-full relative flex items-center transition-colors duration-300 border
          ${theme === 'light' 
            ? 'bg-blue-100/90 border-blue-300 justify-start' 
            : 'bg-slate-800 border-slate-700 justify-end'}
        `}
        style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
      >
        {/* Light Mode Background */}
        {theme === 'light' && (
          <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-b from-blue-100 to-blue-300 opacity-90">
            {/* Small shine dots */}
            <div className="absolute top-1 right-3 w-1 h-1 bg-white rounded-full opacity-70"></div>
            <div className="absolute top-3 right-5 w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
          </div>
        )}
        
        {/* Dark Mode Background */}
        {theme === 'dark' && (
          <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
            {/* Stars */}
            <div className="absolute top-1.5 left-9 w-1 h-1 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-1.5 left-5 w-1.5 h-1.5 bg-white rounded-full opacity-80 transform rotate-45">
              <div className="absolute inset-0 bg-white rotate-90"></div>
            </div>
            <div className="absolute top-4 left-7 w-1 h-1 bg-white rounded-full opacity-70"></div>
          </div>
        )}
        
        {/* No text labels as per user request */}
        
        {/* Toggle Knob - Slightly larger to match reference */}
        <motion.div 
          className={`
            absolute w-6 h-6 rounded-full shadow-md z-10 flex items-center justify-center
            ${theme === 'light' 
              ? 'bg-white left-0.5' 
              : 'bg-slate-900 right-0.5'}
          `}
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
        >
          {/* Sun Icon (Light Mode) */}
          {theme === 'light' && (
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400">
              {/* Inner highlight to create a more realistic sun */}
              <div className="absolute inset-1 rounded-full bg-yellow-200 opacity-70"></div>
            </div>
          )}
          
          {/* Moon Icon (Dark Mode) */}
          {theme === 'dark' && (
            <div className="relative w-5 h-5">
              {/* Main moon shape */}
              <div className="absolute inset-0 rounded-full bg-gray-100">
                {/* Crescent effect */}
                <div className="absolute -right-1.5 -top-0 w-4 h-4 bg-slate-900 rounded-full"></div>
              </div>
              {/* Star decoration near moon */}
              <div className="absolute -top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-90"></div>
              <div className="absolute top-1 right-1.5 w-0.5 h-0.5 bg-white rounded-full opacity-90"></div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeToggle;
