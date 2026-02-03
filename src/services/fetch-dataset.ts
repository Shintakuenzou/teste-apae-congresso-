import { axiosApi } from "./api-root";

export type DatasetRecord = Record<string, string | number | boolean | null>;

export interface DatasetResponse<T = DatasetRecord> {
  values?: T[];
  items?: T[]; // ✅ Fluig pode retornar "items" ou "values"
  hasNext?: boolean;
}

export interface DatasetConstraint {
  fieldName: string;
  initialValue: string | number | boolean;
  finalValue?: string | number | boolean;
  constraintType?: "MUST" | "SHOULD" | "MUST_NOT";
}

interface FetchDatasetProps {
  datasetId: string;
  offset?: number;
  limit?: number;
  constraints?: DatasetConstraint[];
}

export async function fetchDataset<T = DatasetRecord>({ datasetId, offset, limit, constraints = [] }: FetchDatasetProps): Promise<{ items: T[]; hasNext: boolean }> {
  try {
    // ✅ MUDANÇA PRINCIPAL: Adicionar endpoint e method como parâmetros
    const params = new URLSearchParams();

    // Parâmetros do proxy
    params.set("endpoint", "/dataset/api/v2/dataset-handle/search");
    params.set("method", "GET");

    // datasetId
    params.set("datasetId", datasetId);

    // paginação
    if (offset != null && limit != null) {
      params.set("offset", String(offset));
      params.set("limit", String(limit));
    }

    // constraints
    constraints.forEach((c) => {
      const type = c.constraintType ?? "MUST";
      const finalVal = c.finalValue ?? c.initialValue;

      params.append("constraintsField", c.fieldName);
      params.append("constraintsInitialValue", String(c.initialValue));
      params.append("constraintsFinalValue", String(finalVal));
      params.append("constraintsType", type);
    });

    const query = params.toString();
    const url = `/proxy.php?${query}`; // ✅ Chamar o proxy

    console.log("📤 URL completa:", url);

    const response = await axiosApi.get<DatasetResponse<T>>(url);

    console.log("✅ Response dataset:", response.data);

    // // ✅ VALIDAÇÃO: Verificar se retornou HTML
    // if (typeof response.data === "string" && response.data.("<!doctype html>")) {
    //   throw new Error("Proxy retornou HTML. Verifique as credenciais OAuth no proxy.php");
    // }

    // ✅ Fluig pode retornar "values" ou "items"
    const items = response.data.items ?? response.data.values ?? [];
    const hasNext = response.data.hasNext ?? false;

    return {
      items: items as T[],
      hasNext,
    };
  } catch (error) {
    console.error("❌ Erro ao buscar dataset:", error);

    // ✅ Melhor tratamento de erro
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Erro desconhecido ao buscar dataset");
  }
}
