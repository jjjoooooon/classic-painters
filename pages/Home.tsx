import React from 'react';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Process } from '../components/Process';
import { BeforeAfter } from '../components/BeforeAfter';
import { Gallery } from '../components/Gallery';
import { Testimonials } from '../components/Testimonials';
import { CallToAction } from '../components/CallToAction';
import { ContactSection } from '../components/ContactSection';

export const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <TrustBar />
            <Services />
            <WhyChooseUs />
            <BeforeAfter />
            <Process />
            <Gallery limit={4} />
            <Testimonials />
            <CallToAction />
            <ContactSection />
        </>
    );
};
