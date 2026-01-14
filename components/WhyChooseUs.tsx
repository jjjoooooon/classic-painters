import React, { useRef, useLayoutEffect } from 'react';
import { Section } from './ui/Section';
import { CheckCircle2, Shield, Clock, BadgeDollarSign, Leaf, UserCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp}>
      <Section id="why-us" className="bg-slate-50">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-nz-accent font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose NZ Painters</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Quality You Can See, <br/><span className="text-nz-accent">Reliability You Can Trust</span></h2>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Main Visual - Large */}
          <div className="feature-card lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group shadow-lg min-h-[350px]">
            <img 
              src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2574&auto=format&fit=crop" 
              alt="Detailed painting work" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                 <p className="text-white text-xl font-bold border-l-4 border-nz-accent pl-4">"We don't just paint walls; we protect your investment."</p>
              </div>
            </div>
          </div>

          {/* Feature 1 - Quality */}
          <div className="feature-card bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-h-[200px]">
            <div className="w-10 h-10 bg-sky-100 text-nz-accent rounded-full flex items-center justify-center mb-4">
              <Shield size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2">5-Year Warranty</h3>
            <p className="text-slate-600 text-sm">Peace of mind with every job. We stand by our quality workmanship.</p>
          </div>

          {/* Feature 2 - Time */}
          <div className="feature-card bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-h-[200px]">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Clock size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2">On-Time Completion</h3>
            <p className="text-slate-600 text-sm">We respect your time. Projects are finished on schedule, every time.</p>
          </div>

          {/* Feature 3 - Eco */}
          <div className="feature-card bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-h-[200px]">
             <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Leaf size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2">Eco-Friendly Paints</h3>
            <p className="text-slate-600 text-sm">Low VOC options available to keep your family and the planet safe.</p>
          </div>

           {/* Feature 4 - Price */}
           <div className="feature-card bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-h-[200px]">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
              <BadgeDollarSign size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2">Transparent Pricing</h3>
            <p className="text-slate-600 text-sm">No hidden fees. Detailed quotes so you know exactly what you're paying for.</p>
          </div>

           {/* Wide Feature - Team */}
           <div className="feature-card lg:col-span-2 bg-nz-blue text-white p-8 rounded-3xl flex flex-col md:flex-row items-start lg:items-center gap-6 shadow-lg min-h-[200px]">
             <div className="p-4 bg-white/10 rounded-full shrink-0">
               <UserCheck size={32} className="text-sky-400" />
             </div>
             <div>
               <h3 className="font-bold text-xl mb-2">Vetted & Trained Professionals</h3>
               <p className="text-slate-300 text-sm">
                 Our painters are fully background-checked, insured, and trained in the latest techniques. You can trust us in your home.
               </p>
             </div>
           </div>

        </div>
      </Section>
    </div>
  );
};