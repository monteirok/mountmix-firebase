
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ContactFormSchema, type ContactFormValues } from '@/lib/schemas';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Loader2, CalendarCheck } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContactSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ContactSection({ isOpen, onOpenChange }: ContactSectionProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      eventDate: '',
      message: '',
      eventDetails: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      // Re-using submitContactForm but the success message could be more booking-specific
      const result = await submitContactForm(data); 
      if (result.success) {
        toast({
          title: 'Booking Request Sent!',
          description: "We've received your request and will be in touch shortly to finalize details.",
          variant: 'default',
        });
        form.reset();
        onOpenChange(false); // Close modal on success
      } else {
        toast({
          title: 'Error',
          description: result.message || 'An unexpected error occurred.',
          variant: 'destructive',
        });
        if (result.errors) {
          Object.entries(result.errors).forEach(([fieldName, fieldError]) => {
             if (Array.isArray(fieldError) && fieldError.length > 0) {
               form.setError(fieldName as keyof ContactFormValues, { type: 'server', message: fieldError[0] });
             }
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit your booking request. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg max-h-[calc(100dvh-4rem)] flex flex-col rounded-xl">
        <DialogHeader className="text-center pt-6 sm:pt-8 md:pt-10 px-6 sm:px-8 md:px-10">
          <div className="flex flex-col items-center">
            <CalendarCheck className="h-12 w-12 text-primary mx-auto mb-4" />
            <DialogTitle className="text-3xl md:text-4xl font-bold text-primary mb-3">Book Your Event</DialogTitle>
            <DialogDescription className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
              Ready to elevate your event? Fill out the form below, and we'll be in touch to finalize your booking.
            </DialogDescription>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-grow overflow-y-auto">
          <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prospective Event Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type & Guest Count (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Wedding, 75 guests" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us more about your event and any specific requests..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Booking Request
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
