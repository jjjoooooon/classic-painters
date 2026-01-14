import React, { useRef, useLayoutEffect } from 'react';
import { Section } from './ui/Section';
import * as LucideIcons from 'lucide-react'; // Imports all icons
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Dynamic Icon Helper ---
// This component takes a string name (e.g., "PaintBucket") and renders the icon.
const DynamicIcon = ({ name, className, size = 24 }: { name: string, className?: string, size?: number }) => {
  // @ts-ignore - Dynamic lookup of the icon component
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    // Fallback icon if the name doesn't exist
    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} strokeWidth={1.5} />;
};

// --- Automatic Icon Selection (Fallback) ---
const getAutomaticIcon = (title: string = '', description: string = '') => {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('residential') || text.includes('home') || text.includes('house')) return 'Home';
  if (text.includes('commercial') || text.includes('office') || text.includes('business')) return 'Building2';
  if (text.includes('interior') || text.includes('inside')) return 'PaintBucket';
  if (text.includes('exterior') || text.includes('outside')) return 'Layers';
  if (text.includes('roof')) return 'Ruler';
  if (text.includes('plaster') || text.includes('gib')) return 'Brush';
  if (text.includes('wash') || text.includes('clean')) return 'Droplets';
  if (text.includes('fence')) return 'Fence';
  if (text.includes('maintenance') || text.includes('repair')) return 'Wrench';
  return 'Brush';
};

export const Services: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);
  const { services, loading } = useContent();
  const servicesData = services; // Alias to match existing code usage

  // --- 3. Animations ---
  useLayoutEffect(() => {
    if (loading || servicesData.length === 0) return;

    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".service-header-item", {
        scrollTrigger: { trigger: comp.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Grid Cards Animation
      gsap.from(".bento-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      });
    }, comp);

    return () => ctx.revert();
  }, [loading, servicesData]);

  // --- 4. Grid Layout Logic (The "Bento" Style) ---
  const getCardStyle = (index: number) => {
    // Define specific layouts for the first few items to create visual interest
    if (index === 0) return "md:col-span-2 md:row-span-1 bg-slate-900 text-white"; // Wide Dark Card
    if (index === 1) return "md:col-span-1 md:row-span-2 bg-blue-600 text-white";  // Tall Accent Card
    if (index === 2) return "md:col-span-1 md:row-span-1 bg-white border-slate-200"; // Standard White
    return "md:col-span-1 md:row-span-1 bg-white border-slate-200"; // Default
  };

  return (
    <div ref={comp} className="bg-slate-50">
      <Section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="service-header-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Our Expertise
          </div>
          <h2 className="service-header-item text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Crafting Perfection <br className="hidden md:block" /> on Every Surface
          </h2>
          <p className="service-header-item text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From residential touch-ups to industrial overhauls, we bring professional precision to every project.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="services-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">

          {servicesData.map((service, index) => {
            const cardStyle = getCardStyle(index);
            const isDark = cardStyle.includes('text-white');
            const iconName = service.icon || getAutomaticIcon(service.title, service.description);

            return (
              <div
                key={service.id || index}
                className={`
                  bento-card group relative overflow-hidden rounded-[2.5rem] p-8 flex flex-col justify-between
                  transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                  ${isDark ? 'shadow-xl shadow-slate-900/10' : 'shadow-lg shadow-slate-200/50 border'}
                  ${cardStyle}
                `}
              >
                {/* Background Image (Optional: ensure your API returns 'bgImage') */}
                {service.bgImage && isDark && (
                  <div className="absolute inset-0 z-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/60 z-10" />
                  </div>
                )}

                {/* Decorative Gradients for Non-Image cards */}
                {!service.bgImage && isDark && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                )}
                {!service.bgImage && !isDark && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-blue-100 transition-colors" />
                )}

                {/* Content */}
                <div className="relative z-20">
                  <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-lg
                    backdrop-blur-md transition-all duration-300
                    ${isDark
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                    }
                  `}>
                    {/* DYNAMIC ICON USAGE */}
                    <DynamicIcon name={iconName} />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    {service.description}
                  </p>
                </div>

                {/* Arrow Action */}
                <div className="relative z-20 flex justify-end mt-4">
                  <div className={`
                    p-2 rounded-full transition-transform duration-300 group-hover:scale-110
                    ${isDark ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-900'}
                  `}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Call To Action Card (Always Last) */}
          <div
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bento-card md:col-span-1 md:row-span-1 bg-slate-900 text-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/40 via-slate-900 to-slate-900"></div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold">Have a custom project?</h3>
              <div className="flex justify-center items-center gap-2 text-blue-200 group-hover:text-white transition-colors">
                <span className='text-center'>Get a Quote</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};