"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd also clear any auth tokens or session state.
    // For this app, we just redirect to the login page.
    router.push('/login');
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
      <LogOut className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
    </Button>
  );
}
