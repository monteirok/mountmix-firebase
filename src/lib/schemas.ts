import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  eventDate: z.string().optional(), // Can be refined with date validation if needed
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  eventDetails: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;


export const CocktailByIngredientsSchema = z.object({
  ingredients: z.string().min(3, { message: "Please list at least one ingredient."}),
});
export type CocktailByIngredientsValues = z.infer<typeof CocktailByIngredientsSchema>;

export const CocktailByFlavorSchema = z.object({
  flavorPreferences: z.string().min(3, { message: "Please describe your desired flavor."}),
});
export type CocktailByFlavorValues = z.infer<typeof CocktailByFlavorSchema>;
