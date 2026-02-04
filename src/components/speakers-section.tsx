import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { handleGetFormParticipant } from "@/services/form-service";

const speakers = [
  {
    id: 1,
    name: "Celiane Ferreira Secunho",
    role: ["Palestrante", "Ex-professora de Introdução à Psicologia — Faculdade Católica de Brasília"],
    organization: "Universidade de Brasília",
    formation: [
      "Graduação em Psicologia — UNICEUB",
      "Pós-graduação em Psicologia Infantil — UNB",
      "Especialização em Resiliência — Universidad de Lanús, Buenos Aires, Argentina",
      "Membro do Grupo de Estudo e Pesquisas em Autismo e Psicose da Infância — GEPAPI",
      "Ex-professora de Psicologia da Infância e Adolescência — UNICEUB",
      "Ex-professora do Curso de Especialização em Transtornos Invasivos do Desenvolvimento — IESCO, DF",
    ],

    notableWorks: [
      {
        type: "Livro",
        title: "Resiliência: A Arte de Enfrentar a Adversidade no Ciclo da Vida",
        role: "Autora",
        year: null,
      },
      {
        type: "Artigo",
        title: "Morrer para Viver — Um paradoxo, a busca do verdadeiro self",
        publication: "Instituto de Psicologia, Universidade de São Paulo (Arquivos)",
        month: "outubro",
        year: 1999,
      },
    ],

    memberships: [
      {
        body: "Câmara Técnica 'Autismo e Psicoses Infanto-Juvenis'",
        institution: "MEC / CORDE / Universidade Católica de Petrópolis",
        role: "Membro da equipe técnica",
        since: "junho de 1996",
      },
    ],

    // Resumo técnico-bio para uso em site, ficha ou card
    technicalBio:
      "Psicóloga com formação em psicologia clínica e infantil, especializada em resiliência. Atua em pesquisa e formação sobre autismo, psicose infanto-juvenil e processos de desenvolvimento. Experiência docente em cursos de graduação e especialização; autora de obra sobre resiliência e publicações em periódicos acadêmicos.",

    image: "/speakers/speaker-1.jpg",
    linkedin: "#",
    twitter: "#",
  },
];

export function SpeakersSection() {
  const { data } = useQuery({
    queryKey: ["palestrantes"],
    queryFn: async () => {
      const palestrantes = await handleGetFormParticipant({ documentId: import.meta.env.VITE_FORM_PALESTRANT as string });
      return palestrantes;
    },
  });

  console.log("data palestrante: ", data);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">Palestrantes</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Conheça Nossos Palestrantes</h2>
            <p className="text-muted-foreground max-w-xl">Profissionais renomados que compartilharão conhecimento e experiências sobre inclusão e deficiência.</p>
          </div>
          <Button variant="outline" className="self-start md:self-auto group bg-transparent" asChild>
            <Link to="/palestrantes">
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker, index) => (
            <Card key={index} className="group border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105">
              <CardContent className="p-0" onClick={() => setSelectedImage(index)}>
                <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary-foreground/20">{speaker.name.charAt(0)}</span>
                  </div>

                  {/* Social Links */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={speaker.linkedin} className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors" aria-label={`LinkedIn de ${speaker.name}`}>
                      <Linkedin className="h-4 w-4 text-foreground" />
                    </a>
                    <a href={speaker.twitter} className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors" aria-label={`Twitter de ${speaker.name}`}>
                      <Twitter className="h-4 w-4 text-foreground" />
                    </a>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-lg font-semibold text-background mb-1">{speaker.name}</h3>
                    <p className="text-sm text-background/80 mb-1">{speaker.role}</p>
                    <p className="text-xs text-background/60">{speaker.organization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button
            className="absolute top-4 right-4 p-2 bg-background/20 rounded-full hover:bg-background/40 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar"
          >
            <X className="h-6 w-6 text-background" />
          </button>

          <div className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-primary/20 flex items-center justify-center">
              <span className="text-8xl font-bold text-primary-foreground/30">{speakers[selectedImage].id}</span>
            </div>
            <div className="p-6">
              {speakers[selectedImage].role.map((role, index) => (
                <Badge key={index} className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mr-2 mb-2">
                  {role}
                </Badge>
              ))}
              <h3 className="text-2xl font-bold text-foreground mb-2">{speakers[selectedImage].name}</h3>
              <p className="text-muted-foreground">{speakers[selectedImage].formation}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
