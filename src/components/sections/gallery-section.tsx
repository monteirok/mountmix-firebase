'use client';

import Image from 'next/image';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { motion } from 'framer-motion';
import {ImageIcon} from 'lucide-react';

const galleryImages = [
  { src: 'https://placehold.co/600x400.png', alt: 'Elegant cocktail presentation at an event', hint: 'cocktail event' },
  { src: 'https://placehold.co/600x800.png', alt: 'A signature craft cocktail with mountain backdrop', hint: 'cocktail mountains' },
  { src: 'https://placehold.co/800x600.png', alt: 'Guests enjoying drinks at a mountain party', hint: 'mountain party' },
  { src: 'https://placehold.co/600x400.png', alt: 'Close-up of a colorful, garnished drink', hint: 'elegant drinks' },
  { src: 'https://placehold.co/800x600.png', alt: 'Stylish mobile bar setup for an outdoor event', hint: 'bar setup' },
  { src: 'https://placehold.co/600x800.png', alt: 'Mixologist crafting a drink with precision', hint: 'mixology service' },
  { src: 'https://placehold.co/600x400.png', alt: 'Array of cocktails ready for serving', hint: 'cocktails display' },
  { src: 'https://placehold.co/600x400.png', alt: 'Happy clients at a catered wedding', hint: 'wedding catering' },
];

const variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function GallerySection() {
  return (
    <SectionWrapper id="gallery">
      <div className="text-center mb-12 md:mb-16">
        <ImageIcon className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Moments We've Crafted</h2>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
          A glimpse into the vibrant atmosphere and exquisite cocktails that define our service.
        </p>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg break-inside-avoid group relative"
            custom={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              width={600} // Intrinsic width for aspect ratio calculation
              height={index % 3 === 1 ? 800 : 400} // Varying heights for masonry effect
              className="object-cover w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
              <p className="text-white text-sm text-center drop-shadow-md">{image.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
