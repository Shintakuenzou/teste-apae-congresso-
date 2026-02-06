import { handleGetFormParticipant, parseAtividadeCard } from "@/services/form-service";
import { useQuery } from "@tanstack/react-query";

export function useAtividade() {
  const { data: atividade } = useQuery({
    queryKey: ["evento_atividade"],
    queryFn: async () => handleGetFormParticipant({ documentId: import.meta.env.VITE_FORM_ATIVIDADE as string }),
  });

  const formatedDataAtividade = atividade?.items.map(parseAtividadeCard);

  return { formatedDataAtividade };
}
