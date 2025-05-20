'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // If needed for longer input
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CocktailByIngredientsSchema, CocktailByFlavorSchema, type CocktailByIngredientsValues, type CocktailByFlavorValues } from '@/lib/schemas';
import { getCocktailSuggestionsByIngredients, getCocktailSuggestionsByFlavor } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Wand2, GlassWater, Loader2, ListChecks, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

type SuggestionResult = {
  type: 'ingredients' | 'flavor';
  suggestions: string[] | string; 
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

  const onIngredientsSubmit: SubmitHandler<CocktailByIngredientsValues> = async (data) => {
    setIsLoadingIngredients(true);
    setResults(null);
    try {
      const response = await getCocktailSuggestionsByIngredients(data);
      if ('error' in response) {
        toast({ title: 'Error', description: response.error, variant: 'destructive' });
      } else if (response.cocktails && response.cocktails.length > 0) {
        setResults({ type: 'ingredients', suggestions: response.cocktails });
      } else {
        setResults({ type: 'ingredients', suggestions: ["No specific cocktails found with these ingredients. Perhaps broaden your search?"] });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get suggestions. Please try again.', variant: 'destructive' });
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
      } else if (response.cocktailSuggestions) {
         setResults({ type: 'flavor', suggestions: response.cocktailSuggestions });
      } else {
         setResults({ type: 'flavor', suggestions: "Couldn't find suggestions for that flavor. Try being more specific or general!" });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get suggestions. Please try again.', variant: 'destructive' });
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

      <Tabs defaultValue="ingredients" className="max-w-2xl mx-auto">
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
                        <FormLabel>Available Ingredients</FormLabel>
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
              <CardDescription>Describe your desired flavor profile (e.g., sweet and fruity, smoky and bitter), and we'll find matching cocktails.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...flavorForm}>
                <form onSubmit={flavorForm.handleSubmit(onFlavorSubmit)} className="space-y-6">
                  <FormField
                    control={flavorForm.control}
                    name="flavorPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flavor Preferences</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., looking for something refreshing and citrusy, not too sweet" {...field} rows={3} />
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
              {results.type === 'ingredients' && Array.isArray(results.suggestions) ? (
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  {results.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-lg">{suggestion}</li>
                  ))}
                </ul>
              ) : results.type === 'flavor' && typeof results.suggestions === 'string' ? (
                 <p className="text-lg whitespace-pre-line">{results.suggestions}</p>
              ) : (
                <p className="text-lg text-muted-foreground">No suggestions available at the moment.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
