import OAuth from "oauth-1.0a";
import CryptoJs from "crypto-js";

import axios, { type AxiosRequestHeaders } from "axios";

// Instância do Axios
export const axiosApi = axios.create({
  baseURL: "/", // env.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Funções e configurações OAuth 1.0a
const hashFunction = (baseString: string, key: string) => {
  return CryptoJs.HmacSHA1(baseString, key).toString(CryptoJs.enc.Base64);
};

const oauth = new OAuth({
  consumer: {
    key: import.meta.env.VITE_CONSUMER_KEY_BASE_TESTE as string,
    secret: import.meta.env.VITE_CONSUMER_SECRET_BASE_TESTE as string,
  },
  signature_method: "HMAC-SHA1",
  hash_function: hashFunction,
});

// Retorna autenticação
const getAuthorizationHeaders = async (url: string, method: string) => {
  const token = {
    key: import.meta.env.VITE_ACCESS_TOKEN_BASE_TESTE as string,
    secret: import.meta.env.VITE_TOKEN_SECRET_BASE_TESTE as string,
  };
  const requestData = {
    url,
    method,
  };

  return oauth.toHeader(oauth.authorize(requestData, token));
};

// --- Interceptor de Requisição do Axios para OAuth 1.0a ---
axiosApi.interceptors.request.use(
  async (config) => {
    const method = config.method ? config.method.toUpperCase() : "GET";
    const fullUrl = `${import.meta.env.VITE_BASE_URL_TESTE}${config.url}`; //axios.getUri(config); // Obtém a URL completa que será usada na requisição
    console.log("fullUrl ", fullUrl);

    try {
      const authorizationHeader = await getAuthorizationHeaders(fullUrl, method);
      // Adiciona os cabeçalhos de autorização à configuração da requisição
      config.headers = {
        ...(config.headers || {}),
        ...authorizationHeader,
      } as unknown as AxiosRequestHeaders;
    } catch (error) {
      console.error("Erro ao gerar cabeçalhos OAuth 1.0a:", error);
      return Promise.reject(new Error("Falha na autenticação OAuth 1.0a."));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
