"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { CampusEvent, Registration } from "@/lib/types";
import { useParams } from "next/navigation";
import { EventCard } from "@/components/event-card";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { CheckCircle } from "lucide-react";

export default function StudentPage() {
  const params = useParams();
  const studentName = Array.isArray(params.name) ? params.name[0] : params.name;
  const { toast } = useToast();

  const [events] = useLocalStorage<CampusEvent[]>("campus-connect-events", []);
  const [registrations, setRegistrations] = useLocalStorage<Registration[]>("campus-connect-registrations", []);

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (registrations.some(r => r.studentName === studentName && r.eventId === eventId)) {
      toast({
        title: "Already Registered",
        description: `You are already registered for ${eventTitle}.`,
        variant: "default",
      });
      return;
    }

    setRegistrations(prev => [...prev, { studentName, eventId }]);
    toast({
      title: "Registration Successful!",
      description: `You have registered for ${eventTitle}.`,
      action: <CheckCircle className="text-green-500" />,
    });
  };

  const getIsRegistered = (eventId: string) => {
    return registrations.some(r => r.studentName === studentName && r.eventId === eventId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={decodeURIComponent(studentName)} subtitle="Student" />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <h2 className="mb-8 font-headline text-3xl font-bold text-foreground">Available Events</h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                view="student"
                onRegister={() => handleRegister(event.id, event.title)}
                isRegistered={getIsRegistered(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
            <p className="text-muted-foreground">No events have been proposed yet. Check back later!</p>
          </div>
        )}
      </main>
    </div>
  );
}
