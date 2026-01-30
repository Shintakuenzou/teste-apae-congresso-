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
  console.log("documentId", documentId);

  const response = await axiosApi.post(`https://firebrick-kingfisher-525619.hostingersite.com/proxy.php`, { values });
  const data = response.data();

  return data;
}
