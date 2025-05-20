'use client';

import { Martini } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      // If already on the homepage, prevent default and scroll smoothly to top
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    // If on another page, let Next.js Link component handle navigation to "/"
  };

  return (
    <Link 
      href="/" 
      onClick={handleLogoClick}
      className={`flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors ${className}`}
    >
      <Martini className="h-7 w-7 text-accent" />
      <span>Mountain Mixology</span>
    </Link>
  );
}
