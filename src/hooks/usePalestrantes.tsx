import { fetchDataset } from "@/services/fetch-dataset";
import type { PalestranteFields } from "@/services/form-service";
import { useQuery } from "@tanstack/react-query";

export function usePalestrantes(event_id: string) {
  console.log("event_id: ", event_id);

  const { data: palestrantes } = useQuery({
    queryKey: ["palestrantes", event_id],
    queryFn: async () =>
      await fetchDataset<PalestranteFields>({
        datasetId: "cadPalestranteCN",
        constraints: [
          {
            fieldName: "id_evento",
            initialValue: event_id,
            finalValue: event_id,
            constraintType: "MUST",
          },
        ],
      }),
    enabled: !!event_id,
  });

  return { palestrantes };
}
