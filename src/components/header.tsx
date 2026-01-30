import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Menu, User, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { linkOptions } from "@tanstack/react-router";

const navItems = linkOptions([
  {
    to: "/",
    label: "Home",
    activeOptions: { exact: true },
  },
  {
    to: "/quem-somos",
    label: "Quem Somos",
  },
  {
    to: "/palestrantes",
    label: "Palestrantes",
  },
  {
    to: "/palestras",
    label: "Programacao",
  },
]);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between py-3">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-primary font-black text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-primary-foreground tracking-wide">APAE BRASIL</span>
              <span className="text-xs text-primary-foreground/70">Congresso Nacional 2026</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              return (
                <Link key={item.to} to={item.to} className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-white">
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-md hover:shadow-lg transition-all flex items-center"
            >
              <Link to="/inscricao">
                <User />
                Login
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 shadow-xl">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              return (
                <Link key={item.to} to={item.to} className="block px-4 py-3 rounded-lg text-sm font-medium transition-all" onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Button asChild size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                <a href="/inscricao" onClick={() => setMobileMenuOpen(false)}>
                  Inscreva-se
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
