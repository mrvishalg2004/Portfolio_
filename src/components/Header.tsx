
import React, { useState, useEffect } from "react";
import ThemeToggle from "./theme/ThemeToggle";
import { useTheme } from "./theme/ThemeProvider";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Scrolled past top threshold
      if (currentY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentY <= 30) {
        setIsVisible(true);
      } else if (currentY > lastY && currentY - lastY > 4) {
        // Scrolling Down -> Hide
        setIsVisible(false);
      } else if (currentY < lastY && lastY - currentY > 4) {
        // Scrolling Up -> Show
        setIsVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Custom smooth scroll function with easing
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Close mobile menu if it's open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the target's position
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      // Adjust for header height (approx 70px)
      const offsetPosition = targetPosition - 70;
      // Current position
      const startPosition = window.scrollY;
      // Distance to scroll
      const distance = offsetPosition - startPosition;
      // Duration in ms
      const duration = 800;
      // Start time
      let startTime: number | null = null;
      
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smoother motion (easeInOutCubic)
        const ease = (t: number) => {
          return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        window.scrollTo({
          top: startPosition + distance * ease(progress),
          behavior: 'auto' // We manually control the animation so we use 'auto'
        });
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certificates", href: "#certificates" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const isLight = theme === "light";

  // Floating rounded glass pill box overlay on all screen sizes (mobile & desktop)
  const containerClasses = isLight
    ? isScrolled
      ? "bg-white/85 border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 text-slate-900 rounded-full px-4 sm:px-6 py-2 sm:py-2.5"
      : "bg-white/70 hover:bg-white/85 border border-slate-300/70 shadow-[0_8px_30px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-2xl text-slate-900 rounded-full px-4 sm:px-6 py-2 sm:py-2.5"
    : isScrolled
      ? "bg-[#141416]/85 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl backdrop-saturate-150 text-white rounded-full px-4 sm:px-6 py-2 sm:py-2.5"
      : "bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl text-white rounded-full px-4 sm:px-6 py-2 sm:py-2.5";

  const logoNameClass = isLight ? "text-slate-950" : "text-white";
  const logoAccentClass = isLight ? "text-[#d97706]" : "text-[#e59a18]";

  const linkClass = isLight
    ? "text-slate-800 hover:text-black hover:bg-black/5"
    : "text-white/90 hover:text-white hover:bg-white/15";

  const mobileBtnClass = isLight ? "text-slate-800 hover:bg-black/5" : "text-gray-200 hover:bg-white/10";

  return (
    <header
      className={`fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300 ease-in-out transform ${
        isVisible || mobileMenuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-28 opacity-0"
      }`}
    >
      <div className="w-full max-w-6xl pointer-events-auto">
        {/* Container: Floating Glass pill overlay */}
        <div
          className={`w-full flex items-center justify-between transition-all duration-300 ${containerClasses}`}
        >
          {/* Logo / Name */}
          <a
            href="#home"
            onClick={(e) => smoothScroll(e, "home")}
            className="flex items-center group flex-shrink-0 transition-all duration-300 hover:opacity-85"
          >
            <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight">
              <span className={`${logoNameClass} font-extrabold tracking-wide`}>VISHAL</span>
              <span className={`${logoAccentClass} ml-1.5 font-black`}>GOLHAR</span>
            </h1>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href.substring(1))}
                className={`text-xs xl:text-sm font-medium px-2.5 xl:px-3 py-1.5 rounded-full transition-all duration-200 ${linkClass}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Premium Gradient Resume Button & Theme Toggle (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <a
              href="/Vishal_Golhar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full bg-gradient-to-r from-[#e59a18] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbbf24] text-neutral-950 shadow-[0_2px_10px_rgba(229,154,24,0.35)] hover:shadow-[0_4px_16px_rgba(229,154,24,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-200"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
            <div className="flex items-center pl-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button - Clean animated toggle */}
          <div className="flex lg:hidden items-center">
            <button
              className={`p-2 rounded-full focus:outline-none transition-all duration-200 active:scale-90 ${mobileBtnClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <X className="w-5 h-5 stroke-[2.2]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <Menu className="w-5 h-5 stroke-[2.2]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Card with Smooth Cohesive Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, scale: 0.95, filter: "blur(8px)" }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: "top center", willChange: "transform, opacity, filter" }}
              className={`lg:hidden mt-2.5 p-5 rounded-3xl border backdrop-blur-3xl overflow-hidden ${
                isLight
                  ? "bg-white/92 border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)]"
                  : "bg-[#141416]/92 border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)]"
              }`}
            >
              <nav className="flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-medium text-sm px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
                      isLight
                        ? "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={(e) => smoothScroll(e, link.href.substring(1))}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="/Vishal_Golhar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 font-bold text-sm py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#e59a18] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbbf24] text-neutral-950 shadow-[0_2px_12px_rgba(229,154,24,0.35)] active:scale-95 transition-all mt-2"
                >
                  <span>View Resume</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-200/60 dark:border-white/10 px-2">
                  <span className={`text-xs font-medium ${isLight ? "text-slate-600" : "text-gray-400"}`}>
                    Theme Mode
                  </span>
                  <ThemeToggle />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
