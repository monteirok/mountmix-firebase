// use server'
'use server';

/**
 * @fileOverview Provides cocktail suggestions based on available ingredients.
 *
 * - cocktailSuggestionsByIngredients - A function that suggests cocktails based on user-provided ingredients.
 * - CocktailSuggestionsInput - The input type for the cocktailSuggestionsByIngredients function.
 * - CocktailSuggestionsOutput - The return type for the cocktailSuggestionsByIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CocktailSuggestionsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available to use.'),
});
export type CocktailSuggestionsInput = z.infer<typeof CocktailSuggestionsInputSchema>;

const CocktailSuggestionsOutputSchema = z.object({
  cocktails: z
    .array(z.string())
    .describe('A list of cocktail names that can be made with the provided ingredients.'),
});
export type CocktailSuggestionsOutput = z.infer<typeof CocktailSuggestionsOutputSchema>;

export async function cocktailSuggestionsByIngredients(
  input: CocktailSuggestionsInput
): Promise<CocktailSuggestionsOutput> {
  return cocktailSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cocktailSuggestionsPrompt',
  input: {schema: CocktailSuggestionsInputSchema},
  output: {schema: CocktailSuggestionsOutputSchema},
  prompt: `You are a world-class bartender. A user will provide you with a list of ingredients that they have on hand.
  Suggest 3 cocktails that can be made with those ingredients.
  Respond with ONLY the names of the cocktails, separated by commas.

  Ingredients: {{{ingredients}}}
  `,
});

const cocktailSuggestionsFlow = ai.defineFlow(
  {
    name: 'cocktailSuggestionsFlow',
    inputSchema: CocktailSuggestionsInputSchema,
    outputSchema: CocktailSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
