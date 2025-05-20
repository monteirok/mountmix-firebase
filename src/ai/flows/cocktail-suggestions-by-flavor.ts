// src/ai/flows/cocktail-suggestions-by-flavor.ts
'use server';
/**
 * @fileOverview A cocktail suggestion AI agent that suggests cocktails based on flavor preferences.
 *
 * - cocktailSuggestionsByFlavor - A function that handles the cocktail suggestion process.
 * - CocktailSuggestionsByFlavorInput - The input type for the cocktailSuggestionsByFlavor function.
 * - CocktailSuggestionsByFlavorOutput - The return type for the cocktailSuggestionsByFlavor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CocktailSuggestionsByFlavorInputSchema = z.object({
  flavorPreferences: z
    .string()
    .describe('A comma separated list of desired flavor preferences (e.g., sweet, sour, spicy).'),
});
export type CocktailSuggestionsByFlavorInput = z.infer<
  typeof CocktailSuggestionsByFlavorInputSchema
>;

const CocktailSuggestionsByFlavorOutputSchema = z.object({
  cocktailSuggestions: z
    .string()
    .describe('A list of cocktails that match the flavor preferences.'),
});
export type CocktailSuggestionsByFlavorOutput = z.infer<
  typeof CocktailSuggestionsByFlavorOutputSchema
>;

export async function cocktailSuggestionsByFlavor(
  input: CocktailSuggestionsByFlavorInput
): Promise<CocktailSuggestionsByFlavorOutput> {
  return cocktailSuggestionsByFlavorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cocktailSuggestionsByFlavorPrompt',
  input: {schema: CocktailSuggestionsByFlavorInputSchema},
  output: {schema: CocktailSuggestionsByFlavorOutputSchema},
  prompt: `You are a master mixologist. A user has requested cocktail suggestions based on the following flavor preferences: {{{flavorPreferences}}}. Please provide a list of cocktails that match these preferences.`,
});

const cocktailSuggestionsByFlavorFlow = ai.defineFlow(
  {
    name: 'cocktailSuggestionsByFlavorFlow',
    inputSchema: CocktailSuggestionsByFlavorInputSchema,
    outputSchema: CocktailSuggestionsByFlavorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
