import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CallToAction: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Subtle Parallax on the Grid
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: comp.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 50,
        ease: "none"
      });

      // 2. Text Reveal
      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      });

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative overflow-hidden py-24 md:py-32">

      {/* --- Light Background Layer --- */}
      <div ref={bgRef} className="absolute inset-0 z-0">


        {/* Technical Grid Texture */}
        <div className="absolute inset-0 opacity-[0.4]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        </div>

        {/* Abstract Glow Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 mix-blend-multiply"></div>
      </div>

      {/* --- Content Layer --- */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="cta-content max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nz-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nz-accent"></span>
            </span>
            <span className="text-slate-600 text-sm font-bold tracking-wide uppercase">Booking Spots Fast</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl md:leading-tight font-bold text-slate-900 mb-6 tracking-tight">
            Don't Settle For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nz-accent to-sky-600">Less Than Perfect.</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your property deserves a premium finish that lasts. Let our experts handle the hard work while you enjoy the results.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">

            {/* Primary Button */}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-slate-900 px-8 py-4 text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/30"
            >
              <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-lg">
                Get Your Free Quote
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </div>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </button>

            {/* Secondary Button (Updated with Phone Number) */}
            <a
              href="tel:0272161893"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
            >
              <Phone size={20} className="text-nz-accent" />
              <span>Call 0272161893</span>
            </a>

          </div>

          <p className="mt-8 text-sm text-slate-400 font-medium">
            No obligation. 100% Free Estimate.
          </p>

        </div>
      </div>
    </section>
  );
};