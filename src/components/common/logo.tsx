import { Martini } from 'lucide-react';
import Link from 'next/link';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-colors ${className}`}>
      <Martini className="h-7 w-7 text-accent" />
      <span>Mountain Mixology</span>
    </Link>
  );
}
