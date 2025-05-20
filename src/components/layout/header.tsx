'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'; // Added SheetTitle
import { Logo } from '@/components/common/logo';
// import { ThemeToggle } from '@/components/common/theme-toggle';
import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

export function Header({ onOpenQuoteModal }: HeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Concierge', href: '#concierge' },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b" : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {/* <ThemeToggle /> */}
          <Link href="https://instagram.com/mountain.mixology" aria-label="Instagram" className="hover:text-accent transition-colors" target='_blank'><Instagram size={24} /></Link>
          <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={onOpenQuoteModal}>
            Book Now
          </Button>
        </nav>
        <div className="md:hidden flex items-center space-x-2">
          {/* <ThemeToggle /> */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] bg-background p-6"
              hideDefaultCloseButton={true}
            >
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle> {/* Accessible title */}
              <div className="mb-8 flex justify-between items-center">
                <Logo />
                <Button variant="ghost" size="icon" onClick={closeSheet} className="-mr-2">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4 justify-center items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeSheet}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="https://instagram.com/mountain.mixology" aria-label="Instagram" className="hover:text-accent transition-colors" onClick={closeSheet} target="_blank"><Instagram size={24} /></Link>
                <Button variant="default" size="lg" className="w-[10rem] mt-4 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => { onOpenQuoteModal(); closeSheet(); }}>
                  Book Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
