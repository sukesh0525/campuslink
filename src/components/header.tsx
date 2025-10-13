import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';
import { LogoutButton } from './logout-button';
import { Separator } from './ui/separator';

type HeaderProps = {
    title: string;
    subtitle: string;
};

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2" aria-label="Go to Homepage">
                    <BookOpenCheck className="h-7 w-7 text-primary" />
                    <span className="font-headline text-xl font-bold text-foreground">
                        CampusConnect
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{title}</p>
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
