
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '@/components/common/logo';

interface FooterProps {
  onOpenQuoteModal: () => void; // Retain for potential future use if "Book Now" or similar is added to footer
}

export function Footer({ onOpenQuoteModal }: FooterProps) {
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
            <Link href="#services" className="hover:text-accent transition-colors text-sm">Services</Link>
            <Link href="#gallery" className="hover:text-accent transition-colors text-sm">Gallery</Link>
            <Link href="#concierge" className="hover:text-accent transition-colors text-sm">Cocktail Concierge</Link>
            {/* Removed Contact Us button. Can be replaced with a Book Now button if desired.
            <button 
              onClick={onOpenQuoteModal} 
              className="hover:text-accent transition-colors text-sm"
              aria-label="Open contact form modal"
            >
              Contact Us
            </button>
            */}
          </nav>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* <Link href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook size={24} /></Link> */}
              <Link href="https://instagram.com/mountain.mixology" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram size={24} /></Link>
              {/* <Link href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><Twitter size={24} /></Link> */}
            </div>
            <p className="text-sm mt-4">Canmore, AB, Canada</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm">
          <p>&copy; {currentYear} Mountain Mixology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
