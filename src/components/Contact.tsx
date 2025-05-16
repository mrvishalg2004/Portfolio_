
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
    from_name: '',
    reply_to: '',
    message: ''
  });

  // EmailJS credentials from environment variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
  const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID as string;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
  
  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(publicKey);
  }, [publicKey]);

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
    
    try {
      // Send notification email
      await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey
      );
      
      // Send auto-reply email
      await emailjs.send(
        serviceId,
        autoReplyTemplateId,
        {
          to_name: formData.from_name,
          to_email: formData.reply_to,
          message: "Thank you for contacting me. I'll respond to your inquiry as soon as possible."
        },
        publicKey
      );

      setFormStatus('submitted');
      setFormData({ from_name: '', reply_to: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMsg(error instanceof Error ? error.message : 'Unknown error occurred');
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
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-md"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-blue-100/50 dark:border-blue-800/30">
                  {/* Multi-color blur effects */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl dark:bg-teal-500/20 -z-10"></div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl dark:bg-green-500/20 -z-10"></div>
                  <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl dark:bg-blue-500/20 -z-10"></div>
                  
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/70 to-teal-500/70 rounded-full blur-md"></div>
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-xl border-4 border-white/80 dark:border-gray-800/80 relative z-10">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-14 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Message Sent!</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-teal-50/50 dark:bg-teal-900/30 rounded-xl backdrop-blur-md border border-teal-100/50 dark:border-teal-800/30">
                      <p className="text-teal-700 dark:text-teal-300">An auto-confirmation email has been sent to your address.</p>
                    </div>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-5 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 relative group text-sm sm:text-base"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10">Close</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : formStatus === 'error' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-md"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-blue-100/50 dark:border-blue-800/30">
                  {/* Multi-color blur effects */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-400/20 rounded-full blur-3xl dark:bg-red-500/20 -z-10"></div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl dark:bg-pink-500/20 -z-10"></div>
                  <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl dark:bg-orange-500/20 -z-10"></div>
                  
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/70 to-pink-500/70 rounded-full blur-md"></div>
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-20 h-20 flex items-center justify-center shadow-xl border-4 border-white/80 dark:border-gray-800/80 relative z-10">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-14 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Something went wrong</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg">Your message could not be sent. Please try again later.</p>
                    <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-50/50 dark:bg-red-900/30 rounded-xl backdrop-blur-md border border-red-100/50 dark:border-red-800/30">
                      <p className="text-red-700 dark:text-red-300">Error: {errorMsg}</p>
                    </div>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-5 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 relative group text-sm sm:text-base"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10">Close</span>
                    </button>
                  </div>
                </div>
              </motion.div>
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
                      name="from_name"
                      type="text"
                      required
                      value={formData.from_name}
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
                      name="reply_to"
                      type="email"
                      required
                      value={formData.reply_to}
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
