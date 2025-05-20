import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { ContactSection } from '@/components/sections/contact-section';
import { CocktailConciergeSection } from '@/components/sections/cocktail-concierge-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <CocktailConciergeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
