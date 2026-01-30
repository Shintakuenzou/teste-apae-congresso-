import { createFileRoute } from '@tanstack/react-router'

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram } from "lucide-react";

export const Route = createFileRoute('/palestrantes')({
  component: PalestrantesPage,
})


const palestrantes = [
  {
    nome: "Dra. Maria Helena Costa",
    cargo: "Presidente da Fenapaes",
    foto: "/palestrantes/maria-helena.jpg",
    especialidade: "Politicas Publicas",
    bio: "Mais de 30 anos de atuacao no movimento apaeano. Especialista em politicas publicas para pessoas com deficiencia e inclusao social.",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Dr. Carlos Eduardo Silva",
    cargo: "Neurologista Pediatrico",
    foto: "/palestrantes/carlos-silva.jpg",
    especialidade: "Neurociencia",
    bio: "Referencia nacional em neurologia pediatrica com foco em desenvolvimento cognitivo e intervencao precoce.",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Prof. Ana Beatriz Ferreira",
    cargo: "Pedagoga e Pesquisadora",
    foto: "/palestrantes/ana-beatriz.jpg",
    especialidade: "Educacao Inclusiva",
    bio: "Doutora em Educacao pela USP. Autora de diversos livros sobre metodologias de ensino inclusivo.",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Dr. Roberto Mendes",
    cargo: "Psiquiatra",
    foto: "/palestrantes/roberto-mendes.jpg",
    especialidade: "Saude Mental",
    bio: "Especialista em saude mental de pessoas com deficiencia intelectual. Coordenador de programas de bem-estar.",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Profa. Lucia Santos",
    cargo: "Terapeuta Ocupacional",
    foto: "/palestrantes/lucia-santos.jpg",
    especialidade: "Terapia Ocupacional",
    bio: "Pioneira em tecnicas de integracao sensorial no Brasil. Formadora de profissionais em todo o pais.",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Dr. Fernando Lima",
    cargo: "Advogado",
    foto: "/palestrantes/fernando-lima.jpg",
    especialidade: "Direitos da PcD",
    bio: "Especialista em direitos das pessoas com deficiencia. Consultor juridico da Fenapaes ha 15 anos.",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Dra. Patricia Oliveira",
    cargo: "Fonoaudiologa",
    foto: "/palestrantes/patricia-oliveira.jpg",
    especialidade: "Comunicacao",
    bio: "Referencia em comunicacao alternativa e aumentativa. Desenvolvedora de protocolos de intervencao.",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Prof. Marcos Ribeiro",
    cargo: "Educador Fisico",
    foto: "/palestrantes/marcos-ribeiro.jpg",
    especialidade: "Esporte Adaptado",
    bio: "Coordenador de programas de esporte adaptado. Formou atletas paralimpicos em diversas modalidades.",
    linkedin: "#",
    instagram: "#",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

  function PalestrantesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-12 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">Palestrantes</h1>
            <p className="text-lg text-primary-foreground/80">Conheca os especialistas que compartilharao conhecimentos e experiencias no Congresso Nacional APAE Brasil 2026.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {palestrantes.map((palestrante, index) => (
              <Card key={index} className="group border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <span className="text-2xl font-bold text-primary">{getInitials(palestrante.nome)}</span>
                    </div>

                    <Badge variant="secondary" className="mb-3 bg-secondary/10 text-secondary hover:bg-secondary/20">
                      {palestrante.especialidade}
                    </Badge>

                    <h3 className="font-semibold text-foreground mb-1">{palestrante.nome}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{palestrante.cargo}</p>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{palestrante.bio}</p>

                    <div className="flex items-center gap-3">
                      <a
                        href={palestrante.linkedin}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={`LinkedIn de ${palestrante.nome}`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={palestrante.instagram}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={`Instagram de ${palestrante.nome}`}
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quer palestrar no Congresso?</h2>
          <p className="text-muted-foreground mb-6">Estamos com chamada aberta para palestras e workshops. Compartilhe seu conhecimento com a comunidade apaeana.</p>
          <a
            href="mailto:palestras@apae.org.br"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Enviar proposta
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

