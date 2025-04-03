"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for header height
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-2xl font-bold"
          >
            Portfolio
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`hover:text-primary transition-colors ${activeSection === 'home' ? 'text-primary' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`hover:text-primary transition-colors ${activeSection === 'about' ? 'text-primary' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`hover:text-primary transition-colors ${activeSection === 'projects' ? 'text-primary' : ''}`}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className={`hover:text-primary transition-colors ${activeSection === 'blog' ? 'text-primary' : ''}`}
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`hover:text-primary transition-colors ${activeSection === 'contact' ? 'text-primary' : ''}`}
            >
              Contact
            </button>
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="relative"
                  >
                    {theme === 'dark' ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/80 backdrop-blur-sm">
              <button
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 ${activeSection === 'home' ? 'bg-primary/10' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 ${activeSection === 'about' ? 'bg-primary/10' : ''}`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`block w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 ${activeSection === 'projects' ? 'bg-primary/10' : ''}`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className={`block w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 ${activeSection === 'blog' ? 'bg-primary/10' : ''}`}
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 ${activeSection === 'contact' ? 'bg-primary/10' : ''}`}
              >
                Contact
              </button>
              <div className="px-3 py-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="relative"
                    >
                      {theme === 'dark' ? (
                        <Moon className="h-5 w-5" />
                      ) : (
                        <Sun className="h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
