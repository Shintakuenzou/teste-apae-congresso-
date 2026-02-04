// src/services/cryptoService.ts
import bcryptjs from "bcryptjs";

class CryptoService {
  /**
   * Gera hash seguro da senha usando bcrypt
   * @param password - Senha em texto plano
   * @returns Hash bcrypt (inclui salt automaticamente)
   */
  async hashPassword(password: string): Promise<string> {
    try {
      // 10 rounds é um bom equilíbrio entre segurança e performance
      const saltRounds = 10;
      const hash = await bcryptjs.hash(password, saltRounds);
      return hash;
    } catch (error) {
      console.error("Erro ao gerar hash da senha:", error);
      throw new Error("Erro ao processar senha");
    }
  }

  /**
   * Verifica se a senha corresponde ao hash
   * @param password - Senha em texto plano
   * @param hash - Hash armazenado
   * @returns true se a senha estiver correta
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcryptjs.compare(password, hash);
    } catch (error) {
      console.error("Erro ao verificar senha:", error);
      return false;
    }
  }

  /**
   * Valida força da senha
   */
  validatePasswordStrength(password: string) {
    const errors: string[] = [];

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

  /**
   * Calcula força da senha
   */
  calculateStrength(password: string): "fraca" | "média" | "forte" {
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

  /**
   * Gera um salt aleatório (caso você precise enviar para o backend)
   */
  async generateSalt(rounds: number = 10): Promise<string> {
    return await bcryptjs.genSalt(rounds);
  }
}

export const cryptoService = new CryptoService();
