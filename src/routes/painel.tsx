import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, CreditCard, Ticket, LogOut, Pencil, Save, X, CheckCircle2, Clock, AlertCircle, Download, Calendar, MapPin, QrCode } from "lucide-react";
import LogoApae from "/logo-apae.jpg";
import { useAuth } from "@/context/auth-context";

// Status do pagamento: "pendente", "aprovado", "recusado"
const mockPagamento = {
  status: "aprovado",
  valor: "R$ 450,00",
  formaPagamento: "Cartão de Crédito",
  dataAprovacao: "12/01/2026",
  codigoTransacao: "TXN-2026-00142-APAE",
};

export const Route = createFileRoute("/painel")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: PainelPage,
});

type TabType = "dados" | "pagamento" | "ingresso";

const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

const escolaridadeOptions = [
  { value: "fundamental-incompleto", label: "Fundamental Incompleto" },
  { value: "fundamental-completo", label: "Fundamental Completo" },
  { value: "medio-incompleto", label: "Médio Incompleto" },
  { value: "medio-completo", label: "Médio Completo" },
  { value: "superior-incompleto", label: "Superior Incompleto" },
  { value: "superior-completo", label: "Superior Completo" },
  { value: "pos-graduacao", label: "Pós-graduação" },
  { value: "mestrado", label: "Mestrado" },
  { value: "doutorado", label: "Doutorado" },
];

function PainelPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("dados");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Usa os dados reais do usuário logado
  const [formData, setFormData] = useState(user!);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // ✅ Aqui você faria a chamada à API para atualizar os dados
      // await axiosApi.put(`/api/users/${user?.cpf}`, formData);

      // Por enquanto, só simula
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ Atualiza o localStorage
      localStorage.setItem("user", JSON.stringify(formData));

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user!);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };
  console.log(formData);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1.5 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Aprovado
          </Badge>
        );
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 gap-1.5 px-3 py-1">
            <Clock className="h-3.5 w-3.5" />
            Pendente
          </Badge>
        );
      case "recusado":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 gap-1.5 px-3 py-1">
            <AlertCircle className="h-3.5 w-3.5" />
            Recusado
          </Badge>
        );
      default:
        return null;
    }
  };

  const getEscolaridadeLabel = (value: string) => {
    return escolaridadeOptions.find((opt) => opt.value === value)?.label || value;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header do Painel */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <img src={LogoApae} className="size-10 object-cover rounded-full p-1" alt="logo apae" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold leading-tight">Congresso Nacional</p>
                  <p className="text-xs opacity-80">APAE Brasil 2026</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">
                  {formData.nome} {formData.sobrenome}
                </p>
                <p className="text-xs opacity-80">{formData.inscricao}</p>
              </div>
              <Link
                to="/login"
                className="text-primary-foreground hover:bg-white/10 cursor-pointer"
                onClick={() => {
                  logout();
                }}
              >
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Minha Conta</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus dados e acompanhe sua inscrição</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Menu Lateral */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("dados")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "dados" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Dados Cadastrais</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("pagamento")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "pagamento" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium">Pagamento</span>
                      {mockPagamento.status === "aprovado" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("ingresso")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "ingresso" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <Ticket className="h-5 w-5" />
                    <span className="font-medium">Meu Ingresso</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Tab: Dados Cadastrais */}
            {activeTab === "dados" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl">Dados Cadastrais</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Inscrição: {formData.inscricao} | Realizada em {formData.dataInscricao}
                    </p>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={handleSave} disabled={isSaving}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? "Salvando..." : "Salvar"}
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Dados Pessoais</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">CPF</Label>
                        <Input value={formData.cpf} disabled className="bg-muted/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Data de Nascimento</Label>
                        {isEditing ? (
                          <Input type="date" value={formData.dataNascimento} onChange={(e) => handleInputChange("dataNascimento", e.target.value)} />
                        ) : (
                          <Input value={new Date(formData.dataNascimento).toLocaleDateString("pt-BR")} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Nome</Label>
                        {isEditing ? (
                          <Input value={formData.nome} onChange={(e) => handleInputChange("nome", e.target.value)} />
                        ) : (
                          <Input value={formData.nome} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Sobrenome</Label>
                        {isEditing ? (
                          <Input value={formData.sobrenome} onChange={(e) => handleInputChange("sobrenome", e.target.value)} />
                        ) : (
                          <Input value={formData.sobrenome} disabled className="bg-muted/50" />
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contato */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Contato</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2 sm:col-span-2">
                        <Label className="text-muted-foreground">E-mail</Label>
                        {isEditing ? (
                          <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                        ) : (
                          <Input value={formData.email} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Telefone</Label>
                        {isEditing ? (
                          <Input value={formData.telefone} onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))} maxLength={15} />
                        ) : (
                          <Input value={formData.telefone} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">WhatsApp</Label>
                        {isEditing ? (
                          <Input value={formData.whatsapp} onChange={(e) => handleInputChange("whatsapp", formatPhone(e.target.value))} maxLength={15} />
                        ) : (
                          <Input value={formData.whatsapp} disabled className="bg-muted/50" />
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Endereço */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Endereço</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">UF</Label>
                        {isEditing ? (
                          <Select value={formData.uf} onValueChange={(value) => handleInputChange("uf", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {estados.map((estado) => (
                                <SelectItem key={estado} value={estado}>
                                  {estado}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input value={formData.uf} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Município</Label>
                        {isEditing ? (
                          <Input value={formData.municipio} onChange={(e) => handleInputChange("municipio", e.target.value)} />
                        ) : (
                          <Input value={formData.municipio} disabled className="bg-muted/50" />
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Informações Adicionais */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Informações Adicionais</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Escolaridade</Label>
                        {isEditing ? (
                          <Select value={formData.escolaridade} onValueChange={(value) => handleInputChange("escolaridade", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {escolaridadeOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input value={getEscolaridadeLabel(formData.escolaridade)} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">APAE Filiada</Label>
                        {isEditing ? (
                          <Input value={formData.apaeFiliada} onChange={(e) => handleInputChange("apaeFiliada", e.target.value)} />
                        ) : (
                          <Input value={formData.apaeFiliada} disabled className="bg-muted/50" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tab: Pagamento */}
            {activeTab === "pagamento" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Status do Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="mt-1">{getStatusBadge(mockPagamento.status)}</div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="text-2xl font-bold text-foreground">{mockPagamento.valor}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Forma de Pagamento</p>
                      <p className="font-medium mt-1">{mockPagamento.formaPagamento}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Data de Aprovação</p>
                      <p className="font-medium mt-1">{mockPagamento.dataAprovacao}</p>
                    </div>
                    <div className="p-4 border rounded-lg sm:col-span-2">
                      <p className="text-sm text-muted-foreground">Código da Transação</p>
                      <p className="font-mono text-sm mt-1">{mockPagamento.codigoTransacao}</p>
                    </div>
                  </div>

                  {mockPagamento.status === "aprovado" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-800">Pagamento Confirmado</p>
                          <p className="text-sm text-green-700 mt-1">Sua inscrição está confirmada. Acesse a aba "Meu Ingresso" para visualizar e baixar seu ingresso.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {mockPagamento.status === "pendente" && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">Aguardando Confirmação</p>
                          <p className="text-sm text-yellow-700 mt-1">Seu pagamento está sendo processado. Isso pode levar até 3 dias úteis.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {mockPagamento.status === "recusado" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">Pagamento Recusado</p>
                          <p className="text-sm text-red-700 mt-1">Houve um problema com seu pagamento. Por favor, tente novamente ou entre em contato com o suporte.</p>
                          <Button className="mt-3" size="sm">
                            Tentar Novamente
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tab: Ingresso */}
            {activeTab === "ingresso" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Meu Ingresso</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockPagamento.status === "aprovado" ? (
                    <div className="space-y-6">
                      {/* Ingresso Visual */}
                      <div className="border-2 border-dashed border-primary/30 rounded-xl overflow-hidden">
                        <div className="bg-primary text-primary-foreground p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm opacity-80">Congresso Nacional</p>
                              <h2 className="text-2xl font-bold">APAE Brasil 2026</h2>
                            </div>
                            <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center">
                              <span className="text-2xl font-bold">A</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-card">
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Participante</p>
                                <p className="font-semibold text-lg">
                                  {formData.nome} {formData.sobrenome}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">CPF</p>
                                  <p className="font-medium">{formData.cpf}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Inscrição</p>
                                  <p className="font-medium">{formData.inscricao}</p>
                                </div>
                              </div>
                              <Separator />
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm">15 a 18 de Agosto, 2026</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">Centro de Convenções, Brasília - DF</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                              <QrCode className="h-24 w-24 text-foreground" />
                              <p className="text-xs text-muted-foreground mt-2">Código de acesso</p>
                              <p className="font-mono text-sm font-medium">{formData.inscricao}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar Ingresso (PDF)
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Ticket className="h-4 w-4 mr-2" />
                          Adicionar ao Wallet
                        </Button>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Apresente este ingresso (impresso ou no celular) na entrada do evento junto com um documento de identificação com foto.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ticket className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold">Ingresso Indisponível</h3>
                      <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                        {mockPagamento.status === "pendente"
                          ? "Seu ingresso estará disponível assim que o pagamento for confirmado."
                          : "É necessário realizar o pagamento para ter acesso ao ingresso."}
                      </p>
                      <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setActiveTab("pagamento")}>
                        Ver Status do Pagamento
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
