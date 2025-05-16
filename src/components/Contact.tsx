
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const Contact = () => {
  // Form reference for EmailJS
  const form = useRef<HTMLFormElement>(null);
  // State for form status and error message
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  // EmailJS credentials - hardcoded for debugging (will move back to env vars after fixing)
  const serviceId = "service_1nz78om";
  const templateId = "template_x6w0c2n";
  const autoReplyTemplateId = "template_p2tztdl";
  const publicKey = "TefQk8o2siCS7fuWk";
  
  // Initialize EmailJS once the component mounts
  useEffect(() => {
    emailjs.init(publicKey);
    console.log('EmailJS initialized with public key:', publicKey);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setFormStatus('submitting');
    console.log('Form submission started');
    
    try {
      // Use send method with explicit parameters to ensure the sender's email appears in Gmail
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: formData.user_name,
          user_email: formData.user_email,
          message: formData.message,
          // Additional fields to improve email display in Gmail
          from_email: formData.user_email,  // Critical for showing sender in Gmail
          from_name: formData.user_name,
          reply_to: formData.user_email,    // Important for reply functionality
          email: formData.user_email        // Another field that might be used by EmailJS
        },
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      
      // Only attempt auto-reply if the first email succeeded
      try {
        // Send auto-reply email
        const autoReplyResult = await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          {
            to_name: formData.user_name,
            to_email: formData.user_email,
            message: "Thank you for contacting me. I'll respond to your inquiry as soon as possible."
          },
          publicKey // Explicitly passing the public key for the auto-reply
        );
        
        console.log('Auto-reply sent successfully:', autoReplyResult.text);
      } catch (autoReplyError) {
        // If auto-reply fails, just log it but don't show error to user
        console.error('Auto-reply failed, but main email was sent:', autoReplyError);
      }

      // Show success state and reset form
      setFormStatus('submitted');
      setFormData({ user_name: '', user_email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      // More detailed error message
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }
      setErrorMsg(errorMessage);
      setFormStatus('error');
    }
  };

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
                {/* Visually engaging contact form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl shadow-lg overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl relative w-[95%] max-w-2xl mx-auto border border-blue-100/50 dark:border-blue-800/30"
        >
          {/* Multi-color blur effects and decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl dark:bg-blue-500/15"></div>
          <div className="absolute -bottom-20 right-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl dark:bg-teal-500/15"></div>
          <div className="absolute bottom-40 left-40 w-40 h-40 bg-pink-400/15 rounded-full blur-3xl dark:bg-pink-500/10"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl dark:bg-yellow-500/10"></div>
          
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"></div>
          
          <div className="px-4 sm:px-6 pt-8 sm:pt-10 pb-2 sm:pb-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center mb-4 sm:mb-6">
              <div className="relative mb-2 sm:mb-3 mx-auto md:mr-4 md:ml-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-teal-500/50 rounded-full blur-md"></div>
                <div className="flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md relative z-10 border-2 border-white/80 dark:border-gray-800/80">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-1 sm:mb-2">Let's Talk!</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Have a project in mind or just want to say hello?</p>
              </div>
            </div>
          </div>
          
          {/* Form container */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-8">
            {formStatus === 'submitted' ? (
              <div className="py-6 px-4 text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, y: 20 }} 
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative bg-gradient-to-b from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 overflow-hidden mx-auto max-w-md shadow-md"
                >
                  {/* Animated gradient border */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-teal-400 origin-left"
                  ></motion.div>
                  
                  {/* Animated background blobs */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut" 
                    }}
                    className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/20 rounded-full blur-2xl"
                  ></motion.div>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      delay: 0.5,
                      ease: "easeInOut" 
                    }}
                    className="absolute -bottom-15 -left-10 w-40 h-40 bg-teal-400/15 rounded-full blur-2xl"
                  ></motion.div>
                  
                  <div className="flex flex-col items-center relative z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: 0.3 
                      }}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-5 shadow-md"
                    >
                      <motion.svg 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <motion.path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                    >
                      Message Sent!
                    </motion.h3>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      className="text-gray-600 dark:text-gray-400 mb-5"
                    >
                      Thanks for reaching out. I'll get back to you soon.
                    </motion.p>
                    
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white text-sm rounded-full shadow-sm hover:shadow-md focus:outline-none"
                    >
                      Send Another Message
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ) : formStatus === 'error' ? (
              <div className="py-6 px-4 text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gradient-to-b from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 overflow-hidden mx-auto max-w-md"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-pink-400"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Not Sent</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Sorry, we couldn't send your message.</p>
                    
                    {errorMsg && (
                      <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 rounded-lg w-full text-sm">
                        <p className="text-red-700 dark:text-red-300 text-xs">Error: {errorMsg}</p>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-5 relative">
                {/* Decorative elements for the form */}
                <div className="absolute right-0 top-1/4 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-xl -z-10"></div>
                <div className="absolute left-1/4 bottom-0 w-40 h-40 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-xl -z-10"></div>
                
                <div className="col-span-1 relative group">
                  <label htmlFor="name" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 group-focus-within:text-blue-500 transition-colors">
                    <div className="relative mr-1.5">
                      <div className="absolute inset-0 bg-purple-400/30 dark:bg-purple-500/30 rounded-full blur-sm"></div>
                      <svg className="w-4 h-4 relative z-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span>Your Name</span>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="user_name"
                      type="text"
                      required
                      value={formData.user_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-200/60 dark:border-gray-700/60 focus:border-purple-500/60 dark:focus:border-purple-400/70 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-900 dark:text-gray-100 outline-none transition duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
                      placeholder="Enter your name"
                    />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-md -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 relative group">
                  <label htmlFor="email" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 group-focus-within:text-blue-500 transition-colors">
                    <div className="relative mr-1.5">
                      <div className="absolute inset-0 bg-blue-400/30 dark:bg-blue-500/30 rounded-full blur-sm"></div>
                      <svg className="w-4 h-4 relative z-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>Your Email</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="user_email"
                      type="email"
                      required
                      value={formData.user_email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-200/60 dark:border-gray-700/60 focus:border-blue-500/60 dark:focus:border-blue-400/70 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-900 dark:text-gray-100 outline-none transition duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
                      placeholder="Enter your email"
                    />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-xl blur-md -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 relative group">
                  <label htmlFor="message" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 group-focus-within:text-blue-500 transition-colors">
                    <div className="relative mr-1.5">
                      <div className="absolute inset-0 bg-teal-400/30 dark:bg-teal-500/30 rounded-full blur-sm"></div>
                      <svg className="w-4 h-4 relative z-10 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <span>Your Message</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:py-3 rounded-lg border border-gray-200/60 dark:border-gray-700/60 focus:border-teal-500/60 dark:focus:border-teal-400/70 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-900 dark:text-gray-100 resize-none outline-none transition duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
                      placeholder="What would you like to discuss?"
                    ></textarea>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl blur-md -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 right-4 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 mt-4 sm:mt-5 flex justify-center relative">
                  {/* Animated multi-color blur effects for the button */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-teal-500/30 rounded-full blur-md animate-pulse"></div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-lg opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 text-white font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none relative z-10"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending your message...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
