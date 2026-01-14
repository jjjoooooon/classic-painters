import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { useContent } from '../context/ContentContext';

export const StickyMobileCTA: React.FC = () => {
  const { settings } = useContent();

  const handleGetQuote = () => {
    const contactSection = document.getElementById('contact');
    const nameInput = document.getElementById('name') as HTMLInputElement;

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Focus the name input after scrolling completes
      setTimeout(() => {
        if (nameInput) {
          nameInput.focus();
        }
      }, 800); // Wait for smooth scroll to complete
    }
  };

  const handleCallNow = () => {
    const phone = settings.contactPhone || '0800PAINTER';
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-40 flex gap-3">
      <Button
        variant="secondary"
        className="flex-1 flex items-center justify-center gap-2"
        onClick={handleCallNow}
      >
        <Phone size={18} />
        Call Now
      </Button>
      <Button
        variant="primary"
        className="flex-1 flex items-center justify-center gap-2"
        onClick={handleGetQuote}
      >
        <CalendarCheck size={18} />
        Get Quote
      </Button>
    </div>
  );
};