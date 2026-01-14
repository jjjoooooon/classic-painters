import React, { useRef, useLayoutEffect } from 'react';
import { SEO } from '@/components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ShieldCheck, Users, Clock, Award, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/Button';


// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { label: "Years in Business", value: 15, suffix: "+" },
    { label: "Projects Completed", value: 1200, suffix: "+" },
    { label: "Master Painters", value: 24, suffix: "" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
];

const VALUES = [
    {
        icon: ShieldCheck,
        title: "Safety First",
        desc: "We are Site Safe accredited. We take no shortcuts when it comes to the safety of our crew and your property."
    },
    {
        icon: Clock,
        title: "Respect for Time",
        desc: "We show up when we say we will. We finish on the agreed date. No ghosting, no endless delays."
    },
    {
        icon: Award,
        title: "Master Craftsmanship",
        desc: "Every stroke is checked. We use premium paints (Resene/Dulux) and prep surfaces meticulously before painting."
    }
];

export const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // 1. Hero Text Stagger
            gsap.from(".about-hero-anim", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            });

            // 2. Stats Counter Animation
            STATS.forEach((_, i) => {
                const el = document.getElementById(`stat-${i}`);
                if (el) {
                    gsap.from(el, {
                        textContent: 0,
                        duration: 2,
                        ease: "power1.out",
                        snap: { textContent: 1 },
                        stagger: 1,
                        scrollTrigger: {
                            trigger: "#stats-section",
                            start: "top 80%",
                        }
                    });
                }
            });

            // 3. Values Cards Fade In
            gsap.from(".value-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: "#values-section",
                    start: "top 75%",
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-white min-h-screen">
            <SEO
                title="About Us | NZ Premium Painters"
                description="Learn about our team of licensed master painters. 100% Kiwi owned and operated, serving Auckland, Wellington, and Christchurch since 2010."
                keywords="licensed painters NZ, master painters, professional painting team, Kiwi owned painters"
                type="website"
            />

            {/* --- 1. HERO SECTION (Dark for Navbar) --- */}
            <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 bg-slate-900 overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-sky-500/20 rounded-full blur-[120px] -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-nz-accent/10 rounded-full blur-[100px] translate-y-1/3"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="about-hero-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sky-200 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Users size={14} />
                            <span>100% Kiwi Owned & Operated</span>
                        </div>

                        <h1 className="about-hero-anim text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                            More than just <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-100">
                                painters with a brush.
                            </span>
                        </h1>

                        <p className="about-hero-anim text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">
                            We started NZ Painters with a simple mission: to bring reliability back to the trades.
                            We are a team of licensed professionals who care as much about your property as you do.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 2. STATS SECTION --- */}
            <section id="stats-section" className="py-12 bg-sky-500 border-y border-sky-600">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex items-center justify-center text-4xl md:text-5xl font-bold text-white mb-2">
                                    <span id={`stat-${index}`}>{stat.value}</span>
                                    <span>{stat.suffix}</span>
                                </div>
                                <div className="text-sky-100 font-medium text-sm md:text-base uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 3. OUR STORY / CONTENT --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        {/* Image Grid */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?q=80&w=2070&auto=format&fit=crop"
                                    alt="Painters discussing a project plan"
                                    className="w-full h-full object-cover"
                                />
                                {/* Floating Card */}
                                <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-[200px] hidden md:block">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                                            <HardHat size={20} />
                                        </div>
                                        <span className="font-bold text-slate-900">Safety</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Site Safe Accredited Team Member</p>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                Why we are different.
                            </h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    We know the stereotypes of tradespeople: messy, late, and over budget.
                                    <strong className="text-slate-900"> We built our business to be the opposite.</strong>
                                </p>
                                <p>
                                    Since 2010, we have been transforming homes across New Zealand with a focus on preparation.
                                    We believe that 80% of a perfect paint job happens before the can is even opened.
                                    That involves meticulous sanding, gap filling, and priming.
                                </p>
                                <p>
                                    Whether it's a heritage villa in Ponsonby or a commercial warehouse in Christchurch,
                                    we treat every workspace with respect. We cover your furniture, protect your floors,
                                    and clean up every day.
                                </p>

                                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                                        <CheckCircle2 className="text-green-500" />
                                        <span>Licensed & Insured</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                                        <CheckCircle2 className="text-green-500" />
                                        <span>5-Year Warranty</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. CORE VALUES --- */}
            <section id="values-section" className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
                        <p className="text-slate-600">The principles that guide every brushstroke and client interaction.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {VALUES.map((item, idx) => (
                            <div key={idx} className="value-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5. CTA --- */}
            <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to work with the professionals?
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                        Get a detailed, fixed-price quote with no hidden surprises.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-100"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get Free Quote
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};