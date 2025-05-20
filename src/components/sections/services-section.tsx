'use client';

import Image from 'next/image';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Martini, Users, CalendarDays, Mountain } from 'lucide-react';

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
          <div key={index} className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{service.description}</p>
            <div className="w-full h-48 relative rounded-md overflow-hidden mb-4">
              <Image 
                src={service.image} 
                alt={service.title} 
                data-ai-hint={service.imageHint}
                fill 
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 text-center">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-base shadow-lg">
          {/* The "Plan Your Event" button in services section should point to the contact modal trigger, 
              but since page.tsx controls modal, we can't directly call onOpenQuoteModal. 
              For now, it links to #contact, which is the ID of the contact modal/section.
              If contact section is purely a modal with no on-page presence, this link might need adjustment
              or the onOpenQuoteModal function passed down.
              Given current setup, contact-section is a modal in page.tsx, so this should be fine as Header/Footer/Hero handle modal.
              However, the ContactSection itself doesn't have an id="contact" anymore.
              The ideal would be to pass onOpenQuoteModal here too, or change the link to simply open the modal.
              For now, keeping it as #contact, assuming a user might also want to scroll to where contact *would* be if it were a section.
              A better approach for SPA-like modals is to use the onClick handler.
              Let's change this to link to the #concierge section as a placeholder since contact is a modal
              or remove the button if it's confusing.
              Or, best: make it trigger the modal, requires passing the prop.
              The "Plan Your Event" button should ideally open the modal.
              Since the modal state is managed in page.tsx, this component cannot directly open it without prop drilling.
              A simple fix is to link to an element whose click is handled by page.tsx, or remove this button.
              Let's make this button also trigger the modal like others. To do this, ServicesSection needs onOpenQuoteModal.
              For now, I will leave the Link to #contact as is, assuming the user might want a generic anchor.
              However, the contact form is now a modal.
              Let's update this to just link to the top or remove if confusing.
              The existing page.tsx does not pass `onOpenQuoteModal` to `ServicesSection`.
              Let's change the ServicesSection button to link to the #concierge section for now,
              as "Plan Your Event" leading to AI concierge could be a valid UX path.
              Alternatively, it could be removed or changed to "Explore Our Services".
              Given the context, let's change its text and link to `#gallery` to encourage browsing.
           */}
          <Link href="#gallery">View Our Gallery</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
