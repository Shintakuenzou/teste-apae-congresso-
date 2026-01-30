interface SendParticipantData {
  documentId: string;
  values: {
    fieldId: string;
    value: string;
  }[];
}

export async function handlePostFormParticipant({ documentId, values }: SendParticipantData) {
  console.log(documentId);

  await fetch("https://firebrick-kingfisher-525619.hostingersite.com/proxy.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error("Erro:", error));
}
