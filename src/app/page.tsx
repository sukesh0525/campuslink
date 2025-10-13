import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-students');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-card px-4 py-2">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <h1 className="font-headline text-2xl font-bold tracking-tighter text-foreground sm:text-3xl md:text-4xl">
              CampusConnect
            </h1>
          </div>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Your central hub for all college events. Discover, register, and manage events from every department, all in one place.
          </p>
        </div>

        <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-card shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="aspect-video w-full object-cover"
                data-ai-hint={heroImage.imageHint}
              />
          )}
           <div className="absolute bottom-6 left-6 right-6 text-left">
            <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">
              Stay Connected. Stay Informed.
            </h2>
            <p className="mt-2 max-w-2xl text-base text-gray-200">
              Never miss out on an opportunity to learn, network, and grow. Explore events from all departments today.
            </p>
          </div>
        </div>

        <Link href="/login">
          <Button size="lg" className="group bg-accent text-accent-foreground hover:bg-accent/90">
            Go to Login
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
