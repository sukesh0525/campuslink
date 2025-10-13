import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, GraduationCap, Star, Users } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-students');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container z-40 mx-auto">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              CampusConnect
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Login
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <Link href="/login">
            <Button size="sm" className="hidden md:flex">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto grid flex-1 gap-10 py-16 md:grid-cols-2 md:py-24 lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              The Hub for College Events
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground">
              Discover, register, and manage campus events seamlessly. CampusConnect brings all departmental activities into one centralized platform.
            </p>
            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Explore Events
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                   HOD Portal
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex -space-x-2">
                <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://picsum.photos/seed/1/32/32" alt="User 1" width={32} height={32}/>
                <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://picsum.photos/seed/2/32/32" alt="User 2" width={32} height={32}/>
                <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://picsum.photos/seed/3/32/32" alt="User 3" width={32} height={32}/>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <Star className="h-4 w-4 fill-muted-foreground/50 text-muted-foreground/50" />
                </div>
                <span className="font-medium text-foreground">10k+</span> students are active.
              </div>
            </div>
          </div>
          <div className="relative">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={800}
                className="rounded-xl border object-cover shadow-2xl"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute -bottom-6 -right-6 w-64 rounded-xl border bg-background/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">New Workshop!</p>
                  <p className="text-sm text-muted-foreground">AI in Modern World</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">Why CampusConnect?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Everything you need to stay engaged with campus life, all in one platform.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 rounded-lg">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                            <BookOpenCheck className="h-8 w-8" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">Centralized Hub</h3>
                        <p className="text-muted-foreground">Access events from all departments in one place. No more missing out on opportunities.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                            <Users className="h-8 w-8" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">Easy Registration</h3>
                        <p className="text-muted-foreground">Register for any event with a single click. It's fast, simple, and hassle-free.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                           <GraduationCap className="h-8 w-8" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">HOD Management</h3>
                        <p className="text-muted-foreground">Department heads can easily propose and manage their events and track registrations.</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <footer className="bg-background py-8">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
