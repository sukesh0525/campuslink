"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpenCheck, GraduationCap, User, ArrowRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const studentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const hodSchema = z.object({
  department: z.string().min(3, { message: "Department must be at least 3 characters." }),
});

export default function LoginPage() {
  const router = useRouter();

  const studentForm = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: { name: "" },
  });

  const hodForm = useForm<z.infer<typeof hodSchema>>({
    resolver: zodResolver(hodSchema),
    defaultValues: { department: "" },
  });

  function onStudentLogin(values: z.infer<typeof studentSchema>) {
    router.push(`/student/${values.name}`);
  }

  function onHodLogin(values: z.infer<typeof hodSchema>) {
    router.push(`/hod/${values.department}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
         <Link href="/">
            <Button variant="ghost" className="group">
                <Home className="mr-2 h-4 w-4"/>
                Home
            </Button>
         </Link>
      </div>
      <div className="flex items-center gap-3 mb-8">
        <BookOpenCheck className="h-10 w-10 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          CampusConnect
        </h1>
      </div>

      <Tabs defaultValue="student" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">
            <User className="mr-2 h-4 w-4" /> Student
          </TabsTrigger>
          <TabsTrigger value="hod">
            <GraduationCap className="mr-2 h-4 w-4" /> HOD
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>Enter your name to view and register for events.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...studentForm}>
                <form onSubmit={studentForm.handleSubmit(onStudentLogin)} className="space-y-6">
                  <FormField
                    control={studentForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full group">
                    Login as Student <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hod">
          <Card>
            <CardHeader>
              <CardTitle>HOD Login</CardTitle>
              <CardDescription>Enter your department to manage events.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...hodForm}>
                <form onSubmit={hodForm.handleSubmit(onHodLogin)} className="space-y-6">
                  <FormField
                    control={hodForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full group">
                    Login as HOD <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
