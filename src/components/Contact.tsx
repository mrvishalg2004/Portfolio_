
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/contact-form.css"; // Custom CSS for form styling

const Contact = () => {
  const [formLoaded, setFormLoaded] = useState(false);
  const [formError, setFormError] = useState(false);
  const scriptLoaded = useRef(false);
  
  // Load the Visme form script - simpler, more reliable approach
  useEffect(() => {
    // Prevent double loading
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;
    
    // Add preload link for faster script loading
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'script';
    preloadLink.href = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    document.head.appendChild(preloadLink);
    
    // Create and load the script - using the standard way that's known to work with Visme
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    
    // Handle script loading events
    script.onload = () => {
      console.log('Visme form script loaded successfully');
      // Shorter check interval
      const checkForm = setInterval(() => {
        if (document.querySelector('.visme_d iframe')) {
          clearInterval(checkForm);
          setFormLoaded(true);
          
          // Hide the "Powered by Visme Forms" text with a more targeted approach
          // This runs after the form is loaded and targets the specific element
          const hideFooter = () => {
            // Try to find and hide the footer text using multiple approaches
            // Target the text directly in the iframe if possible
            const formIframe = document.querySelector('.visme_d iframe');
            if (formIframe && formIframe.contentDocument) {
              try {
                // Try to access the iframe content and hide the footer
                const iframeDoc = formIframe.contentDocument || formIframe.contentWindow.document;
                const footerElems = iframeDoc.querySelectorAll('[class*="footer"], [class*="powered"], [class*="brand"]');
                footerElems.forEach(el => {
                  el.style.display = 'none';
                });
              } catch (e) {
                console.log('Cannot access iframe content due to security restrictions');
              }
            }
            
            // Also look for the powered by text in the main document
            // This catches the text even if it's inserted dynamically after the iframe
            const poweredByElements = document.querySelectorAll('.visme_d + div, .visme_d ~ div');
            poweredByElements.forEach(el => {
              if (el.textContent && el.textContent.toLowerCase().includes('powered by visme')) {
                el.style.display = 'none';
              }
            });
          };
          
          // Try hiding immediately and then with a delay to catch dynamic insertion
          hideFooter();
          setTimeout(hideFooter, 500);
          setTimeout(hideFooter, 1500);
        }
      }, 300);
      
      // Shorter timeout (3 seconds instead of 5)
      setTimeout(() => {
        clearInterval(checkForm);
        if (!formLoaded) setFormLoaded(true);
      }, 3000);
    };
    
    script.onerror = () => {
      console.error('Failed to load Visme form script');
      setFormError(true);
    };
    
    // Add script to document
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://static-bundles.visme.co/forms/vismeforms-embed.js"]');
      if (existingScript) document.body.removeChild(existingScript);
      if (preloadLink.parentNode) document.head.removeChild(preloadLink);
    };
  }, []);

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-blue/5 dark:bg-brand-blue/10"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-brand-blue/5 dark:bg-brand-blue/10"></div>
        <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm"></div>
      </div>
      
      <div className="container-custom max-w-6xl relative z-10">
        {/* Section header with enhanced styling */}
        <div className="mb-16 text-center">
          <h2 className="section-title text-center mb-3 font-bold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
            Let's Connect
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>
        
        {/* Form container with decorative elements */}
        <div className="mx-auto max-w-3xl mb-12">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-brand-blue/20 rounded-xl rotate-12 hidden md:block"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-2 border-brand-blue/20 rounded-xl -rotate-12 hidden md:block"></div>
          </div>
        </div>
        
        {/* Simplified contact form approach */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900/30"
        >
          {/* Custom form header */}
          <div className="p-8 relative z-10">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <span className="mr-2 h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></span>
              Send Me a Message
            </h3>
          </div>
          
          {/* Form with iframe container */}
          <div className="px-8 pb-8">
            {/* Form container with loading state */}
            <div className="visme-form-container relative">
              {/* Loading placeholder */}
              {!formLoaded && !formError && (
                <div className="form-loading-placeholder p-6 space-y-4">
                  <div className="flex flex-col gap-4 animate-pulse">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 ml-auto"></div>
                  </div>
                </div>
              )}
              
              {/* Error state */}
              {formError && (
                <div className="text-center py-8">
                  <p className="text-red-500 mb-4">Unable to load contact form</p>
                  <p className="text-gray-600 dark:text-gray-400">Please try refreshing the page or contact me directly at <a href="mailto:contact@vishalgolhar.in" className="text-brand-blue hover:underline">contact@vishalgolhar.in</a></p>
                </div>
              )}
              
              {/* The Visme form - updated with new embed code */}
              <div 
                className="visme_d" 
                data-title="Blog Contact Form" 
                data-url="dm490ekg-blog-contact-form" 
                data-domain="forms" 
                data-full-page="false" 
                data-min-height="500px" 
                data-form-id="126964"
                style={{ 
                  opacity: formLoaded ? 1 : 0, 
                  transition: 'opacity 0.5s ease-in',
                  willChange: 'opacity', // Optimize for animation
                  position: 'relative',
                  zIndex: 1
                }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
