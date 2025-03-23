import { ReactNode } from "react";
import Link from "next/link";
import { Recycle } from "lucide-react";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* Other head content here */}</head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl"
                  >
                    <Recycle className="h-6 w-6 text-green-600" />
                    <span>ECO GLASS</span>
                  </Link>
                  <nav className="hidden md:flex gap-6">
                    <Link
                      href="/locations"
                      className="text-sm font-medium hover:underline underline-offset-4"
                    >
                      Locations
                    </Link>
                    <Link
                      href="/guide"
                      className="text-sm font-medium hover:underline underline-offset-4"
                    >
                      Recycling Guide
                    </Link>
                    <Link
                      href="/resources"
                      className="text-sm font-medium hover:underline underline-offset-4"
                    >
                      Resources
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm font-medium hover:underline underline-offset-4"
                    >
                      About
                    </Link>
                  </nav>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/contact">Contact</Link>
                    </Button>
                    <UserNav />
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:h-24">
                  <div className="flex items-center gap-2">
                    <Recycle className="h-5 w-5 text-green-600" />
                    <p className="text-sm text-muted-foreground">
                      © 2023 ECO GLASS. All rights reserved.
                    </p>
                  </div>
                  <nav className="flex gap-4 md:gap-6">
                    <Link
                      href="/privacy"
                      className="text-xs text-muted-foreground hover:underline underline-offset-4"
                    >
                      Privacy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-xs text-muted-foreground hover:underline underline-offset-4"
                    >
                      Terms
                    </Link>
                    <Link
                      href="/contact"
                      className="text-xs text-muted-foreground hover:underline underline-offset-4"
                    >
                      Contact
                    </Link>
                  </nav>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
