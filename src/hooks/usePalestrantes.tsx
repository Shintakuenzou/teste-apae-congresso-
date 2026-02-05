import { handleGetFormParticipant, parsePalestrante } from "@/services/form-service";
import { useQuery } from "@tanstack/react-query";

export function usePalestrantes() {
  const { data: palestrantes } = useQuery({
    queryKey: ["palestrantes"],
    queryFn: async () => await handleGetFormParticipant({ documentId: import.meta.env.VITE_FORM_PALESTRANT as string }),
  });

  const formatedDataPalestrantes = palestrantes?.items.map(parsePalestrante);

  return { formatedDataPalestrantes };
}
