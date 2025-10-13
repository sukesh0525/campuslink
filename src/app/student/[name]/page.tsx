
"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { CampusEvent, Registration } from "@/lib/types";
import { useParams } from "next/navigation";
import { EventCard } from "@/components/event-card";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { CheckCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistrationForm } from "@/components/registration-form";

export default function StudentPage() {
  const params = useParams();
  const studentName = Array.isArray(params.name) ? params.name[0] : params.name;
  const { toast } = useToast();

  const [events] = useLocalStorage<CampusEvent[]>("campus-connect-events", []);
  const [registrations, setRegistrations] = useLocalStorage<Registration[]>("campus-connect-registrations", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);

  const handleRegister = (details: Omit<Registration, 'studentName' | 'eventId'>) => {
    if (!selectedEvent) return;

    if (registrations.some(r => r.studentName === studentName && r.eventId === selectedEvent.id)) {
      toast({
        title: "Already Registered",
        description: `You are already registered for ${selectedEvent.title}.`,
        variant: "default",
      });
      return;
    }

    setRegistrations(prev => [...prev, { ...details, studentName, eventId: selectedEvent.id }]);
    toast({
      title: "Registration Successful!",
      description: `You have registered for ${selectedEvent.title}.`,
      action: <CheckCircle className="text-green-500" />,
    });
    setSelectedEvent(null);
  };

  const getIsRegistered = (eventId: string) => {
    return registrations.some(r => r.studentName === studentName && r.eventId === eventId);
  };

  const openRegistrationForm = (event: CampusEvent) => {
    setSelectedEvent(event);
  };

  const filteredAndSortedEvents = events
    .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.department.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header title={decodeURIComponent(studentName)} subtitle="Student" />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="font-headline text-3xl font-bold tracking-tight">Available Events</h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search events..." 
                        className="w-full pl-10 md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Sort by Date</SelectItem>
                        <SelectItem value="title">Sort by Title</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        {filteredAndSortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                view="student"
                onRegister={() => openRegistrationForm(event)}
                isRegistered={getIsRegistered(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50">
            <p className="text-lg font-medium text-muted-foreground">No events match your search.</p>
            <p className="text-sm text-muted-foreground">Try a different search term or check back later.</p>
          </div>
        )}
      </main>
      
      <RegistrationForm
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSubmit={handleRegister}
        eventName={selectedEvent?.title}
        studentName={decodeURIComponent(studentName)}
      />
    </div>
  );
}
