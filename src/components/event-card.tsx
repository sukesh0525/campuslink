"use client";

import Image from "next/image";
import { CampusEvent } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Building, Users, CheckCircle, ArrowRight, Eye, Trash } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type EventCardProps = {
  event: CampusEvent;
  view: "student" | "hod";
  onRegister?: () => void;
  isRegistered?: boolean;
  registrationCount?: number;
  onViewRegistrations?: () => void;
  onDelete?: () => void;
};

export function EventCard({ event, view, onRegister, isRegistered, registrationCount, onViewRegistrations, onDelete }: EventCardProps) {
  const eventImage = PlaceHolderImages.find((img) => img.id === 'event-default');
  const imageUrl = event.imageUrl || `${eventImage?.imageUrl}&t=${event.id}`;

  return (
    <Card className="group flex flex-col overflow-hidden border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <div className="overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={event.title}
            width={400}
            height={250}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={event.imageUrl ? "custom event image" : eventImage?.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <CardHeader className="relative z-10 -mt-12 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
        </div>
        <CardTitle className="font-headline text-lg text-primary-foreground">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{event.department}</span>
         </div>
      </CardContent>
      <CardFooter className="bg-secondary/30 p-4">
        {view === "student" && onRegister && (
          <Button
            onClick={onRegister}
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
                 Register Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        )}
        {view === "hod" && (
          <div className="flex w-full items-center justify-between text-sm gap-2">
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4" />
                  {registrationCount ?? 0}
                </Badge>
                <span className="font-semibold text-foreground">Registrations</span>
            </div>
            <div className="flex items-center gap-2">
                {onViewRegistrations && (
                  <Button size="sm" variant="outline" onClick={onViewRegistrations} disabled={(registrationCount ?? 0) === 0}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                )}
                {onDelete && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive" className="h-9 w-9">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the event
                                    and all associated registration data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
