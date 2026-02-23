import type { AxiosError } from "axios";
import { axiosApi } from "./api-root";
import axios from "axios";
import type { VinculoFields } from "@/hooks/useVinculo";

interface SendParticipantData {
  documentId: string;
  cardId?: string;
  values?: { fieldId: string; value: string | null }[];
  queryParams?: string;
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

export interface PalestranteFields {
  anonymization_date: string | null;
  anonymization_user_id: string | null;
  criado_em: string;
  criado_por: string;
  descricao: string;
  email: string;
  eixo: string
  empresa_faculdade: string;
  id_atividade: string;
  id_evento: string;
  modificado_em: string;
  modificado_por: string;
  nome: string;
  status: "ativo" | "inativo";
  url_foto: string;
  youtube: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

export interface EventoFields {
  bairro: string;
  categoria_evento: string;
  cep: string;
  cidade: string;
  criado_em: string;
  criado_por: string;
  data_fim: string;
  data_inicio: string;
  descricao: string;
  endereco: string;
  estado: string;
  hora_fim: string;
  hora_inicio: string;
  local: string;
  local_evento: string;
  modificado_em: string;
  modificado_por: string;
  pais: string;
  tipo_evento: string;
  titulo: string;
  datas: string[];
}

export interface LoteFields {
  anonymization_date: string;
  anonymization_user_id: string;
  data_fim_vendas: string;
  data_inicio_vendas: string;
  descricao: string;
  hora_fim_vendas: string;
  hora_inicio_vendas: string;
  maximo_compra: string;
  minimo_compra: string;
  nome: string;
  preco: string;
  publico_privado: string;
  quantidade: string;
}

export interface ActivityFields {
  documentid: string;
  anonymization_date: string | null;
  anonymization_user_id: string | null;
  cardid: string;
  criado_em: string;
  criado_por: string;
  descricao: string;
  id_lote: string;
  id_tipo_atividade: string;
  lote: string;
  modificado_em: string;
  modificado_por: string;
  sala: string;
  tipo_atividade: string;
  titulo: string;
  url_foto: string;
  vagas_disponiveis: string;
  palestrantes: VinculoFields[];
  hora_fim: string;
  hora_inicio: string;
  data_fim: string;
  data_inicio: string;
  eixo: string;
}

export interface Palestrante<T = PalestranteFields> {
  cardId: number;
  parentDocumentId: number;
  activeVersion: boolean;
  companyId: number;
  version: number;
  fields: T;
}

type PalestranteCard = Palestrante<PalestranteFields>;
export type EventoCard = Palestrante<EventoFields>;
type LoteCard = Palestrante<LoteFields>;
type AtividadeCard = Palestrante<ActivityFields>;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function parseFluigCard<T extends Record<string, any>>(card: FluigCard): T {
  const fields = {} as T;

  for (const field of card.values) {
    fields[field.fieldId as keyof T] = (field.value || "") as any;
  }

  return fields;
}

export function parsePalestrante<T extends Record<string, any> = PalestranteFields>(card: FluigCard): Palestrante<T> {
  const fields = parseFluigCard<T>(card);

  return {
    cardId: card.cardId,
    parentDocumentId: card.parentDocumentId,
    activeVersion: card.activeVersion,
    companyId: card.companyId,
    version: card.version,
    fields,
  };
}

export function parsePalestranteCard(card: FluigCard): PalestranteCard {
  return parsePalestrante<PalestranteFields>(card);
}

export function parseEventoCard(card: FluigCard): EventoCard {
  return parsePalestrante<EventoFields>(card);
}

export function parseLoteCard(card: FluigCard): LoteCard {
  return parsePalestrante<LoteFields>(card);
}

export function parseAtividadeCard(card: FluigCard): AtividadeCard {
  return parsePalestrante<ActivityFields>(card);
}

export async function handlePostFormParticipant({
  documentId,
  values,
}: SendParticipantData): Promise<{ activeVersion: boolean; cardId: number; children: []; companyId: number; parentDocumentId: number; values: [] }> {
  if (!documentId || documentId === "undefined") {
    console.error("❌ documentId inválido:", documentId);
    throw new Error("documentId é obrigatório e não pode ser undefined");
  }

  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards`;

    const url = import.meta.env.DEV ? fluigPath : `?endpoint=${encodeURIComponent(fluigPath)}&method=POST`;

    console.log("📤 Enviando POST para:", url);
    console.log("📤 documentId:", documentId);

    const response = await axiosApi.post<{ activeVersion: boolean; cardId: number; children: []; companyId: number; parentDocumentId: number; values: [] }>(url, { values });

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

export async function handleGetFormParticipant({ documentId, queryParams }: SendParticipantData): Promise<FluigCardsResponse> {
  if (!documentId || documentId === "undefined") {
    throw new Error("documentId é obrigatório e não pode ser undefined");
  }
  console.log(queryParams);

  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards?filter=id_evento eq ${queryParams}`;

    const url = import.meta.env.DEV ? fluigPath : `?endpoint=${encodeURIComponent(fluigPath)}&method=GET`;

    const response = await axiosApi.get<FluigCardsResponse>(url);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;

      console.error("❌ Erro detalhado:", {
        status,
        documentId,
        url: error.config?.url,
        errorData,
      });

      // Tratamento específico por código de status
      switch (status) {
        case 404:
          throw new Error(`Documento ${documentId} não encontrado`);

        case 403:
          throw new Error(`Sem permissão para acessar o documento ${documentId}`);

        case 500:
          // Erro interno do servidor
          if (errorData?.code === "java.lang.NullPointerException") {
            throw new Error(`Erro ao processar documento ${documentId}. ` + `O documento pode estar corrompido ou sem dados obrigatórios.`);
          }
          throw new Error(`Erro interno no servidor ao buscar documento ${documentId}. ` + `Tente novamente em alguns instantes.`);

        default:
          throw new Error(`Erro ao buscar documento: ${error.message}`);
      }
    }

