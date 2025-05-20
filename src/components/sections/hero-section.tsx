
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
}

export function HeroSection({ onOpenQuoteModal }: HeroSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={targetRef} className="relative h-[calc(100vh-5rem)] min-h-[600px] md:min-h-[700px] overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ 
          scale,
          y,
        }}
      >
        <Image
          src="https://placehold.co/1920x1280.png"
          alt="Panoramic view of the Canadian Rockies with a hint of a cocktail setup"
          data-ai-hint="rockies landscape"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Overlay for text contrast */}
      </motion.div>

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4"
        style={{ opacity }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Elevate Your Event with
          <br />
          <span className="text-accent block mt-2 md:mt-4">Mountain Mixology</span>
        </motion.h1>
        <motion.p 
          className="mt-6 max-w-xl text-lg sm:text-xl md:text-2xl text-neutral-200 drop-shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Premium craft-cocktail catering service in Canmore, AB, bringing sophistication and mountain charm to your special occasions.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-10"
        >
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-xl transform hover:scale-105 transition-transform"
            onClick={onOpenQuoteModal}
            aria-label="Book our services"
          >
            Book Now
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1,0]) }}
        >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.div>
    </section>
  );
}
