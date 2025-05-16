
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const Contact = () => {
  // Form reference for EmailJS
  const form = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
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
      // Instead of using sendForm, let's use send with explicit parameters to ensure all fields are properly set
      const userName = form.current.from_name.value;
      const userEmail = form.current.reply_to.value;
      const userMessage = form.current.message.value;
      
      // Create template parameters that ensure proper email display in Gmail
      const templateParams = {
        // For your template variables
        name: userName,
        from_name: userName,
        from_email: userEmail,  // This is critical for showing the sender's email
        message: userMessage,
        to_name: 'Vishal',
        // Additional fields to improve email display
        email: userEmail,
        reply_to: userEmail
      };
      
      console.log('Sending main email with params:', templateParams);
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      
      // Only attempt to send the auto-reply if the main email was successful
      try {
        // Extract values directly from the form before it gets reset
        const userName = form.current.from_name.value;
        const userEmail = form.current.reply_to.value;
        
        // Looking at your auto-reply template, you only need the 'name' parameter:
        // "Hi {{name}}, Thank you for reaching out..."
        const autoReplyParams = {
          name: userName,
          // Include all possible variations of email field names that EmailJS might use
          email: userEmail,
          to_email: userEmail,
          user_email: userEmail,
          reply_to: userEmail,
          // Make sure recipient field is properly set
          to_name: userName
        };
        
        // Also set a recipient manually for the email
        const emailjsOptions = {
          from_name: 'Vishal Golhar',
          reply_to: 'contact@vishalgolhar.in'
        };
        
        console.log('Auto-reply params:', autoReplyParams);
        
        // Send auto-reply with complete parameters and proper options
        const autoReplyResult = await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          autoReplyParams,
          {
            publicKey: publicKey,
            ...emailjsOptions // Apply the from_name and reply_to as Email.js options
          }
        );
        
        console.log('Auto-reply sent successfully:', autoReplyResult.text);
      } catch (autoReplyError) {
        // If auto-reply fails, just log the error but don't show an error to the user
        // since the main form submission was successful
        console.error('Auto-reply failed, but main email sent:', autoReplyError);
        console.error('Auto-reply error details:', autoReplyError);
      }
      
      // Show success and reset form
      setFormStatus('submitted');
      setFormData({ from_name: '', reply_to: '', message: '' });
    } catch (error) {
      console.error('Form submission failed:', error);
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
                {/* Simple contact form */}
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
          
          {/* Form container */}
          <div className="px-8 pb-8">
            {formStatus === 'submitted' ? (
              <div className="text-center py-8 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Message Sent!</h4>
                <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : formStatus === 'error' ? (
              <div className="text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-red-500 mb-4">Unable to send your message</p>
                <p className="text-gray-600 dark:text-gray-400">Please try again or contact me directly at <a href="mailto:contact@vishalgolhar.in" className="text-brand-blue hover:underline">contact@vishalgolhar.in</a></p>
              </div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    id="name"
                    name="from_name"
                    type="text"
                    required
                    value={formData.from_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    id="email"
                    name="reply_to"
                    type="email"
                    required
                    value={formData.reply_to}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full md:w-auto md:ml-auto md:block px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
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
