import { eachDayOfInterval, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatThreeDayRange(startIso: string, endIso: string): string {
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
