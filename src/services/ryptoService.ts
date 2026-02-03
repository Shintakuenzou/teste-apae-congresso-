// src/services/cryptoService.js
import CryptoJS from "crypto-js";

class CryptoService {
  // Chave de 32 caracteres (256 bits) - DEVE SER A MESMA NO BACKEND
  SECRET_KEY = import.meta.env.VITE_ACCESS_TOKEN_BASE_TESTE; // Sua chave atual

  /**
   * Criptografa a senha de forma compatível com Java AES
   */
  encryptPassword(password: string) {
    try {
      // Converter a chave para o formato correto
      const key = CryptoJS.enc.Utf8.parse(this.SECRET_KEY!.substring(0, 32));

      // Criptografar usando AES com ECB mode (mesmo do Java)
      const encrypted = CryptoJS.AES.encrypt(password, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Retornar apenas o ciphertext em Base64
      return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    } catch (error) {
      console.error("Erro ao criptografar senha:", error);
      throw new Error("Erro na criptografia");
    }
  }

  /**
   * Valida força da senha
   */
  validatePasswordStrength(password: string) {
    const errors = [];

    if (password.length < 8) {
      errors.push("A senha deve ter no mínimo 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Deve conter pelo menos uma letra maiúscula");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Deve conter pelo menos uma letra minúscula");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Deve conter pelo menos um número");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Deve conter pelo menos um caractere especial");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      strength: this.calculateStrength(password),
    };
  }

  calculateStrength(password: string) {
    let strength = 0;

    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 15;

    if (strength < 40) return "fraca";
    if (strength < 70) return "média";
    return "forte";
  }
}

export const cryptoService = new CryptoService();
