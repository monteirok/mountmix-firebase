
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Removed Textarea import as it's no longer used in this component for flavor input
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CocktailByIngredientsSchema, CocktailByFlavorSchema, type CocktailByIngredientsValues, type CocktailByFlavorValues } from '@/lib/schemas';
import { getCocktailSuggestionsByIngredients, getCocktailSuggestionsByFlavor, generateCocktailImage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Wand2, GlassWater, Loader2, ListChecks, Sparkles, Info, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

type CocktailDetail = {
  name: string;
  recipe: string;
  imagePrompt: string;
  imageDataUri?: 'loading' | 'error' | string;
};

type SuggestionResult = {
  suggestions: CocktailDetail[];
};

export function CocktailConciergeSection() {
  const { toast } = useToast();
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isLoadingFlavor, setIsLoadingFlavor] = useState(false);
  const [results, setResults] = useState<SuggestionResult | null>(null);

  const ingredientsForm = useForm<CocktailByIngredientsValues>({
    resolver: zodResolver(CocktailByIngredientsSchema),
    defaultValues: { ingredients: '' },
  });

  const flavorForm = useForm<CocktailByFlavorValues>({
    resolver: zodResolver(CocktailByFlavorSchema),
    defaultValues: { flavorPreferences: '' },
  });

  const handleTabChange = () => {
    setResults(null);
    // Optionally, reset forms as well, though current behavior is fine.
    // ingredientsForm.reset();
    // flavorForm.reset();
  };

  const generateAndSetImage = async (imagePrompt: string, cocktailName: string, cocktailIndex: number) => {
    try {
      const imageResponse = await generateCocktailImage({ prompt: imagePrompt });
      if ('imageUrl' in imageResponse && imageResponse.imageUrl) {
        setResults(prevResults => {
          if (!prevResults) return null;
          const newSuggestions = [...prevResults.suggestions];
          if (newSuggestions[cocktailIndex]) {
            newSuggestions[cocktailIndex] = { ...newSuggestions[cocktailIndex], imageDataUri: imageResponse.imageUrl };
          }
          return { suggestions: newSuggestions };
        });
      } else {
        throw new Error((imageResponse as { error: string }).error || 'Image generation returned no URL.');
      }
    } catch (error) {
      console.error(`Failed to generate image for cocktail "${cocktailName}" (prompt: "${imagePrompt}"):`, error);
      setResults(prevResults => {
        if (!prevResults) return null;
        const newSuggestions = [...prevResults.suggestions];
        if (newSuggestions[cocktailIndex]) {
          newSuggestions[cocktailIndex] = { ...newSuggestions[cocktailIndex], imageDataUri: 'error' as const };
        }
        return { suggestions: newSuggestions };
      });
      toast({ title: 'Image Error', description: `Could not generate image for ${cocktailName}.`, variant: 'destructive' });
    }
  };

  const onIngredientsSubmit: SubmitHandler<CocktailByIngredientsValues> = async (data) => {
    setIsLoadingIngredients(true);
    setResults(null);
    try {
      const response = await getCocktailSuggestionsByIngredients(data);
      if ('error' in response) {
        toast({ title: 'Error', description: response.error, variant: 'destructive' });
        setResults({ suggestions: [] });
      } else if (response.cocktails && response.cocktails.length > 0) {
        const suggestionsWithLoadingState = response.cocktails.map(c => ({ 
          ...c, 
          imageDataUri: 'loading' as const 
        }));
        setResults({ suggestions: suggestionsWithLoadingState });
        
        suggestionsWithLoadingState.forEach((cocktail, index) => {
          generateAndSetImage(cocktail.imagePrompt, cocktail.name, index);
        });

      } else {
        setResults({ suggestions: [] }); 
        toast({ title: 'No Matches', description: "Couldn't find specific cocktails. Try different ingredients!", variant: 'default' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get suggestions. Please try again.', variant: 'destructive' });
      setResults({ suggestions: [] });
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  const onFlavorSubmit: SubmitHandler<CocktailByFlavorValues> = async (data) => {
    setIsLoadingFlavor(true);
    setResults(null);
    try {
      const response = await getCocktailSuggestionsByFlavor(data);
      if ('error' in response) {
        toast({ title: 'Error', description: response.error, variant: 'destructive' });
        setResults({ suggestions: [] });
      } else if (response.cocktailSuggestions && response.cocktailSuggestions.length > 0) {
         const suggestionsWithLoadingState = response.cocktailSuggestions.map(c => ({ 
           ...c, 
           imageDataUri: 'loading' as const 
          }));
         setResults({ suggestions: suggestionsWithLoadingState });

         suggestionsWithLoadingState.forEach((cocktail, index) => {
          generateAndSetImage(cocktail.imagePrompt, cocktail.name, index);
        });

      } else {
         setResults({ suggestions: [] });
         toast({ title: 'No Matches', description: "Couldn't find suggestions for that flavor. Try being more specific or general!", variant: 'default' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get suggestions. Please try again.', variant: 'destructive' });
      setResults({ suggestions: [] });
    } finally {
      setIsLoadingFlavor(false);
    }
  };

  return (
    <SectionWrapper id="concierge">
      <div className="text-center mb-12 md:mb-16">
        <Wand2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Cocktail Concierge</h2>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
          Let our AI mixologist help you discover your next favorite cocktail based on ingredients you have or flavors you love.
        </p>
      </div>

      <Tabs defaultValue="ingredients" className="max-w-2xl mx-auto" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="ingredients" className="py-3"><ListChecks className="mr-2 h-5 w-5" />By Ingredients</TabsTrigger>
          <TabsTrigger value="flavor" className="py-3"><Sparkles className="mr-2 h-5 w-5" />By Flavor</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Suggest Cocktails by Ingredients</CardTitle>
              <CardDescription>Enter the ingredients you have on hand (comma-separated), and we'll suggest some cocktails.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...ingredientsForm}>
                <form onSubmit={ingredientsForm.handleSubmit(onIngredientsSubmit)} className="space-y-6">
                  <FormField
                    control={ingredientsForm.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Ingredients (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., vodka, lime juice, ginger beer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoadingIngredients}>
                    {isLoadingIngredients ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GlassWater className="mr-2 h-4 w-4" />}
                    Get Suggestions
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flavor">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Suggest Cocktails by Flavor</CardTitle>
              <CardDescription>Enter your desired flavors (comma-separated), and we'll find matching cocktails.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...flavorForm}>
                <form onSubmit={flavorForm.handleSubmit(onFlavorSubmit)} className="space-y-6">
                  <FormField
                    control={flavorForm.control}
                    name="flavorPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flavor Preferences (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., sweet, fruity, spicy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoadingFlavor}>
                    {isLoadingFlavor ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Find Cocktails
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <Card className="shadow-lg border-accent">
            <CardHeader>
              <CardTitle className="text-accent flex items-center">
                <GlassWater className="mr-2 h-6 w-6" />
                Your Cocktail Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.suggestions && results.suggestions.length > 0 ? (
                <ul className="space-y-3">
                  {results.suggestions.map((cocktail, index) => (
                    <li key={index} className="text-foreground">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-lg text-left font-medium text-primary hover:text-accent transition-colors flex items-center group"
                          >
                            {cocktail.name}
                            <Info className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 md:w-96 shadow-xl bg-card border-border p-4 rounded-lg">
                          <div className="grid gap-4">
                            <div className="aspect-square w-full max-w-[180px] mx-auto bg-muted/50 rounded-md overflow-hidden ring-1 ring-border flex items-center justify-center">
                              {(() => {
                                if (cocktail.imageDataUri === 'loading') {
                                  return <Loader2 className="h-10 w-10 animate-spin text-primary" />;
                                }
                                if (cocktail.imageDataUri === 'error') {
                                  return (
                                    <div className="text-destructive text-center p-2 flex flex-col items-center justify-center">
                                      <ImageIcon className="h-8 w-8 mb-1 opacity-70" />
                                      <p className="text-xs">Image Error</p>
                                    </div>
                                  );
                                }
                                if (typeof cocktail.imageDataUri === 'string' && cocktail.imageDataUri.startsWith('data:image')) {
                                  return (
                                    <Image
                                      src={cocktail.imageDataUri}
                                      alt={`Generated image for ${cocktail.name}`}
                                      data-ai-hint={cocktail.imagePrompt} // Keep hint for accessibility/fallback context
                                      width={200}
                                      height={200}
                                      className="object-cover w-full h-full"
                                    />
                                  );
                                }
                                // Default placeholder if imageDataUri is undefined (e.g. initial state before 'loading' is set)
                                return (
                                  <Image
                                    src={`https://placehold.co/200x200.png`}
                                    alt={`Placeholder for ${cocktail.name}`}
                                    data-ai-hint={cocktail.imagePrompt}
                                    width={200}
                                    height={200}
                                    className="object-cover w-full h-full opacity-50" // Differentiate placeholder visually
                                  />
                                );
                              })()}
                            </div>
                            <div>
                              <h4 className="font-semibold text-xl leading-none mb-2 text-primary">{cocktail.name}</h4>
                              <h5 className="font-medium text-sm text-muted-foreground mb-1 mt-3">Recipe:</h5>
                              <div className="text-sm text-foreground whitespace-pre-line max-h-60 overflow-y-auto p-3 rounded-md bg-muted/30 border border-border/50 custom-scrollbar">
                                {cocktail.recipe}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-muted-foreground">
                  { (isLoadingIngredients || isLoadingFlavor) ? 'Loading suggestions...' : 'No suggestions found. Try adjusting your search!'}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
