import { Button } from "@/components/ui/button";
import { useEvents } from "@/hooks/useEvents";
import { Link } from "@tanstack/react-router";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, MapPin, ArrowRight, Users, Mic2, Building } from "lucide-react";

export function Hero() {
  const { formatedDataEvento } = useEvents();
  let firstTitle;
  let lastTitle;
  let description;
  let date;
  let location;
  console.log(formatedDataEvento);

  if (formatedDataEvento && formatedDataEvento.length > 0) {
    const idx = formatedDataEvento.length - 1;
    const tituloRaw = formatedDataEvento[idx]?.fields?.titulo ?? "";

    firstTitle = tituloRaw.replaceAll(" ", ",").split(",").slice(0, 2).join(" ") as string;
    lastTitle = tituloRaw.replaceAll(" ", ",").split(",").slice(2).join(" ") as string;

    description = formatedDataEvento[idx].fields.descricao;
    date = formatThreeDayRange(formatedDataEvento[idx].fields.data_inicio, formatedDataEvento[idx].fields.data_fim);
    location = `${formatedDataEvento[idx].fields.cidade}-${formatedDataEvento[idx].fields.estado}`;
  } else {
    firstTitle = "" as string;
    lastTitle = "" as string;
    description = "" as string;
  }

  function formatThreeDayRange(startIso: string, endIso: string): string {
    const start = parseISO(startIso);
    const end = parseISO(endIso);

    const days = eachDayOfInterval({ start, end });

    // agrupa por mês/ano
    const groups: Date[][] = [];
    days.forEach((d) => {
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const lastGroup = groups[groups.length - 1];
      if (!lastGroup || `${lastGroup[0].getFullYear()}-${lastGroup[0].getMonth()}` !== key) {
        groups.push([d]);
      } else {
        lastGroup.push(d);
      }
    });

    const parts = groups.map((g) => {
      const dayNumbers = g.map((d) => format(d, "d", { locale: ptBR }));
      const daysJoined = dayNumbers.join(" e ");
      const monthName = format(g[0], "MMMM", { locale: ptBR });
      return `${daysJoined} de ${monthName}`;
    });

    const year = format(end, "yyyy", { locale: ptBR });
    return `${parts.join(" e ")} de ${year}`;
  }

  return (
    <section className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-foreground/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary-foreground leading-[1.1]">
            {firstTitle}
            <br />
            <span className="text-secondary">{lastTitle}</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-primary-foreground/75 max-w-2xl leading-relaxed">{description}</p>

          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 h-14 font-semibold shadow-lg hover:shadow-xl transition-all group"
            >
              <Link to="/login">
                Garanta sua vaga
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-6 text-primary-foreground/70">
            <div className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 rounded-full">
              <Calendar className="h-5 w-5 text-secondary" />
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 rounded-full">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="font-medium">{location}</span>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
          {[
            { value: "5.000+", label: "Participantes", icon: Users },
            { value: "50+", label: "Palestras", icon: Mic2 },
            { value: "4", label: "Dias de evento", icon: Calendar },
            { value: "2.000+", label: "APAEs representadas", icon: Building },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-5 hover:bg-primary-foreground/10 transition-colors"
            >
              <stat.icon className="h-6 w-6 text-secondary mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-sm text-primary-foreground/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
