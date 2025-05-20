
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/common/logo';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { cn } from '@/lib/utils';

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
    { label: 'Gallery', href: '#gallery' },
    { label: 'Concierge', href: '#concierge' },
    { label: 'Contact', action: onOpenQuoteModal, isButton: true as const },
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
            item.isButton && item.action ? (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                aria-label={`Open ${item.label} modal`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )
          ))}
          <ThemeToggle />
          <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={onOpenQuoteModal}>
            Get a Quote
          </Button>
        </nav>
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
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
                  item.isButton && item.action ? (
                    <button
                      key={item.label}
                      onClick={() => { item.action!(); closeSheet(); }}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                      aria-label={`Open ${item.label} modal`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href!}
                      onClick={closeSheet}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
                <Button variant="default" size="lg" className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => { onOpenQuoteModal(); closeSheet(); }}>
                  Get a Quote
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
