interface ImportMetaEnv {
  readonly VITE_FORM_PARTICIPANTE?: string;
  readonly VITE_CONSUMER_KEY_BASE_TESTE?: string;
  readonly VITE_CONSUMER_SECRET_BASE_TESTE?: string;
  readonly VITE_ACCESS_TOKEN_BASE_TESTE?: string;
  readonly VITE_TOKEN_SECRET_BASE_TESTE?: string;
  readonly VITE_BASE_URL_TESTE?: string;
  readonly VITE_BASE_URL_PROD?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
