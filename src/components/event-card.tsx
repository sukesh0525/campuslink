"use client";

import Image from "next/image";
import { CampusEvent } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Building, Users, CheckCircle, Hourglass } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "./ui/badge";

type EventCardProps = {
  event: CampusEvent;
  view: "student" | "hod";
  onRegister?: (eventId: string) => void;
  isRegistered?: boolean;
  registrationCount?: number;
};

export function EventCard({ event, view, onRegister, isRegistered, registrationCount }: EventCardProps) {
  const eventImage = PlaceHolderImages.find((img) => img.id === 'event-default');

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      {eventImage && (
        <div className="overflow-hidden">
          <Image
            src={`${eventImage.imageUrl}&t=${event.id}`} // Add event id to seed for unique images
            alt={event.title}
            width={400}
            height={250}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={eventImage.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
        <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building className="h-4 w-4" />
              <span>{event.department}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter className="bg-muted/50 p-4">
        {view === "student" && onRegister && (
          <Button
            onClick={() => onRegister(event.id)}
            disabled={isRegistered}
            className="w-full"
            variant={isRegistered ? "secondary" : "default"}
          >
            {isRegistered ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Registered
              </>
            ) : (
              <>
                 <Hourglass className="mr-2 h-4 w-4 animate-spin" /> Register Now
              </>
            )}
          </Button>
        )}
        {view === "hod" && (
          <div className="flex w-full items-center justify-between text-sm">
            <span className="font-semibold text-foreground">Registrations</span>
            <Badge variant="secondary" className="flex items-center gap-2 text-lg">
              <Users className="h-4 w-4" />
              {registrationCount ?? 0}
            </Badge>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
