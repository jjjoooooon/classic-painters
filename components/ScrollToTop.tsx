import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useUI } from '../context/UIContext';

export const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isMobileMenuOpen } = useUI();

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Hide if mobile menu is open OR if not scrolled enough
    const shouldShow = isVisible && !isMobileMenuOpen;

    return (
        <div className={`fixed bottom-8 md:bottom-8 bottom-24 right-8 z-50 transition-all duration-300 transform ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <button
                onClick={scrollToTop}
                className="bg-slate-900 hover:bg-nz-accent text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
        </div>
    );
};
