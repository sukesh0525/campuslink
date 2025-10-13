"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { CampusEvent, Registration } from "@/lib/types";
import { useParams } from "next/navigation";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { useState } from "react";

// In a real app, 'uuid' would be added to package.json, but for now a simple generator is fine.
const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0;
  const v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }),
});

export default function HodPage() {
  const params = useParams();
  const departmentName = decodeURIComponent(Array.isArray(params.department) ? params.department[0] : params.department);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [events, setEvents] = useLocalStorage<CampusEvent[]>("campus-connect-events", []);
  const [registrations] = useLocalStorage<Registration[]>("campus-connect-registrations", []);
  
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: "", date: "" },
  });

  const handleProposeEvent = (values: z.infer<typeof eventSchema>) => {
    const newEvent: CampusEvent = {
      id: uuidv4(),
      title: values.title,
      department: departmentName,
      date: new Date(values.date).toISOString(),
    };
    setEvents(prev => [...prev, newEvent]);
    form.reset();
    setDialogOpen(false);
  };
  
  const departmentEvents = events.filter(e => e.department === departmentName);

  const getRegistrationCount = (eventId: string) => {
    return registrations.filter(r => r.eventId === eventId).length;
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header title={departmentName} subtitle="HOD" />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-headline text-3xl font-bold text-foreground">Your Department's Events</h2>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Propose New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Propose a New Event</DialogTitle>
                <DialogDescription>Fill in the details for the new event for the {departmentName} department.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleProposeEvent)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl><Input placeholder="e.g. AI Workshop" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit">Propose Event</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        {departmentEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {departmentEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                view="hod"
                registrationCount={getRegistrationCount(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
            <p className="text-muted-foreground">You have not proposed any events yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}