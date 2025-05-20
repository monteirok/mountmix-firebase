'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type SectionWrapperProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export function SectionWrapper({ id, className, children, containerClassName }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={cn('py-16 md:py-24', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className={cn('container mx-auto px-4 md:px-6', containerClassName)}>
        {children}
      </div>
    </motion.section>
  );
}
