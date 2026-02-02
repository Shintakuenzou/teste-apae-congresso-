import axios, { AxiosError } from "axios";

interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function fetchCep(cep: string): Promise<CepResponse | null | undefined> {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar CEP:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Axios error submitting form data:", axiosError.response?.data || axiosError.message);
      return null;
    }
  }
}
