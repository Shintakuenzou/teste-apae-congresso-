import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Link } from '@tanstack/react-router'
import { Clock, User, MapPin, Calendar, ArrowRight, Filter } from "lucide-react";

export const Route = createFileRoute('/palestras')({
  component: PalestrasPage,
})

 



const days = [
  { id: "dia1", label: "15 de Agosto", shortLabel: "Dia 1" },
  { id: "dia2", label: "16 de Agosto", shortLabel: "Dia 2" },
  { id: "dia3", label: "17 de Agosto", shortLabel: "Dia 3" },
  { id: "dia4", label: "18 de Agosto", shortLabel: "Dia 4" },
];

const categories = ["Todos", "Cerimonia", "Palestra Magna", "Palestra", "Workshop", "Painel"];

const schedule: Record<
  string,
  Array<{
    time: string;
    title: string;
    speaker: string;
    location: string;
    category: string;
    description: string;
  }>
> = {
  dia1: [
    {
      time: "08:00 - 09:00",
      title: "Credenciamento e Recepcao",
      speaker: "Equipe de Organizacao",
      location: "Hall Principal",
      category: "Credenciamento",
      description: "Retirada de crachas e materiais do evento.",
    },
    {
      time: "09:00 - 10:30",
      title: "Abertura Oficial do Congresso",
      speaker: "Presidente da Federacao Nacional das APAEs",
      location: "Auditorio Principal",
      category: "Cerimonia",
      description: "Cerimonia de abertura com autoridades e representantes do movimento apaeano.",
    },
    {
      time: "11:00 - 12:30",
      title: "Politicas Publicas e Inclusao Social",
      speaker: "Ministerio da Cidadania",
      location: "Auditorio Principal",
      category: "Palestra Magna",
      description: "Panorama das politicas publicas para pessoas com deficiencia no Brasil.",
    },
    {
      time: "14:00 - 15:30",
      title: "Inovacoes em Educacao Especial",
      speaker: "Dra. Maria Santos",
      location: "Sala 1",
      category: "Palestra",
      description: "Novas metodologias e tecnologias aplicadas a educacao especial.",
    },
    {
      time: "14:00 - 15:30",
      title: "Gestao de Recursos em APAEs",
      speaker: "Conselho Fiscal Fenapaes",
      location: "Sala 2",
      category: "Workshop",
      description: "Boas praticas de gestao financeira e captacao de recursos.",
    },
    {
      time: "16:00 - 17:30",
      title: "Tecnologias Assistivas: Tendencias e Aplicacoes",
      speaker: "Prof. Joao Silva",
      location: "Sala 1",
      category: "Workshop",
      description: "Demonstracao pratica de tecnologias assistivas para inclusao.",
    },
  ],
  dia2: [
    {
      time: "09:00 - 10:30",
      title: "Saude Mental e Bem-estar",
      speaker: "Dr. Carlos Mendes",
      location: "Auditorio Principal",
      category: "Palestra",
      description: "Abordagens integradas para saude mental de pessoas com deficiencia.",
    },
    {
      time: "11:00 - 12:30",
      title: "Empregabilidade e Inclusao no Mercado de Trabalho",
      speaker: "Ana Paula Ferreira",
      location: "Auditorio Principal",
      category: "Palestra Magna",
      description: "Cases de sucesso e estrategias para inclusao profissional.",
    },
    {
      time: "14:00 - 15:30",
      title: "Praticas Pedagogicas Inclusivas",
      speaker: "Profa. Lucia Oliveira",
      location: "Sala 1",
      category: "Workshop",
      description: "Metodologias ativas para educacao inclusiva.",
    },
    {
      time: "14:00 - 15:30",
      title: "Comunicacao Alternativa",
      speaker: "Fonoaudiologa Rita Campos",
      location: "Sala 2",
      category: "Workshop",
      description: "Tecnicas e recursos de comunicacao alternativa aumentativa.",
    },
    {
      time: "16:00 - 17:30",
      title: "Direitos da Pessoa com Deficiencia",
      speaker: "Dr. Roberto Almeida",
      location: "Auditorio Principal",
      category: "Palestra",
      description: "Aspectos juridicos e defesa de direitos.",
    },
  ],
  dia3: [
    {
      time: "09:00 - 10:30",
      title: "Familia e Rede de Apoio",
      speaker: "Psicologa Fernanda Costa",
      location: "Auditorio Principal",
      category: "Palestra",
      description: "O papel da familia no desenvolvimento e inclusao social.",
    },
    {
      time: "11:00 - 12:30",
      title: "Gestao de APAEs: Desafios e Solucoes",
      speaker: "Conselho Administrativo",
      location: "Auditorio Principal",
      category: "Painel",
      description: "Debate sobre gestao, sustentabilidade e inovacao nas APAEs.",
    },
    {
      time: "14:00 - 15:30",
      title: "Arte e Cultura como Ferramentas de Inclusao",
      speaker: "Artistas Convidados",
      location: "Espaco Cultural",
      category: "Apresentacao",
      description: "Apresentacoes artisticas e debate sobre arte inclusiva.",
    },
    {
      time: "16:00 - 17:30",
      title: "Esporte Paralimpico: Historias de Superacao",
      speaker: "Atletas Paralimpicos",
      location: "Auditorio Principal",
      category: "Painel",
      description: "Depoimentos e reflexoes sobre esporte e inclusao.",
    },
  ],
  dia4: [
    {
      time: "09:00 - 10:30",
      title: "Acessibilidade Digital",
      speaker: "Especialistas em TI",
      location: "Sala 1",
      category: "Workshop",
      description: "Como tornar ambientes digitais acessiveis para todos.",
    },
    {
      time: "09:00 - 10:30",
      title: "Envelhecimento e Deficiencia",
      speaker: "Dra. Patricia Lima",
      location: "Sala 2",
      category: "Palestra",
      description: "Desafios e cuidados no envelhecimento de pessoas com deficiencia.",
    },
    {
      time: "11:00 - 12:30",
      title: "Futuro da Inclusao no Brasil",
      speaker: "Painel de Especialistas",
      location: "Auditorio Principal",
      category: "Painel",
      description: "Perspectivas e tendencias para os proximos anos.",
    },
    {
      time: "14:00 - 15:30",
      title: "Assembleia Geral da Federacao",
      speaker: "Membros Federados",
      location: "Auditorio Principal",
      category: "Assembleia",
      description: "Deliberacoes e eleicoes da Fenapaes.",
    },
    {
      time: "16:00 - 17:30",
      title: "Encerramento e Premiacoes",
      speaker: "Diretoria Executiva",
      location: "Auditorio Principal",
      category: "Cerimonia",
      description: "Cerimonia de encerramento com premiacoes e agradecimentos.",
    },
  ],
};

  function PalestrasPage() {
  const [selectedDay, setSelectedDay] = useState("dia1");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredSchedule = schedule[selectedDay].filter((event) => selectedCategory === "Todos" || event.category === selectedCategory);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">Programacao Completa</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">Quatro dias de palestras, workshops e networking para transformar a inclusao no Brasil.</p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Day Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {days.map((day) => (
              <Button
                key={day.id}
                variant={selectedDay === day.id ? "default" : "outline"}
                onClick={() => setSelectedDay(day.id)}
                className={`${selectedDay === day.id ? "bg-primary text-primary-foreground" : ""}`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{day.label}</span>
                <span className="sm:hidden">{day.shortLabel}</span>
              </Button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-border">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">Filtrar:</span>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${selectedCategory === category ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "hover:bg-muted"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            {filteredSchedule.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma atividade encontrada para este filtro.</p>
              </div>
            ) : (
              filteredSchedule.map((event, index) => (
                <Card key={index} className="border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-48 flex-shrink-0 bg-muted p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-secondary font-semibold mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <Badge variant="outline" className="w-fit mt-2 border-secondary/50 text-secondary">
                          {event.category}
                        </Badge>
                      </div>

                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{event.title}</h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-secondary" />
                            <span>{event.speaker}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-secondary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Garanta sua vaga e participe de todas as atividades do congresso.</p>
            <Button asChild size="lg" className="group">
              <Link to='/inscricao' href="/inscricao">
                Inscreva-se Agora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

