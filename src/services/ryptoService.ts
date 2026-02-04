import CryptoJS from "crypto-js";

// Esta chave DEVE ser a mesma em: Dataset de Login, Dataset de Inscrição e Proxy PHP
const SECURITY_KEY = import.meta.env.VITE_ACCESS_TOKEN_BASE_TESTE?.substring(0, 32) as string;

export const SecurityService = {
  /**
   * Criptografa a senha para envio seguro via API.
   * Usado tanto no Login quanto na Inscrição.
   */
  encryptForTransport(password: string): string {
    const key = CryptoJS.enc.Utf8.parse(SECURITY_KEY);
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      mode: CryptoJS.mode.ECB, // Modo compatível com Java padrão
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },

  /**
   * Valida a força da senha (útil apenas na inscrição)
   */
  validateStrength(password: string) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    return isLongEnough && hasUpper && hasLower && hasNumber;
  },
};
