import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Paintbrush, ArrowRight, ChevronRight, Calculator } from 'lucide-react';
import { Button } from './ui/Button';
import { useContent } from '../context/ContentContext';
import { useUI } from '../context/UIContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { settings } = useContent();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse navbar links from settings
  const navLinks = React.useMemo(() => {
    if (settings.navbarLinks) {
      try {
        const parsed = typeof settings.navbarLinks === 'string'
          ? JSON.parse(settings.navbarLinks)
          : settings.navbarLinks;
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((link: any) => ({
            name: link.label || link.name,
            href: link.url || link.href
          }));
        }
      } catch (e) {
        console.error("Error parsing navbar links:", e);
      }
    }
    return [
      { name: 'Services', href: '#services' },
      { name: 'Our Work', href: '#gallery' },
      { name: 'Why Us', href: '#why-us' },
      { name: 'Reviews', href: '#testimonials' },
    ];
  }, [settings.navbarLinks]);

  const contactPhone = settings.contactPhone || '0220963037';
  const ctaText = settings.navbarCtaText || 'Get a Quote';
  const ctaLink = settings.navbarCtaLink || '#contact';

  // Handle navigation for hash links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Close mobile menu first
    setIsMobileMenuOpen(false);

    // If it's a hash link (starts with #)
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);

      // If we're not on the home page, navigate there first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation and page render
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        // Already on home page, scroll immediately without delay
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Not a hash link, navigate normally
      window.location.href = href;
    }
  };

  // 1. Handle Initial Fade-In
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        // Added `isMounted` check for opacity. 
        // Removed `transition-all` from here to prevent padding jumps, applied specific transitions instead.
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${isMounted ? 'opacity-100' : 'opacity-0'
          } ${isScrolled ? 'py-4' : 'py-6 lg:py-8'}`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">

          {/* Main Navbar Card */}
          <div
            className={`relative flex items-center justify-between rounded-full transition-all duration-300 border ${isScrolled
              ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-200/60 py-3 pl-5 pr-3'
              : 'bg-transparent border-transparent py-2 px-0'
              }`}
          >

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group relative z-20">
              {(settings.headerLogo || settings.logo) ? (
                <img
                  src={settings.headerLogo || settings.logo}
                  alt="Classic Painters"
                  className="object-contain"
                  style={{
                    width: settings.headerLogoWidth || 'auto',
                    height: settings.headerLogoHeight || '40px'
                  }}
                />
              ) : (
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isScrolled
                    ? 'bg-nz-accent text-white shadow-lg shadow-sky-500/20'
                    : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'
                    }`}
                >
                  <Paintbrush size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                </div>
              )}
              <div className="flex flex-col">
                <span
                  className={`text-lg font-bold tracking-tight leading-none transition-colors duration-300 ${isScrolled ? 'text-slate-900' : isMobileMenuOpen ? 'text-slate-900' : 'text-white'
                    }`}
                >
                  Classic Painters
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ul
                className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-slate-100/50' : 'bg-white/10 backdrop-blur-md border border-white/10'
                  }`}
              >
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${isScrolled
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                        : 'text-slate-200 hover:text-white hover:bg-white/20'
                        }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${contactPhone.replace(/\s/g, '')}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${isScrolled
                  ? 'border-transparent text-slate-600 hover:bg-slate-50'
                  : 'border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm'
                  }`}
              >
                <Phone size={16} className={isScrolled ? "text-nz-accent" : "text-sky-300"} />
                <span className="hidden xl:inline">{contactPhone}</span>
              </a>

              <Button
                onClick={() => {
                  if (ctaLink.startsWith('#')) {
                    document.getElementById(ctaLink.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = ctaLink;
                  }
                }}
                className={`rounded-xl px-6 py-2.5 h-auto text-sm shadow-lg shadow-sky-500/20 transition-transform hover:scale-105 active:scale-95 ${!isScrolled && "bg-white text-nz-accent hover:bg-sky-50 border-0"
                  }`}
              >
                {ctaText}
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden relative z-50 p-2.5 rounded-xl transition-all duration-300 ${isMobileMenuOpen
                ? 'bg-slate-100 text-slate-900 rotate-90'
                : isScrolled
                  ? 'hover:bg-slate-100 text-slate-700'
                  : 'bg-white/10 text-white border border-white/20 backdrop-blur-md'
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      <div
        className={`fixed inset-0 z-[41] bg-white/95 backdrop-blur-xl flex flex-col pt-28 pb-10 px-6 overflow-y-auto transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <div className="flex flex-col h-full max-w-lg mx-auto w-full">
          <div className="flex flex-col gap-2 mb-auto">
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4 pl-1">Menu</span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer"
              >
                <span className="text-3xl font-bold text-slate-900 group-hover:text-nz-accent transition-colors">
                  {link.name}
                </span>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-nz-accent group-hover:text-white transition-all transform group-hover:-rotate-45">
                  <ArrowRight size={20} />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 bg-slate-50 p-5 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-nz-accent">
                <Calculator size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Ready to start?</h4>
                <p className="text-sm text-slate-500">Get a rough estimate in minutes.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-md text-slate-700"
                onClick={() => window.location.href = `tel:${contactPhone.replace(/\s/g, '')}`}
              >
                <Phone size={16} className="mr-2" />
                Call Us
              </Button>
              <Button
                className="rounded-xl shadow-lg text-sm shadow-sky-500/20"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (ctaLink.startsWith('#')) {
                    document.getElementById(ctaLink.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = ctaLink;
                  }
                }}
              >
                {ctaText}
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-xs font-medium text-slate-400 px-2">
            <span>© 2026 Classic Painters</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-600">Privacy</a>
              <a href="#" className="hover:text-slate-600">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};