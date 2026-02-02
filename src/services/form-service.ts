import type { AxiosError } from "axios";
import { axiosApi } from "./api-root";
import axios from "axios";

interface SendParticipantData {
  documentId: string;
  values: {
    fieldId: string;
    value: string;
  }[];
}

export async function handlePostFormParticipant({ documentId, values }: SendParticipantData) {
  console.log("values: ", values);
  console.log("values: ", import.meta.env.VITE_CONSUMER_KEY_BASE_TESTE);
  console.log("documentId", documentId);

  try {
    // ✅ Define a URL correta baseado no ambiente
    const endpoint = import.meta.env.DEV
      ? `/ecm-forms/api/v2/cardindex/${documentId}/cards` // Endpoint do Fluig (proxy vai interceptar)
      : `https://firebrick-kingfisher-525619.hostingersite.com/proxy.php`; // Proxy em produção

    console.log("📤 Enviando para:", endpoint);
    console.log("🔧 Modo:", import.meta.env.DEV ? "DEV" : "PROD");

    const response = await axiosApi.post(endpoint, { values });
    const data = response;

    console.log("✅ Formulário enviado com sucesso:", data);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("❌ Axios error submitting form data:", axiosError.response?.data || axiosError.message);
      return;
    }
  } finally {
    console.log("Request to submit form data completed.");
  }
}
