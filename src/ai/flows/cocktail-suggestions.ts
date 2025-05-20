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
      'A concise 2-3 word prompt suitable for generating an image of this cocktail, e.g., "whiskey sour garnish" or "blue margarita lime".'
    ),
});

const CocktailSuggestionsOutputSchema = z.object({
  cocktails: z
    .array(CocktailDetailSchema)
    .describe('A list of cocktails, each with its name, recipe, and image prompt.'),
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
  prompt: `You are a world-class bartender. A user has provided a list of ingredients: {{{ingredients}}}.
Suggest 6 cocktails that can be made primarily with these ingredients.
For each of the 6 cocktails, provide its name, a detailed recipe (ingredients and step-by-step instructions), and a concise 2-3 word image prompt (e.g., "vodka martini olive" or "rum punch fruit").
Respond with an array of objects, where each object contains 'name', 'recipe', and 'imagePrompt'. Ensure the recipe is formatted with newlines for ingredients and steps.`,
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
