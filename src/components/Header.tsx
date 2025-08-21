"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#processus", label: "Processus" },
  { href: "#projets", label: "Projets" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(isHomePage ? "#accueil" : "");

  useEffect(() => {
    if (!isHomePage) {
      setActiveLink(pathname);
      return;
    }

    const handleScroll = () => {
      let currentSection = '';
      
      navLinks.forEach(link => {
        const section = document.querySelector(link.href);
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          // Use a buffer of 160px for the header height and some margin
          if (window.scrollY >= sectionTop - 160) {
            currentSection = link.href;
          }
        }
      });

      if (currentSection) {
        setActiveLink(currentSection);
      }
    };
    
    document.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state on load

    return () => document.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

  const handleLogoClick = () => {
    setSheetOpen(false);
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveLink("#accueil");
    }
  };

  const NavLink = ({ href, label, className }: { href: string, label: string, className?: string }) => {
    const finalHref = isHomePage ? href : `/${href}`;
    const isActive = activeLink === href || activeLink === finalHref;

    return (
      <Link
        href={finalHref}
        className={cn(
          "transition-colors text-lg md:text-sm hover:text-primary",
          isActive ? "text-primary font-semibold" : "text-foreground/60",
          className
        )}
        onClick={() => {
            setSheetOpen(false);
            setActiveLink(href);
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" onClick={handleLogoClick}>
            <Code2 className="h-7 w-7 text-primary" />
            <span className="font-headline font-bold text-xl">
              Matthéo Termine
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu principal</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 pt-10">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} className="text-2xl" />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
