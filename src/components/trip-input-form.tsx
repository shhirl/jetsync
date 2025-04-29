"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { TripInput } from "@/lib/types";
import { TripInputSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPin, Plane } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

interface TripInputFormProps {
  onSubmit: (data: TripInput) => void;
  isLoading: boolean;
}

export default function TripInputForm({ onSubmit, isLoading }: TripInputFormProps) {
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>();

  const form = useForm<TripInput>({
    resolver: zodResolver(TripInputSchema),
    defaultValues: {
      departureLocation: "",
      arrivalLocation: "",
      departureDateTime: "",
      arrivalDateTime: "",
    },
  });

  const handleFormSubmit = (values: TripInput) => {
    // Format dates before submitting if they exist
    const submissionData = {
        ...values,
        departureDateTime: departureDate ? format(departureDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : values.departureDateTime,
        arrivalDateTime: arrivalDate ? format(arrivalDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : values.arrivalDateTime,
    };
    console.log("Submitting:", submissionData);
    onSubmit(submissionData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg backdrop-blur-sm bg-card/80">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Plane className="text-primary w-6 h-6" />
                Plan Your Trip
            </CardTitle>
            <CardDescription>Enter your flight details to get a personalized jet lag recovery plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="departureLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><MapPin className="w-4 h-4"/>Departure Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York (JFK)" {...field} className="bg-background"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="arrivalLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><MapPin className="w-4 h-4"/>Arrival Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., London (LHR)" {...field} className="bg-background"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="departureDateTime"
              render={({ field }) => (
                 <FormItem className="flex flex-col">
                   <FormLabel className="flex items-center gap-1"><CalendarIcon className="w-4 h-4"/>Departure Date & Time</FormLabel>
                    <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-background",
                            !departureDate && "text-muted-foreground"
                          )}
                        >
                          {departureDate ? (
                            format(departureDate, "PPP HH:mm") // Display date and time if selected
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        {/* Note: This basic calendar doesn't include time picking.
                            For a real app, you'd use a DateTime picker component.
                            We'll store the selected date and rely on the ISO string format. */}
                       <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={(date) => {
                          setDepartureDate(date);
                          // Set a default time or handle time input separately
                          field.onChange(date ? format(date, "yyyy-MM-dd'T'12:00:00'Z'") : ''); // Example: default to noon UTC
                        }}
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) } // Disable past dates
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                   <FormMessage />
                 </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="arrivalDateTime"
              render={({ field }) => (
                 <FormItem className="flex flex-col">
                   <FormLabel className="flex items-center gap-1"><CalendarIcon className="w-4 h-4"/>Arrival Date & Time</FormLabel>
                   <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-background",
                            !arrivalDate && "text-muted-foreground"
                          )}
                        >
                          {arrivalDate ? (
                            format(arrivalDate, "PPP HH:mm") // Display date and time
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={arrivalDate}
                        onSelect={(date) => {
                           setArrivalDate(date);
                           // Set a default time or handle time input separately
                           field.onChange(date ? format(date, "yyyy-MM-dd'T'12:00:00'Z'") : ''); // Example: default to noon UTC
                        }}
                         disabled={(date) => date < (departureDate || new Date()) } // Disable dates before departure
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                   <FormMessage />
                 </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? 'Generating Plan...' : 'Get Recovery Plan'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
