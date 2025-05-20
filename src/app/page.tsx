
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { AboutSection } from '@/components/sections/about-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ContactSection } from '@/components/sections/contact-section'; // This is now the modal
import { CocktailConciergeSection } from '@/components/sections/cocktail-concierge-section';

export default function HomePage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleOpenQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onOpenQuoteModal={handleOpenQuoteModal} />
      <main className="flex-grow">
        <HeroSection onOpenQuoteModal={handleOpenQuoteModal} />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <CocktailConciergeSection />
        {/* ContactSection (modal) is rendered below, outside the main flow */}
      </main>
      <Footer onOpenQuoteModal={handleOpenQuoteModal} />
      
      <ContactSection 
        isOpen={isQuoteModalOpen} 
        onOpenChange={setIsQuoteModalOpen} 
      />
    </div>
  );
}
