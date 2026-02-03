import CryptoJS from "crypto-js";

class CryptoService {
  // Chave secreta - DEVE vir de variável de ambiente
  SECRET_KEY = import.meta.env.VITE_ACCESS_TOKEN_BASE_TESTE || "32764236423874";

  /**
   * Criptografa a senha antes de enviar para o servidor
   * Usa AES para transporte seguro
   */
  encryptPassword(password: string) {
    try {
      const encrypted = CryptoJS.AES.encrypt(password, this.SECRET_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error("Erro ao criptografar senha:", error);
      throw new Error("Erro na criptografia");
    }
  }

  /**
   * Descriptografa a senha (usado no backend/Fluig)
   */
  decryptPassword(encryptedPassword: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error("Erro ao descriptografar senha:", error);
      throw new Error("Erro na descriptografia");
    }
  }

  /**
   * Gera hash SHA256 (alternativa para transporte)
   */
  hashPassword(password: string) {
    return CryptoJS.SHA256(password).toString();
  }
}

export const cryptoService = new CryptoService();
