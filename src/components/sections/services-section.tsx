
'use client';

import Image from 'next/image';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Martini, Users, CalendarDays, Mountain } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const services = [
  {
    icon: <Martini className="h-10 w-10 text-primary" />,
    title: 'Craft Cocktail Catering',
    description: 'Bespoke cocktail menus tailored to your event theme and preferences, using premium ingredients and homemade syrups.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'cocktail preparation',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Professional Mixologists',
    description: 'Our experienced and charismatic bartenders provide exceptional service, ensuring your guests have an unforgettable experience.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'bartender drinks',
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-primary" />,
    title: 'Events of All Sizes',
    description: 'From intimate gatherings and weddings to corporate events and large parties, we cater to all occasions in Canmore and surrounding areas.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'catering setup',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function ServicesSection() {
  return (
    <SectionWrapper id="services" className="bg-secondary/20">
      <div className="text-center mb-12 md:mb-16">
        <Mountain className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Signature Services</h2>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
          We blend the art of mixology with the spirit of the Rockies to create unique and memorable drink experiences for your events.
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.05, y: -8, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{service.description}</p>
            <div className="w-full h-48 relative rounded-md overflow-hidden mb-4 group">
              <Image
                src={service.image}
                alt={service.title}
                data-ai-hint={service.imageHint}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 text-center">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-base shadow-lg">
          <Link href="#gallery">View Our Gallery</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
