import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Ticket, LogOut, History, ShoppingCart } from "lucide-react";
import LogoApae from "/logo-transparente.png";
import { useAuth } from "@/context/auth-context";

export const Route = createFileRoute("/painel")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }

    if (location.pathname == "/painel") {
      throw redirect({
        to: "/painel/data",
        replace: true,
      });
    }
  },
  component: PainelPage,
});

function PainelPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header do Painel */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <img src={LogoApae} className="size-10 object-cover rounded-full p-1" alt="logo apae" />
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">
                  {user?.nome} {user?.sobrenome}
                </p>
                <p className="text-xs opacity-80">{user?.inscricao}</p>
              </div>
              <Link
                to="/login"
                className="text-primary-foreground hover:bg-white/10 cursor-pointer"
                onClick={() => {
                  logout();
                }}
              >
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10 hover:text-white cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Minha Conta</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus dados e acompanhe sua inscrição</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Menu Lateral */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  <Link
                    to="/painel/data"
                    activeProps={{
                      className: "bg-white/20 font-bold",
                    }}
                    activeOptions={{ exact: true }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-muted"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Dados Cadastrais</span>
                  </Link>
                  <Link to="/painel/evento" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-muted">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-medium">Comprar Eventos</span>
                  </Link>
                  <Link to="/painel/historico" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-muted">
                    <History className="h-5 w-5" />
                    <span className="font-medium">Historico</span>
                  </Link>
                  <Link to="/painel/ingresso" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-muted">
                    <Ticket className="h-5 w-5" />
                    <span className="font-medium">Meu Ingresso</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
}
