"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { DialogClose } from "@radix-ui/react-dialog";

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

  const handleDownloadPdf = () => {
    if (!eventName) return;
    
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Registrations for: ${eventName}`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total registrations: ${registrations.length}`, 14, 30);

    autoTable(doc, {
      startY: 35,
      head: [['Name', 'Roll No', 'Email', 'Phone', 'Year', 'Branch', 'Section']],
      body: registrations.map(reg => [
        reg.studentName,
        reg.rollNo,
        reg.email,
        reg.phone,
        reg.year,
        reg.department,
        reg.section,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74] },
    });

    doc.save(`${eventName.replace(/\s+/g, '_')}_registrations.pdf`);
  };

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
        <DialogFooter className="sm:justify-between mt-4">
             <Button 
                onClick={handleDownloadPdf} 
                disabled={registrations.length === 0}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download as PDF
            </Button>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
