"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { CampusEvent, Registration } from "@/lib/types";
import { useParams } from "next/navigation";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Calendar, BarChart, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { RegistrationsList } from "@/components/registrations-list";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }),
  image: z.any().optional(),
});

export default function HodPage() {
  const params = useParams();
  const departmentName = decodeURIComponent(Array.isArray(params.department) ? params.department[0] : params.department);
  const [isProposeDialogOpen, setProposeDialogOpen] = useState(false);
  const [viewingRegistrationsFor, setViewingRegistrationsFor] = useState<CampusEvent | null>(null);

  const [events, setEvents] = useLocalStorage<CampusEvent[]>("campus-connect-events", []);
  const [registrations] = useLocalStorage<Registration[]>("campus-connect-registrations", []);
  
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: "", date: new Date().toISOString().split('T')[0] },
  });

  const handleProposeEvent = (values: z.infer<typeof eventSchema>) => {
    const reader = new FileReader();
    const imageFile = values.image?.[0];

    const createEvent = (imageUrl?: string) => {
        const newEvent: CampusEvent = {
            id: Math.random().toString(36).substring(2),
            title: values.title,
            department: departmentName,
            date: new Date(values.date).toISOString(),
            imageUrl,
        };
        setEvents(prev => [...prev, newEvent]);
        form.reset();
        setProposeDialogOpen(false);
    }
    
    if (imageFile) {
        reader.onload = (e) => {
            createEvent(e.target?.result as string);
        };
        reader.readAsDataURL(imageFile);
    } else {
        createEvent();
    }
  };
  
  const departmentEvents = events.filter(e => e.department === departmentName);

  const getRegistrationsForEvent = (eventId: string) => {
    return registrations.filter(r => r.eventId === eventId);
  };
  
  const totalRegistrations = departmentEvents.reduce((acc, event) => acc + getRegistrationsForEvent(event.id).length, 0);

  const chartData = departmentEvents.map(event => ({
    name: event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title,
    registrations: getRegistrationsForEvent(event.id).length,
  }));

  const registrationsForSelectedEvent = viewingRegistrationsFor
    ? getRegistrationsForEvent(viewingRegistrationsFor.id)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header title={departmentName} subtitle="HOD" />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-headline text-3xl font-bold text-foreground">Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{departmentEvents.length}</div>
                    <p className="text-xs text-muted-foreground">Events created by your department</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalRegistrations}</div>
                    <p className="text-xs text-muted-foreground">Across all your department's events</p>
                </CardContent>
            </Card>
             <Card className="lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Event</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {chartData.length > 0 ? chartData.reduce((prev, current) => (prev.registrations > current.registrations) ? prev : current).name : 'N/A'}
                    </div>
                     <p className="text-xs text-muted-foreground">
                        {chartData.length > 0 ? `${Math.max(...chartData.map(d => d.registrations))} registrations` : 'No events yet'}
                     </p>
                </CardContent>
            </Card>
        </div>
        
        {chartData.length > 0 && (
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Event Registration Analysis</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <RechartsBarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))'
                                }}
                            />
                            <Bar dataKey="registrations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        )}

        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-headline text-2xl font-bold text-foreground">Your Department's Events</h2>
          <Dialog open={isProposeDialogOpen} onOpenChange={setProposeDialogOpen}>
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
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Event Image</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              className="w-full pl-12"
                              onChange={(e) => onChange(e.target.files)}
                              {...rest}
                            />
                             <Upload className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </FormControl>
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
                registrationCount={getRegistrationsForEvent(event.id).length}
                onViewRegistrations={() => setViewingRegistrationsFor(event)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">You have not proposed any events yet.</p>
              <p className="text-sm text-muted-foreground">Click "Propose New Event" to get started.</p>
            </div>
          </div>
        )}
      </main>

       <RegistrationsList
        isOpen={!!viewingRegistrationsFor}
        onClose={() => setViewingRegistrationsFor(null)}
        eventName={viewingRegistrationsFor?.title}
        registrations={registrationsForSelectedEvent}
      />
    </div>
  );
}
