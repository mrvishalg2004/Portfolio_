
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { AspectRatio } from "./ui/aspect-ratio";

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-coral/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title inline-block">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Column */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl bg-gradient-to-br from-brand-blue to-brand-coral opacity-30 blur-lg animate-pulse"></div>
              
              {/* Main image container with glassmorphism */}
              <div className="relative z-10 w-72 h-84 overflow-hidden rounded-2xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-xl">
                <AspectRatio ratio={3/4} className="w-full h-full">
                  <img
                    src="/lovable-uploads/e4a46fa5-8d53-4e99-8813-a37ecb74c1d3.png"
                    alt="Vishal Golhar"
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute top-3/4 -right-6 w-16 h-16 bg-brand-coral rounded-full shadow-lg animate-float"></div>
              <div className="absolute top-1/4 -left-6 w-12 h-12 bg-brand-blue rounded-full shadow-lg animate-float animation-delay-2000"></div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-coral">Who am I?</h3>
            
            <div className="card glass-effect p-6 transform transition-all hover:scale-[1.01]">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I'm Vishal Golhar, a passionate and result-driven Software Developer pursuing a B.Tech in Artificial Intelligence at G.H. Raisoni College of Engineering. I specialize in Java, Python, MySQL, and have hands-on experience with AI and Machine Learning. I enjoy building solutions that blend creativity with logic.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                My journey in tech began with a deep fascination for problem-solving and creating applications that make a difference. I am constantly expanding my skills through hands-on projects, internships, and online courses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="card glass-effect p-4 text-center transform transition-all hover:scale-105">
                <div className="w-12 h-1 bg-brand-blue mx-auto mb-3"></div>
                <span className="font-medium">AI Enthusiast</span>
              </div>
              <div className="card glass-effect p-4 text-center transform transition-all hover:scale-105">
                <div className="w-12 h-1 bg-brand-coral mx-auto mb-3"></div>
                <span className="font-medium">Problem Solver</span>
              </div>
              <div className="card glass-effect p-4 text-center transform transition-all hover:scale-105">
                <div className="w-12 h-1 bg-gradient-to-r from-brand-blue to-brand-coral mx-auto mb-3"></div>
                <span className="font-medium">Quick Learner</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
