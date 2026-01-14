import React, { useRef, useLayoutEffect } from 'react';
import { SEO } from './SEO';
import { Button } from './ui/Button';
import { CheckCircle2, Phone, ArrowRight, MapPin, Star, Clock } from 'lucide-react';
import gsap from 'gsap';
import { useContent } from '../context/ContentContext';

const FEATURES = [
  "Licensed Master Painters",
  "10-Year Workmanship Warranty",
  "100% Kiwi Owned & Operated"
];

export const Hero: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);
  const { hero, loading } = useContent();
  const heroData = hero; // Alias for easier refactoring

  // Default data if hero is null (though context should handle this or return null)
  const defaultHero = {
    title: 'Premium House Painters',
    subtitle: 'Transform your property with NZ\'s most trusted experts in <strong>Interior</strong>, <strong>Exterior</strong>, and <strong>Roof Painting</strong>.<br/>We deliver flawless finishes on time, every time.',
    bgImageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop',
    primaryBtnText: 'Get Your Free Quote',
    primaryBtnLink: '#contact',
    secondaryBtnText: 'Call 0272161893',
    secondaryBtnLink: 'tel:0272161893'
  };

  const displayData = heroData || defaultHero;

  useLayoutEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Background Image Intro
      tl.from("#hero-bg", {
        scale: 1.15,
        filter: "blur(10px)",
        duration: 2.5,
        ease: "power2.out"
      }, 0);

      // 2. Text Reveal
      tl.from(".hero-anim", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        clearProps: "all"
      }, 0.3);

      // 3. Button Container Fade In
      tl.from("#hero-cta-container", {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        ease: "back.out(1.2)"
      }, 0.8);

    }, comp);
    return () => ctx.revert();
  }, [loading]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrimaryClick = () => {
    if (displayData?.primaryBtnLink?.startsWith('#')) {
      document.getElementById(displayData.primaryBtnLink.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    } else if (displayData?.primaryBtnLink) {
      window.location.href = displayData.primaryBtnLink;
    }
  };

  const handleSecondaryClick = () => {
    if (displayData?.secondaryBtnLink) {
      window.location.href = displayData.secondaryBtnLink;
    }
  };

  if (loading) {
    return (
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-slate-900">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-20 text-white">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            <div className="h-12 bg-slate-700 rounded w-1/2"></div>
            <div className="h-6 bg-slate-700 rounded w-2/3"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={comp}
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* --- SEO METADATA --- */}
      <SEO
        title="Premium House Painters NZ | Interior & Exterior Painting Services"
        description="Top-rated residential and commercial painters in Auckland, Wellington & Christchurch. Get a free quote for interior, exterior, and roof painting today."
        keywords="painters NZ, house painting, commercial painters, roof painting, exterior painting, interior painting"
        image={displayData?.bgImageUrl}
        type="website"
      />

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 bg-slate-900 pointer-events-none">
        <img
          id="hero-bg"
          src={displayData?.bgImageUrl || "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop"}
          alt="Premium exterior house painting in New Zealand"
          fetchPriority="high"
          className="w-full h-full object-cover object-center opacity-85"
        />
        {/* Gradient Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-20 text-white">
        <div className="max-w-4xl">

          {/* Trust Badge */}
          <div className="hero-anim hidden sm:inline-flex flex-wrap items-center gap-x-3 gap-y-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-sky-200 mb-8 border border-white/10 ring-1 ring-white/5 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-white">
                {displayData?.availabilityText || 'Accepting Jobs for Summer 2026'}
              </span>
            </div>
            <span className="h-4 w-px bg-white/20"></span>
            <div className="flex items-center gap-1.5 text-sky-100/80">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {displayData?.locations || 'Auckland • Wellington • Christchurch'}
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            <span className="hero-anim block text-slate-100 drop-shadow-lg">
              {displayData?.title || 'Premium House Painters'}
            </span>
            <span className="hero-anim block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-white pb-2">
              & Commercial Decorators.
            </span>
          </h1>

          {/* Subheading with HTML support */}
          <p
            className="hero-anim text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl drop-shadow-md font-light"
            dangerouslySetInnerHTML={{
              __html: displayData?.subtitle || displayData?.description || 'Transform your property with expert painting services.'
            }}
          />

          {/* --- CTA SECTION (Buttons) --- */}
          <div id="hero-cta-container" className="flex flex-col gap-4 mb-14 relative z-30">
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Primary Button */}
              {displayData?.primaryBtnText && (
                <Button
                  size="lg"
                  onClick={handlePrimaryClick}
                  className="relative overflow-hidden h-16 rounded-xl text-lg font-bold px-10 shadow-[0_0_40px_-10px_rgba(14,165,233,0.6)] bg-sky-500 hover:bg-sky-400 border-t border-white/20 hover:scale-105 transition-all duration-300 group"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"></div>

                  <span className="relative z-20 flex items-center">
                    {displayData.primaryBtnText}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              )}

              {/* Secondary Button */}
              {displayData?.secondaryBtnText && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSecondaryClick}
                  className="h-16 rounded-xl border-white/10 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 px-8 transition-all duration-300 text-lg font-medium"
                >
                  <Phone className="mr-3 h-5 w-5 fill-current" />
                  {displayData.secondaryBtnText}
                </Button>
              )}
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400 pl-2">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-slate-300 font-medium">4.9/5 Rating</span>
              </div>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600"></span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Fast reply: usually within 1 hour</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="hero-anim flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-slate-300 border-t border-white/10 pt-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="p-1.5 rounded-full bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <CheckCircle2 className="text-green-400 h-4 w-4" />
                </div>
                <span className="tracking-wide text-slate-200">{feature}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};