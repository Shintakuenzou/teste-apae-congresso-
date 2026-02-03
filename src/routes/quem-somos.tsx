import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Target, Award, ArrowRight, Building, Calendar, Globe } from "lucide-react";

export const Route = createFileRoute("/quem-somos")({
  component: QuemSomosPage,
});

const features = [
  {
    icon: Heart,
    title: "Inclusao",
    description: "Promovemos a inclusao social de pessoas com deficiencia intelectual e multipla em todas as esferas da sociedade.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Uma rede de mais de 2.000 APAEs em todo o Brasil, unidas pelo compromisso com a vida e a dignidade humana.",
  },
  {
    icon: Target,
    title: "Missao",
    description: "Defender os direitos das pessoas com deficiencia e promover politicas publicas que garantam sua plena cidadania.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Mais de 60 anos de historia dedicados a educacao especial, saude e assistencia social de qualidade.",
  },
];

const stats = [
  { value: "2.000+", label: "APAEs no Brasil", icon: Building },
  { value: "250.000+", label: "Pessoas atendidas", icon: Users },
  { value: "60+", label: "Anos de historia", icon: Calendar },
  { value: "27", label: "Estados representados", icon: Globe },
];

const timeline = [
  {
    year: "1954",
    title: "Fundacao da primeira APAE",
    description: "A primeira APAE foi fundada no Rio de Janeiro, iniciando o movimento apaeano no Brasil.",
  },
  {
    year: "1962",
    title: "Criacao da Fenapaes",
    description: "A Federacao Nacional das APAEs foi criada para coordenar e fortalecer o movimento em todo o pais.",
  },
  {
    year: "1988",
    title: "Constituicao Federal",
    description: "A nova Constituicao brasileira reconhece os direitos das pessoas com deficiencia.",
  },
  {
    year: "2015",
    title: "Lei Brasileira de Inclusao",
    description: "Marco historico na garantia dos direitos das pessoas com deficiencia no Brasil.",
  },
  {
    year: "2026",
    title: "Congresso Nacional",
    description: "O maior evento do movimento apaeano reunira milhares de participantes em Brasilia.",
  },
];

function QuemSomosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">Quem Somos</h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              A Federacao Nacional das APAEs (Fenapaes) e a maior rede de promocao e defesa dos direitos das pessoas com deficiencia intelectual e multipla do Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent rounded-2xl mb-4">
                  <stat.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Nossa Historia</h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Fundada em 1962, a Fenapaes congrega mais de 2.000 APAEs distribuidas em todos os estados brasileiros, atendendo mais de 250 mil pessoas com deficiencia e suas
                  familias.
                </p>
                <p>
                  O movimento apaeano nasceu da uniao de pais e amigos que buscavam garantir os direitos e a dignidade de pessoas com deficiencia intelectual, numa epoca em que a
                  inclusao era um conceito praticamente inexistente.
                </p>
                <p>
                  Ao longo de mais de seis decadas, a rede APAE se consolidou como referencia em educacao especial, saude, assistencia social e defesa de direitos, sempre com o
                  objetivo de promover a autonomia e a cidadania das pessoas atendidas.
                </p>
              </div>

              <Button asChild size="lg" className="mt-8 group">
                <a href="/inscricao">
                  Participe do Congresso
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Nossa Trajetoria</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Mais de 60 anos de luta pela inclusao e pelos direitos das pessoas com deficiencia</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <Card className="inline-block">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-secondary mb-2">{item.year}</div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="relative z-10 w-4 h-4 bg-secondary rounded-full border-4 border-background shadow-lg" />

                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <Card className="inline-block">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-secondary mb-2">{item.year}</div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">Faca Parte Dessa Historia</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            O Congresso Nacional APAE Brasil 2026 e o maior evento do movimento apaeano, reunindo profissionais, familias e pessoas com deficiencia de todo o pais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-14 px-8">
              <a href="/login">Inscreva-se Agora</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 bg-transparent"
            >
              <a href="/palestras">Ver Programacao</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
