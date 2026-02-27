import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PanelLeft, User } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function HeaderActions() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hidden md:flex items-center">
      {isAuthenticated ? (
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-md hover:shadow-lg transition-all flex items-center">
          <Link to="/painel/data">
            <PanelLeft className="size-4" />
            <span>Meu painel</span>
          </Link>
        </Button>
      ) : (
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-md hover:shadow-lg transition-all flex items-center">
          <Link to="/login">
            <User className="size-4" />
            <span>Minha área</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
