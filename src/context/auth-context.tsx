// src/contexts/auth-context.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import { fetchDataset } from "@/services/fetch-dataset";
import { SecurityService } from "@/services/ryptoService";

interface User {
  cpf: string;
  nome?: string;
  sobrenome?: string;
  dataNascimento?: string;
  inscricao?: string;
  dataInscricao?: string;
  email?: string;
  telefone?: string;
  whatsapp?: string;
  uf?: string;
  municipio?: string;
  cep?: string;
  escolaridade?: string;
  apaeFiliada?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Carregar dados salvos no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (cpf: string, password: string) => {
    setIsLoading(true);

    try {
      console.log("=== INICIANDO LOGIN ===");

      // ✅ Criptografar senha
      const senhaCriptoAES = SecurityService.encryptForTransport(password);

      console.log("Senha criptografada:", senhaCriptoAES);
      console.log("cpf: ", cpf);

      // ✅ Chamar dataset de AUTENTICAÇÃO (não o dataset de participantes!)
      const response = await fetchDataset({
        datasetId: "cadParticipanteCN",
        constraints: [
          {
            fieldName: "cpf",
            initialValue: cpf,
            finalValue: cpf,
            constraintType: "MUST",
          },
        ],
      });

      // ✅ Validar resposta
      // if (response.items[0].status !== "sucesso" || response.items.length === 0) {
      //   throw new Error("Erro ao processar login");
      // }

      const result = response.items[0];
      console.log("Resultado:", result);

      // ✅ Verificar status
      if (result.senha === password) {
        const userData: User = {
          cpf: result.cpf as string,
        };

        // console.log("✅ Login bem-sucedido!");
        // console.log("Token:", result.token);
        // console.log("Usuário:", userData);

        // ✅ Salvar no estado e localStorage
        setUser(userData);
        // setToken(result.tokenSessao as string);
        // localStorage.setItem("user", JSON.stringify(userData));
        // localStorage.setItem("authToken", result.tokenSessao as string);

        // // ✅ Redirecionar para painel
        navigate({ to: "/painel" });
      } else {
        // ❌ Login falhou
        throw new Error("CPF ou senha incorretos");
      }
    } catch (error: unknown) {
      console.error("❌ Erro no login:", error);

      // Limpar dados em caso de erro
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");

      // Re-lançar o erro para ser tratado no componente
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate({ to: "/login" });
  };

  // ✅ Verificar se está autenticado
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
// ✅ Hook useAuth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
