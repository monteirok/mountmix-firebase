
'use server';
/**
 * @fileOverview Generates an image for a cocktail based on a prompt.
 *
 * - generateCocktailImage - A function that handles image generation.
 * - GenerateCocktailImageInput - The input type.
 * - GenerateCocktailImageOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCocktailImageInputSchema = z.object({
  prompt: z.string().describe('A text prompt to generate an image, e.g., "classic margarita lime".'),
});
export type GenerateCocktailImageInput = z.infer<typeof GenerateCocktailImageInputSchema>;

const GenerateCocktailImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateCocktailImageOutput = z.infer<typeof GenerateCocktailImageOutputSchema>;

// This is the function that will be called from the server action.
export async function generateCocktailImage(input: GenerateCocktailImageInput): Promise<GenerateCocktailImageOutput> {
  return generateCocktailImageFlow(input);
}

const generateCocktailImageFlow = ai.defineFlow(
  {
    name: 'generateCocktailImageFlow',
    inputSchema: GenerateCocktailImageInputSchema,
    outputSchema: GenerateCocktailImageOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // MUST use this model for images
      prompt: `Generate a vibrant, appetizing, photorealistic image of a cocktail: ${input.prompt}. The cocktail should be the main focus, well-lit, and appealing, suitable for a menu.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both
        safetySettings: [ 
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed or returned no media.');
    }
    return { imageUrl: media.url };
  }
);
