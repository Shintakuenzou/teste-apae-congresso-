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
    const response = await axiosApi.post(`https://firebrick-kingfisher-525619.hostingersite.com/proxy.php`, { values });
    const data = response.data;

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios error submitting form data:", axiosError.response?.data || axiosError.message);
      return;
    }
  } finally {
    console.log("Request to submit form data completed.");
  }
}
