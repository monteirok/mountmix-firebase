'use server';

import { ContactFormSchema, type ContactFormValues } from '@/lib/schemas';
import { cocktailSuggestionsByIngredients, type CocktailSuggestionsInput, type CocktailSuggestionsOutput } from '@/ai/flows/cocktail-suggestions';
import { cocktailSuggestionsByFlavor, type CocktailSuggestionsByFlavorInput, type CocktailSuggestionsByFlavorOutput } from '@/ai/flows/cocktail-suggestions-by-flavor';


export async function submitContactForm(
  data: ContactFormValues
): Promise<{ success: boolean; message: string; errors?: any }> {
  const validatedFields = ContactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate sending an email or saving to a database
  console.log('Quote Request Received:', validatedFields.data);
  // In a real app, you would integrate with an email service or CRM here.
  // For example: await sendEmail(validatedFields.data);

  // Artificial delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: 'Your quote request has been submitted successfully! We will get back to you shortly.',
  };
}


export async function getCocktailSuggestionsByIngredients(
  data: CocktailSuggestionsInput
): Promise<CocktailSuggestionsOutput | { error: string }> {
  try {
    const result = await cocktailSuggestionsByIngredients(data);
    return result;
  } catch (error) {
    console.error("Error getting cocktail suggestions by ingredients:", error);
    return { error: "Failed to get cocktail suggestions. Please try again." };
  }
}

export async function getCocktailSuggestionsByFlavor(
  data: CocktailSuggestionsByFlavorInput
): Promise<CocktailSuggestionsByFlavorOutput | { error: string }> {
  try {
    const result = await cocktailSuggestionsByFlavor(data);
    return result;
  } catch (error) {
    console.error("Error getting cocktail suggestions by flavor:", error);
    return { error: "Failed to get cocktail suggestions. Please try again." };
  }
}
