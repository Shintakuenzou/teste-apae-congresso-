import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Menu, User, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { linkOptions } from "@tanstack/react-router";
import LogoApae from "../../public/logo-transparente.png";

const navItems = linkOptions([
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
    label: "Programação",
  },
  {
    to: "/sub-trabalho",
    label: "Submissão de Trabalhos",
  },
  {
    to: "/galeria",
    label: "Galeria",
  },
]);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg border-b-2 border-primary-foreground/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={LogoApae} className="size-20 object-contain p-1" alt="logo apae" />
            </div>
          </Link>

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
              <Link to="/login">
                <User className="size-4" />
                <span>Login</span>
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
                <Link key={item.to} to={item.to} className="block px-4 py-3 rounded-lg text-sm font-medium transition-all text-white" onClick={() => setMobileMenuOpen(false)}>
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
