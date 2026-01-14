import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { Section } from './ui/Section';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface GalleryProps {
  limit?: number;
}

export const Gallery: React.FC<GalleryProps> = ({ limit }) => {
  const comp = useRef<HTMLDivElement>(null);
  const { gallery } = useContent();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create a timeline for better control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 85%", // Trigger earlier
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".gallery-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all" // Clear properties after animation to prevent stacking context issues
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  // Helper to cycle through grid classes
  const getGridClass = (index: number) => {
    const patterns = [
      "md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[500px]",
      "md:col-span-1 md:row-span-1 min-h-[250px]",
      "md:col-span-1 md:row-span-2 min-h-[300px] md:min-h-[500px]",
      "md:col-span-1 md:row-span-1 min-h-[250px]",
      "md:col-span-1 md:row-span-1 min-h-[250px]",
      "md:col-span-1 md:row-span-1 min-h-[250px]"
    ];
    return patterns[index % patterns.length];
  };

  const projects = useMemo(() => {
    return gallery.map((img: any, index: number) => ({
      src: img.src,
      category: img.projectName || img.category, // Use projectName if available, else category
      alt: img.title || img.category, // Use title for alt text
      className: getGridClass(index)
    }));
  }, [gallery]);

  return (
    <div ref={comp}>
      <Section id="gallery">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="lg:max-w-2xl w-full ">
            <div className='flex-col flex justify-end w-full items-center lg:items-start'>
              <span className="text-nz-accent font-semibold tracking-wider uppercase text-sm">Recent Projects</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Our Latest Work</h2>
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-slate-500">Transforming spaces across New Zealand.</p>
          </div>
        </div>

        <div className="gallery-grid grid grid-cols-1 md:grid-cols-4 gap-4">
          {projects.slice(0, limit || projects.length).map((project, index) => (
            <div key={index} className={`gallery-item group relative overflow-hidden rounded-3xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-200 ${project.className}`}>
              <img
                src={project.src}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

              {/* Floating Label */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                <ArrowUpRight size={20} className="text-slate-900" />
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-xs font-bold text-nz-accent uppercase tracking-wider mb-1">Project</p>
                  <h3 className="text-slate-900 font-bold text-lg leading-none">{project.category}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {limit && limit < projects.length && (
          <div className="mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-nz-accent transition-colors duration-300"
            >
              View All Projects
              <ArrowUpRight size={20} />
            </Link>
          </div>
        )}
      </Section>
    </div>
  );
};