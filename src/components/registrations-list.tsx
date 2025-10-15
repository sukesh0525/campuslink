"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Registration } from "@/lib/types";
import { ScrollArea } from "./ui/scroll-area";

interface RegistrationsListProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string;
  registrations: Registration[];
}

export function RegistrationsList({
  isOpen,
  onClose,
  eventName,
  registrations,
}: RegistrationsListProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Registrations for: {eventName}</DialogTitle>
          <DialogDescription>
            {registrations.length} student(s) have registered for this event.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="relative border rounded-lg">
            <Table>
              <TableHeader className="sticky top-0 bg-secondary">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Section</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.length > 0 ? (
                  registrations.map((reg, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{reg.studentName}</TableCell>
                      <TableCell>{reg.rollNo}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.phone}</TableCell>
                      <TableCell>{reg.year}</TableCell>
                      <TableCell>{reg.department}</TableCell>
                      <TableCell>{reg.section}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No registrations yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
