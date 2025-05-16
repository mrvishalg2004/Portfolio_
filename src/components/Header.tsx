
import React, { useState, useEffect } from "react";
import ThemeToggle from "./theme/ThemeToggle";


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm py-2"
          : "py-3"
      }`}
    >
      <div className="container-custom flex items-center justify-between space-x-2 md:space-x-4">
        <a href="#home" onClick={(e) => smoothScroll(e, 'home')} className="flex items-center group flex-shrink-0 transition-all duration-300 hover:opacity-80">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
              <span className="text-gray-900 dark:text-white font-extrabold tracking-wide">VISHAL</span>
              <span className="text-brand-blue ml-2 font-black">GOLHAR</span>
            </h1>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6 justify-end flex-grow">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href.substring(1))}
              className="font-medium text-sm lg:text-base transition-all duration-300 relative group"
            >
              <span className="relative z-10 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-brand-blue group-hover:to-blue-400 group-hover:bg-clip-text">
                {link.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 via-brand-blue to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <div className="flex items-center ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 flex-shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${mobileMenuOpen ? "hidden" : "block"}`}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${mobileMenuOpen ? "block" : "hidden"}`}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 shadow-md absolute w-full transition-all duration-300 ease-in-out z-40 ${
          mobileMenuOpen
            ? "max-h-screen opacity-100 py-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="container-custom flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium py-2 transition-all duration-300 relative group"
              onClick={(e) => smoothScroll(e, link.href.substring(1))}
            >
              <span className="relative z-10 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-brand-blue group-hover:to-blue-400 group-hover:bg-clip-text">
                {link.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 via-brand-blue to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <div className="flex justify-center py-3 mt-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
