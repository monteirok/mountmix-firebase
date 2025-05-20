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

const CocktailDetailSchema = z.object({
  name: z.string().describe('The name of the cocktail.'),
  recipe: z
    .string()
    .describe(
      'The detailed recipe for the cocktail, including ingredients and step-by-step instructions. Format as a single string with newlines for readability.'
    ),
  imagePrompt: z
    .string()
    .describe(
      'A concise 2-3 word prompt suitable for generating an image of this cocktail, e.g., "classic margarita lime" or "smoky old fashioned".'
    ),
});

const CocktailSuggestionsByFlavorOutputSchema = z.object({
  cocktailSuggestions: z
    .array(CocktailDetailSchema)
    .describe('A list of cocktails that match the flavor preferences, each with name, recipe, and image prompt.'),
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
  prompt: `You are a master mixologist. A user has requested cocktail suggestions based on the following flavor preferences: {{{flavorPreferences}}}.
For each cocktail you suggest, provide its name, a detailed recipe (ingredients and step-by-step instructions), and a concise 2-3 word image prompt (e.g., "classic margarita lime" or "smoky old fashioned").
Respond with an array of objects, where each object contains 'name', 'recipe', and 'imagePrompt'. Ensure the recipe is formatted with newlines for ingredients and steps.`,
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
