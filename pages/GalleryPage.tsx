import React, { useRef, useLayoutEffect } from 'react';
import { SEO } from '../components/SEO';
import { Gallery } from '../components/Gallery';
import gsap from 'gsap';
import { Camera, ArrowDown } from 'lucide-react';

export const GalleryPage: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);

    // Scroll to top & Animation
    useLayoutEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Text Stagger
            gsap.from(".gallery-header-anim", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO
                title="Our Work | Premium Painting Portfolio NZ"
                description="Browse our portfolio of completed residential and commercial painting projects in Auckland and Wellington. See the quality craftsmanship we deliver."
                keywords="painting portfolio NZ, completed projects, residential painting, commercial painting"
                type="website"
            />

            <div className="min-h-screen bg-slate-50">
                {/* --- 1. Dark Hero Section (Supports Transparent Navbar) --- */}
                <section
                    ref={headerRef}
                    className="relative pt-40 pb-32 lg:pt-52 lg:pb-48 bg-slate-900 overflow-hidden"
                >
                    {/* Abstract Background for texture */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-sky-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-nz-accent/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
                        {/* Grid Pattern overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        {/* Badge */}
                        <div className="gallery-header-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sky-200 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Camera size={14} />
                            <span>Our Portfolio</span>
                        </div>

                        {/* Title */}
                        <h1 className="gallery-header-anim text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                            Craftsmanship in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
                                Every Detail.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="gallery-header-anim text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Explore our curated collection of residential transformations and commercial projects across New Zealand.
                        </p>
                    </div>
                </section>

                {/* --- 2. Gallery Content with "Overlap" Effect --- */}
                <div className="relative z-20 -mt-20 lg:-mt-24 px-4 pb-20">
                    <div className="container mx-auto">
                        {/* The Gallery component sits inside this white card or directly on the background.
                           Here I wrap it to give it structure and separation from the footer.
                        */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-4 md:p-8 min-h-[500px]">
                            {/* Filter tabs could go here inside the Gallery component */}
                            <Gallery />
                        </div>
                    </div>
                </div>

                {/* --- 3. Bottom CTA --- */}
                <section className="py-20 bg-slate-50 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Inspired by what you see?</h2>
                        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                            Let's discuss how we can bring this level of quality to your next project.
                        </p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                        >
                            Start Your Project
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};