    throw error;
  }
}

export async function handleUpdateFormParticipant({
  documentId,
  cardId,
  values,
}: SendParticipantData): Promise<{ activeVersion: boolean; cardId: number; children: []; companyId: number; parentDocumentId: number; values: [] }> {
  if (!documentId || documentId === "undefined") {
    console.error("❌ documentId inválido:", documentId);
    throw new Error("documentId é obrigatório e não pode ser undefined");
  }

  if (!cardId || cardId === "undefined") {
    console.error("❌ documentId inválido:", cardId);
    throw new Error("cardId é obrigatório e não pode ser undefined");
  }

  try {
    const fluigPath = `/ecm-forms/api/v2/cardindex/${documentId}/cards/${cardId}`;

    const url = import.meta.env.DEV ? fluigPath : `?endpoint=${encodeURIComponent(fluigPath)}&method=PUT`;

    const response = await axiosApi.put<{ activeVersion: boolean; cardId: number; children: []; companyId: number; parentDocumentId: number; values: [] }>(url, { values });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;

      console.error("❌ Erro detalhado:", {
        status,
        documentId,
        url: error.config?.url,
        errorData,
      });

      // Tratamento específico por código de status
      switch (status) {
        case 404:
          throw new Error(`Documento ${documentId} não encontrado`);

        case 403:
          throw new Error(`Sem permissão para acessar o documento ${documentId}`);

        case 500:
          // Erro interno do servidor
          if (errorData?.code === "java.lang.NullPointerException") {
            throw new Error(`Erro ao processar documento ${documentId}. ` + `O documento pode estar corrompido ou sem dados obrigatórios.`);
          }
          throw new Error(`Erro interno no servidor ao buscar documento ${documentId}. ` + `Tente novamente em alguns instantes.`);

        default:
          throw new Error(`Erro ao buscar documento: ${error.message}`);
      }
    }

    throw error;
  }
}
