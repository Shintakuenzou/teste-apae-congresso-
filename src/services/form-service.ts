import type { AxiosError } from "axios";
import { axiosApi } from "./api-root";
import axios from "axios";

interface SendParticipantData {
  documentId: string;
  values?: {
    fieldId: string;
    value: string;
  }[];
}

export async function handlePostFormParticipant({ documentId, values }: SendParticipantData) {
  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards`;

    // ✅ Em DEV: usa path relativo (Vite Proxy intercepta)
    // ✅ Em PROD: usa query params para proxy.php
    const url = import.meta.env.DEV ? fluigPath : `?endpoint=${encodeURIComponent(fluigPath)}&method=POST`;

    console.log("📤 Enviando POST para:", url);
    const response = await axiosApi.post(url, { values });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("❌ Axios error submitting form data:", axiosError.response?.data || axiosError.message);
      return;
    }
  }
}

export async function handleGetFormParticipant({ documentId }: SendParticipantData) {
  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards`;

    // ✅ Em DEV: usa path relativo (Vite Proxy intercepta)
    // ✅ Em PROD: usa query params para proxy.php
    const url = import.meta.env.DEV ? fluigPath : `?endpoint=${encodeURIComponent(fluigPath)}&method=GET`;

    console.log("📤 Enviando GET para:", url);
    const response = await axiosApi.get(url);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("❌ Axios error fetching form data:", axiosError.response?.data || axiosError.message);
      return;
    }
  }
}
