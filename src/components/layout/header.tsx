'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/common/logo';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Concierge', href: '#concierge' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
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
          <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6">
              <div className="mb-8 flex justify-between items-center">
                <Logo />
                <Button variant="ghost" size="icon" onClick={closeSheet} className="-mr-2">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
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
                <Button asChild variant="default" size="lg" className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={closeSheet}>
                  <Link href="#contact">Get a Quote</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
