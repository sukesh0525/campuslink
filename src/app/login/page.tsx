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
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const studentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const hodSchema = z.object({
  department: z.string().min(3, { message: "Department must be at least 3 characters." }),
});

export default function LoginPage() {
  const router = useRouter();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-students');


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
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center bg-secondary p-10 text-white lg:flex">
         <div className="absolute inset-0 bg-zinc-900" />
         {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-30"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <BookOpenCheck className="mr-2 h-8 w-8 text-primary" />
          CampusConnect
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has revolutionized how we manage and promote events across campus. It's an indispensable tool for both students and faculty.&rdquo;
            </p>
            <footer className="text-sm">A. Professor, CS Department</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8">
          <Button variant="ghost" className="group">
              <Home className="mr-2 h-4 w-4"/>
              Home
          </Button>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-headline text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Select your role to sign in to your dashboard
            </p>
          </div>
          <Tabs defaultValue="student" className="w-full">
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
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
