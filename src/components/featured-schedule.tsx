import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ArrowRight, Star } from "lucide-react";

const featuredEvents = [
  {
    time: "09:00 - 10:30",
    title: "Abertura Oficial do Congresso",
    speaker: "Presidente da Federação Nacional das APAEs",
    location: "Auditório Principal",
    category: "Cerimônia",
    highlight: true,
  },
  {
    time: "11:00 - 12:30",
    title: "Políticas Públicas e Inclusão Social",
    speaker: "Ministério da Cidadania",
    location: "Auditório Principal",
    category: "Palestra Magna",
    highlight: true,
  },
  {
    time: "14:00 - 15:30",
    title: "Inovações em Educação Especial",
    speaker: "Dra. Maria Santos",
    location: "Sala 1",
    category: "Palestra",
    highlight: false,
  },
];

export function FeaturedSchedule() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <Badge className="bg-accent text-accent-foreground mb-4">
              <Star className="h-3 w-3 mr-1" />
              Destaque
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Programação em Destaque</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">Confira os principais eventos do primeiro dia do congresso</p>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto group bg-transparent">
            <a href="/palestras">
              Ver programação completa
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredEvents.map((event, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
                event.highlight ? "border-secondary/50 bg-gradient-to-br from-secondary/5 to-transparent" : "border-border"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-semibold text-secondary">{event.time}</span>
                </div>

                <Badge variant="outline" className={`mb-3 ${event.highlight ? "border-secondary text-secondary" : "border-muted-foreground/30 text-muted-foreground"}`}>
                  {event.category}
                </Badge>

                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">{event.title}</h3>

                <p className="text-sm text-muted-foreground mb-4">{event.speaker}</p>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{event.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
