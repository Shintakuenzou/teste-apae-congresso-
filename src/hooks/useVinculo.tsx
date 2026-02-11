import { fetchDataset } from "@/services/fetch-dataset";
import { useQuery } from "@tanstack/react-query";

export interface VinculoFields {
  atividade: string;
  cardid: string;
  companyid: string;
  criado_em: string;
  criado_por: string;
  documentid: string;
  id: string;
  id_atividade: string;
  id_evento: string;
  id_palestrante: string;
  modificado_em: string;
  modificado_por: string;
  palestrante: string;
  tableid: string;
}

export function useVinculo() {
  const { data: vinculo } = useQuery({
    queryKey: ["vincPalestraAtividadeCN"],
    queryFn: async () =>
      await fetchDataset<VinculoFields>({
        datasetId: "vincPalestraAtividadeCN",
      }),
  });

  return { vinculo };
}
