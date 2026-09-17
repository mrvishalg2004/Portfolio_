import React from "react";
import { motion } from "framer-motion";
import { Github, Instagram } from "lucide-react";
import { useTheme } from "./theme/ThemeProvider";

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className={`relative w-full min-h-screen flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
        isDark ? "bg-[#121214] text-white" : "bg-[#fafaf9] text-neutral-900"
      }`}
    >
      {/* Subtle ambient lighting for cinematic depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] rounded-full blur-3xl transition-all duration-500 ${
            isDark ? "bg-amber-500/[0.03]" : "bg-amber-500/[0.06]"
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
            isDark ? "bg-white/[0.015]" : "bg-slate-300/[0.25]"
          }`}
        />
      </div>

      {/* Top spacer to balance layout with fixed navbar */}
      <div className="h-16 md:h-20 w-full" />

      {/* Main Centerpiece Typography Block */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 md:px-12 flex flex-col my-auto py-10">
        {/* Top line: "Hi I am" + horizontal amber accent bar */}
        <div className="flex items-center gap-4 sm:gap-6 w-full mb-1 sm:mb-2">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`font-light text-base sm:text-xl md:text-2xl lg:text-3xl tracking-[0.18em] whitespace-nowrap transition-colors duration-500 ${
              isDark ? "text-gray-400" : "text-neutral-500"
            }`}
          >
            Hi I am
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-[2.5px] sm:h-[3px] bg-[#e59a18] flex-grow rounded-full shadow-[0_0_12px_rgba(229,154,24,0.45)]"
          />
        </div>

        {/* Main Name: Vishal Golhar */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black tracking-tight leading-none font-sans transition-colors duration-500 ${
            isDark ? "text-white" : "text-neutral-950"
          }`}
        >
          Vishal Golhar
        </motion.h1>

        {/* Subtitle: FULL STACK DEVELOPER & AI ENGINEER (Right-aligned under the name) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="self-end text-right mt-3 sm:mt-5 md:mt-6"
        >
          <p className="text-[#e59a18] font-bold text-xs sm:text-base md:text-xl lg:text-2xl tracking-[0.2em] uppercase leading-tight">
            FULL STACK DEVELOPER
          </p>
          <p className="text-[#e59a18] font-bold text-xs sm:text-base md:text-xl lg:text-2xl tracking-[0.2em] uppercase leading-tight mt-0.5 sm:mt-1">
            & AI ENGINEER
          </p>
        </motion.div>
      </div>

      {/* Bottom Row: Social Icons (Left), Scroll Indicator (Right) */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 pb-8 sm:pb-10 flex items-end justify-between">
        {/* Bottom Left: GitHub and Instagram vertical stack */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className={`flex flex-col items-center space-y-4 transition-colors duration-500 ${
            isDark ? "text-gray-400" : "text-neutral-500"
          }`}
        >
          <a
            href="https://github.com/mrvishalg2004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className={`transition-all duration-200 transform hover:scale-110 ${
              isDark ? "hover:text-white" : "hover:text-neutral-950"
            }`}
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className={`transition-all duration-200 transform hover:scale-110 ${
              isDark ? "hover:text-white" : "hover:text-neutral-950"
            }`}
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </motion.div>

        {/* Bottom Right: Vertical Scroll button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <a
            href="#about"
            onClick={handleScrollDown}
            className={`flex flex-col items-center transition-colors duration-200 cursor-pointer group ${
              isDark ? "text-gray-400 hover:text-white" : "text-neutral-500 hover:text-neutral-950"
            }`}
            aria-label="Scroll to About section"
          >
            <span className="[writing-mode:vertical-rl] tracking-[0.28em] text-xs sm:text-sm uppercase font-medium font-sans group-hover:tracking-[0.35em] transition-all duration-300">
              Scroll
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
