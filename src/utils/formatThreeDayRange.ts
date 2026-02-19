import { eachDayOfInterval, format, parseISO, isSameDay, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * VERSÃO SIMPLES - Detecta intervalos longos e usa formato resumido
 */
export function formatThreeDayRangeSimple(startIso: string, endIso: string): string {
  const start = parseISO(startIso);
  const end = parseISO(endIso);

  // Se for o mesmo dia
  if (isSameDay(start, end)) {
    return format(start, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  const daysDiff = differenceInDays(end, start);

  // Se for mais de 30 dias, usa formato resumido
  if (daysDiff > 30) {
    const startFormatted = format(start, "dd 'de' MMMM", { locale: ptBR });
    const endFormatted = format(end, "dd 'de' MMMM", { locale: ptBR });
    return `${startFormatted} a ${endFormatted}`;
  }

  // Se for até 30 dias, usa a lógica detalhada
  const days = eachDayOfInterval({ start, end });

  type MonthGroup = {
    year: number;
    month: number;
    days: Date[];
  };

  const groups: MonthGroup[] = [];
  days.forEach((d) => {
    const year = d.getFullYear();
    const month = d.getMonth();

    const lastGroup = groups[groups.length - 1];
    if (!lastGroup || lastGroup.year !== year || lastGroup.month !== month) {
      groups.push({ year, month, days: [d] });
    } else {
      lastGroup.days.push(d);
    }
  });

  function formatDays(dates: Date[]): string {
    if (dates.length === 1) {
      return format(dates[0], "d", { locale: ptBR });
    }

    const ranges: { start: Date; end: Date }[] = [];
    let rangeStart = dates[0];
    let rangeEnd = dates[0];

    for (let i = 1; i < dates.length; i++) {
      const currentDay = dates[i].getDate();
      const previousDay = dates[i - 1].getDate();

      if (currentDay === previousDay + 1) {
        rangeEnd = dates[i];
      } else {
        ranges.push({ start: rangeStart, end: rangeEnd });
        rangeStart = dates[i];
        rangeEnd = dates[i];
      }
    }
    ranges.push({ start: rangeStart, end: rangeEnd });

    const parts = ranges.map((range) => {
      const startDay = format(range.start, "d", { locale: ptBR });
      const endDay = format(range.end, "d", { locale: ptBR });

      if (startDay === endDay) {
        return startDay;
      } else if (range.end.getDate() === range.start.getDate() + 1) {
        return `${startDay} e ${endDay}`;
      } else {
        return `${startDay} a ${endDay}`;
      }
    });

    return parts.join(", ");
  }

  const monthParts = groups.map((g) => {
    const daysFormatted = formatDays(g.days);
    const monthName = format(g.days[0], "MMMM", { locale: ptBR });
    return `${daysFormatted} de ${monthName}`;
  });

  const year = format(end, "yyyy", { locale: ptBR });
  const allSameYear = groups.every((g) => g.year === groups[0].year);

  if (allSameYear) {
    return `${monthParts.join(", ")} de ${year}`;
  } else {
    return groups
      .map((g, idx) => {
        const daysFormatted = formatDays(g.days);
        const monthName = format(g.days[0], "MMMM", { locale: ptBR });
        const groupYear = g.year;
        const showYear = idx === groups.length - 1 || g.year !== groups[idx + 1].year;

        if (showYear) {
          return `${daysFormatted} de ${monthName} de ${groupYear}`;
        } else {
          return `${daysFormatted} de ${monthName}`;
        }
      })
      .join(", ");
  }
}
