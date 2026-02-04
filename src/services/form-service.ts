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

interface FluigCardField {
  fieldId: string;
  value: string | null;
}

interface FluigCard {
  activeVersion: boolean;
  cardId: number;
  children: FluigCard[];
  companyId: number;
  parentDocumentId: number;
  values: FluigCardField[];
  version: number;
}

interface FluigCardsResponse {
  items: FluigCard[];
  hasNext: boolean;
}

interface PalestranteFields {
  anonymization_date: string | null;
  anonymization_user_id: string | null;
  criado_em: string;
  criado_por: string;
  descricao: string;
  email: string;
  empresa_faculdade: string;
  id_atividade: string;
  id_evento: string;
  modificado_em: string;
  modificado_por: string;
  nome: string;
  status: "ativo" | "inativo";
  url_foto: string;
}

interface Palestrante {
  cardId: number;
  parentDocumentId: number;
  activeVersion: boolean;
  companyId: number;
  version: number;
  fields: PalestranteFields;
}

export function parseFluigCard<T extends Record<string, any>>(card: FluigCard): T {
  const fields = {} as T;

  for (const field of card.values) {
    fields[field.fieldId as keyof T] = (field.value || "") as any;
  }

  return fields;
}

export function parsePalestrante(card: FluigCard): Palestrante {
  const fields = parseFluigCard<PalestranteFields>(card);

  return {
    cardId: card.cardId,
    parentDocumentId: card.parentDocumentId,
    activeVersion: card.activeVersion,
    companyId: card.companyId,
    version: card.version,
    fields,
  };
}

export async function handlePostFormParticipant({ documentId, values }: SendParticipantData): Promise<FluigCardsResponse> {
  // ✅ Validação do documentId
  if (!documentId || documentId === "undefined") {
    console.error("❌ documentId inválido:", documentId);
    throw new Error("documentId é obrigatório e não pode ser undefined");
  }

  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards`;

    // ✅ Em DEV: usa path relativo (Vite Proxy intercepta)
    // ✅ Em PROD: usa query params para proxy.php
    const url = import.meta.env.DEV ? fluigPath : `?endpoint=${encodeURIComponent(fluigPath)}&method=POST`;

    console.log("📤 Enviando POST para:", url);
    console.log("📤 documentId:", documentId);

    const response = await axiosApi.post<FluigCardsResponse>(url, { values });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("❌ Axios error submitting form data:", axiosError.response?.data || axiosError.message);
      throw axiosError;
    }
    throw error;
  }
}

/**
 * Busca dados de participantes (GET)
 */
export async function handleGetFormParticipant({ documentId }: SendParticipantData): Promise<FluigCardsResponse> {
  // ✅ Validação do documentId
  if (!documentId || documentId === "undefined") {
    console.error("❌ documentId inválido:", documentId);
    throw new Error("documentId é obrigatório e não pode ser undefined");
  }

  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards`;

    // ✅ Em DEV: usa path relativo (Vite Proxy intercepta)
    // ✅ Em PROD: usa query params para proxy.php
    const url = import.meta.env.DEV ? fluigPath : `?endpoint=${encodeURIComponent(fluigPath)}&method=GET`;

    console.log("📤 Enviando GET para:", url);
    console.log("📤 documentId:", documentId);

    const response = await axiosApi.get<FluigCardsResponse>(url);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("❌ Axios error fetching form data:", axiosError.response?.data || axiosError.message);
      throw axiosError;
    }
    throw error;
  }
}
