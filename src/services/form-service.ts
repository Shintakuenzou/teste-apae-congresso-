import { axiosApi } from "./api-root";

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

  const response = await axiosApi.post(`/ecm-forms/api/v2/cardindex/${documentId}/cards`, { values });
  const data = response.data();

  return data;
}
