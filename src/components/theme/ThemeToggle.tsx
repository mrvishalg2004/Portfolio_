import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-14 h-7 rounded-full p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer overflow-hidden select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.3),0_1px_4px_rgba(0,0,0,0.15)] transition-all duration-200 active:scale-95 border border-white/20 dark:border-white/15"
    >
      {/* Background Track for Light Mode (Day Sky) */}
      <motion.div
        initial={false}
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-sky-300 via-sky-200 to-blue-200 rounded-full"
      >
        {/* Soft Day Clouds / Shine dots matching user's image */}
        <div className="absolute top-1 right-3 w-1.5 h-1.5 bg-white/80 rounded-full" />
        <div className="absolute top-3.5 right-4 w-2 h-2 bg-white/70 rounded-full" />
        <div className="absolute bottom-1 right-2 w-1 h-1 bg-white/60 rounded-full" />
      </motion.div>

      {/* Background Track for Dark Mode (Night Sky with Stars) */}
      <motion.div
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-full"
      >
        {/* Twinkling Stars */}
        <div className="absolute top-1.5 left-3 w-1 h-1 bg-white/90 rounded-full animate-pulse" />
        <div className="absolute top-3.5 left-5 w-1.5 h-1.5 bg-white/80 rounded-full" />
        <div className="absolute top-1.5 left-7 w-1 h-1 bg-amber-200/80 rounded-full" />
        <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-white/60 rounded-full" />
      </motion.div>

      {/* Sliding Knob with Smooth Spring Physics Animation */}
      <motion.div
        initial={false}
        animate={{
          x: isDark ? 28 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="relative z-10 w-6 h-6 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center pointer-events-none"
      >
        {/* Sun Knob (Light Mode) */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-[1.5px] border-white shadow-[0_0_8px_rgba(251,191,36,0.6)] flex items-center justify-center"
        >
          {/* Inner ring highlight */}
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-200 to-amber-400 opacity-90" />
        </motion.div>

        {/* Moon Knob (Dark Mode) */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-slate-900 border-[1.5px] border-indigo-300/40 shadow-[0_0_8px_rgba(99,102,241,0.4)] flex items-center justify-center overflow-hidden"
        >
          {/* Crescent Moon */}
          <div className="relative w-3.5 h-3.5 rounded-full bg-amber-100">
            {/* Shadow cutout creating crescent */}
            <div className="absolute -right-1 -top-0.5 w-3 h-3 rounded-full bg-slate-900" />
          </div>
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
