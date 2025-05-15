
import React, { useEffect } from "react";
import TypewriterEffect from "./TypewriterEffect";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Enhanced Background Blob Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 -right-64 transform -translate-y-1/2 w-[30rem] h-[30rem] bg-brand-blue/20 rounded-full filter blur-3xl animate-blob opacity-70"></div>
        <div className="absolute bottom-0 -left-64 w-[35rem] h-[35rem] bg-brand-coral/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 opacity-70"></div>
        <div className="absolute top-1/4 left-1/2 w-[25rem] h-[25rem] bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000 opacity-50"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              i % 2 === 0 ? "bg-brand-blue/20" : "bg-brand-coral/20"
            } rounded-full`}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
          />
        ))}
      </div>

      {/* Decorative Code Fragments */}
      <div className="absolute inset-0 z-0 overflow-hidden text-brand-blue/10 dark:text-brand-blue/5">
        <div className="absolute top-1/4 left-10 text-5xl font-mono rotate-12">{`{ }`}</div>
        <div className="absolute bottom-1/4 right-20 text-6xl font-mono -rotate-6">{`</>`}</div>
        <div className="absolute top-2/3 left-1/3 text-4xl font-mono rotate-45">{"<div>"}</div>
        <div className="absolute top-10 right-1/3 text-5xl font-mono -rotate-12">{"function()"}</div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: y1, opacity }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-blue to-brand-coral bg-clip-text text-transparent">
              Hi, I'm <span>Vishal Golhar</span> 👋
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              <TypewriterEffect
                text="Aspiring Software Developer & AI Engineer"
                delay={100}
                className=""
              />
            </div>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.a 
                href="#contact" 
                className="relative overflow-hidden group btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </motion.a>
              <motion.a
                href="/images/Vishal_Golhar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Resume</span>
                <span className="absolute inset-0 bg-brand-blue/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Enhanced Profile Image */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            style={{ y: y2 }}
          >
            <div className="relative">
              {/* Animated rings around profile pic */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-brand-blue/20 to-brand-coral/20 animate-spin-slow"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-coral/20 absolute top-4 left-4 animate-pulse"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg z-10 glass-effect">
                <img
                  src="/images/profile.png"
                  alt="Vishal Golhar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
