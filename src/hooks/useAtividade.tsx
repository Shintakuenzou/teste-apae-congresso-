import { fetchDataset } from "@/services/fetch-dataset";
import type { EventoFields } from "@/services/form-service";
import { useQuery } from "@tanstack/react-query";

export function useAtividade(id_lote: string) {
  const { data: atividade } = useQuery({
    queryKey: ["evento_atividade", id_lote],
    queryFn: async () =>
      fetchDataset<EventoFields>({
        datasetId: "cadAtividadeCN",
        constraints: [
          {
            fieldName: "id_lote",
            initialValue: id_lote,
            finalValue: id_lote,
            constraintType: "MUST",
          },
        ],
      }),
    enabled: !!id_lote,
  });

  return { atividade };
}
