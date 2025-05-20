
'use client';

import Image from 'next/image';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { motion } from 'framer-motion';
import { BookOpenText, MountainSnow, Users } from 'lucide-react';

const storyPoints = [
  {
    icon: <MountainSnow className="h-10 w-10 text-primary" />,
    title: 'Born in the Rockies',
    text: "Mountain Mixology wasn't born in a boardroom, but around a crackling campfire high in the Kananaskis. Our founders, a seasoned bartender with a love for alpine herbs and a local guide with a knack for storytelling, realized that the spirit of the Rockies – its raw beauty, its quiet strength, its warm hospitality – could be perfectly captured in a glass.",
    image: 'https://placehold.co/600x400.png',
    imageHint: 'campfire mountains',
    alt: 'Conceptual image of a campfire in the mountains representing the birth of Mountain Mixology',
  },
  {
    icon: <BookOpenText className="h-10 w-10 text-primary" />,
    title: 'Our Philosophy: Crafted & Connected',
    text: "We believe a cocktail is more than just a drink; it's an experience, a conversation starter, a memory in the making. Our philosophy is simple: use the finest local and international ingredients, craft each drink with precision and passion, and connect with every guest to make them feel truly special. We bring the art of high-end mixology to the wild heart of Canmore.",
    image: 'https://placehold.co/600x400.png',
    imageHint: 'mixologist crafting',
    alt: 'Mixologist carefully crafting a cocktail with fresh ingredients',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Meet the Spirit (Coming Soon!)',
    text: "While we're busy shaking, stirring, and serving, we're also preparing a little something to introduce you to the passionate faces behind Mountain Mixology. Stay tuned to meet our team of dedicated professionals who bring their expertise and mountain charm to every event!",
    image: 'https://placehold.co/600x400.png',
    imageHint: 'team portrait',
    alt: 'Placeholder for a future team photo of Mountain Mixology staff',
  },
];

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};


export function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-background">
      <div className="text-center mb-12 md:mb-16">
        <BookOpenText className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Story</h2>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
          Discover the heart and spirit behind Mountain Mixology, where every drink tells a tale of the Canadian Rockies.
        </p>
      </div>

      <div className="space-y-16 md:space-y-24">
        {storyPoints.map((point, index) => (
          <div 
            key={index} 
            className={`flex flex-col gap-8 md:gap-12 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <motion.div 
              className="w-full md:w-1/2"
              variants={index % 2 === 0 ? imageVariants : textVariants} // Alternate animation direction
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="relative aspect-video w-full rounded-lg shadow-xl overflow-hidden group">
                <Image
                  src={point.image}
                  alt={point.alt}
                  data-ai-hint={point.imageHint}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
              </div>
            </motion.div>
            <motion.div 
              className="w-full md:w-1/2"
              variants={index % 2 === 0 ? textVariants : imageVariants} // Alternate animation direction
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-3 p-3 bg-primary/10 rounded-full inline-block">
                {point.icon}
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-3">{point.title}</h3>
              <p className="text-foreground/90 leading-relaxed">{point.text}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
