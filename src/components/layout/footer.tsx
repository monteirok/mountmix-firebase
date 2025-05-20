import { Mountain, Martini, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/common/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Logo className="mb-4 text-secondary-foreground hover:text-secondary-foreground/80" />
            <p className="text-sm text-center md:text-left">
              Crafting unforgettable cocktail experiences in the heart of the Canadian Rockies.
            </p>
          </div>
          
          <nav className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <Link href="#services" className="hover:text-accent transition-colors">Services</Link>
            <Link href="#gallery" className="hover:text-accent transition-colors">Gallery</Link>
            <Link href="#concierge" className="hover:text-accent transition-colors">Cocktail Concierge</Link>
            <Link href="#contact" className="hover:text-accent transition-colors">Contact Us</Link>
          </nav>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook size={24} /></Link>
              <Link href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram size={24} /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><Twitter size={24} /></Link>
            </div>
            <p className="text-sm mt-4">Canmore, AB, Canada</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm">
          <p>&copy; {currentYear} Rockies Libations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
