import React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import BgLogin from "../../public/login-bg.png";
import { formatCPF } from "@/utils/format-cpf";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    password: "",
  });

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setFormData({ ...formData, cpf: formatted });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula autenticacao
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    // Redireciona para o painel do participante
    // router.push("/painel");
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Imagem de fundo */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BgLogin})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Voltar ao site</span>
          </Link>

          <div className="space-y-6">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight text-balance">Juntos pela inclusao e transformacao social</h2>
            <p className="text-lg text-primary-foreground/90 max-w-md">
              A APAE atua ha mais de 60 anos promovendo a inclusao de pessoas com deficiencia intelectual e multipla, transformando vidas e construindo uma sociedade mais justa.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold">2.200+</p>
              <p className="text-sm text-primary-foreground/80">APAEs no Brasil</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/30" />
            <div>
              <p className="text-3xl font-bold">250 mil+</p>
              <p className="text-sm text-primary-foreground/80">Pessoas atendidas</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/30" />
            <div>
              <p className="text-3xl font-bold">60+</p>
              <p className="text-sm text-primary-foreground/80">Anos de historia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulario */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col bg-background">
        {/* Header mobile */}
        <header className="p-6 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Voltar ao site</span>
          </Link>
        </header>

        {/* Conteudo centralizado */}
        <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo e titulo */}
            <div className="text-center space-y-3">
              <div className="inline-flex lg:hidden items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground font-bold text-xl shadow-lg">APAE</div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Acesse sua conta</h1>
                <p className="text-muted-foreground mt-1">Congresso Nacional APAE Brasil 2026</p>
              </div>
            </div>

            {/* Card de login */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo CPF */}
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-sm font-medium">
                      CPF
                    </Label>
                    <Input id="cpf" type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={handleCPFChange} className="h-12 text-base" required />
                  </div>

                  {/* Campo Senha */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Senha
                      </Label>
                      <Link to="/recuperar-senha" className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors">
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="h-12 text-base pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Botao de login */}
                  <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 cursor-pointer" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Entrando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="h-5 w-5" />
                        Entrar
                      </span>
                    )}
                  </Button>
                </form>

                {/* Divisor */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground">Ainda nao tem conta?</span>
                  </div>
                </div>

                {/* Link para inscricao */}
                <Link to="/inscricao">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-semibold border-2 hover:bg-secondary/10 hover:border-secondary hover:text-secondary bg-transparent cursor-pointer"
                  >
                    Faça inscrição
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
