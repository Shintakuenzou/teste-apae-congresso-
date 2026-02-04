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
  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards`;

    const url = import.meta.env.DEV ? fluigPath : `https://firebrick-kingfisher-525619.hostingersite.com/proxy.php?endpoint=${fluigPath}&method=POST`;

    console.log("📤 Enviando para:", url);
    let response = await axiosApi.post(url, { values });

    if (values.length > 0) {
      response = await axiosApi.post(url, { values });
    }

    response = await axiosApi.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("❌ Axios error submitting form data:", axiosError.response?.data || axiosError.message);
      return;
    }
  }
}
