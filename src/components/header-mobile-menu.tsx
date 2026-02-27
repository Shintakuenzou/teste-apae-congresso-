import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/navigation";

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-primary border-t border-primary-foreground/10 shadow-xl">
      <div className="px-4 py-6 space-y-2">
        {navItems.map((item) => {
          return (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-3 rounded-lg text-sm font-medium transition-all text-white"
              onClick={onClose}
              activeProps={{
                className: "bg-red-500/20 font-bold",
              }}
              activeOptions={{
                exact: true,
              }}
            >
              {item.label}
            </Link>
          );
        })}
        <div className="pt-4">
          <Button asChild size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
            <a href="/inscricao" onClick={onClose}>
              Inscreva-se
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
