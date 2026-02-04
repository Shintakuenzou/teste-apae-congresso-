import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Ticket,
  LogOut,
  Pencil,
  Save,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Calendar,
  MapPin,
  QrCode,
  ArrowRight,
  Eye,
  History,
  ShoppingCart,
  Users,
} from "lucide-react";
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

type TabType = "dados" | "eventos" | "historico" | "ingresso";

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

const historicoCompras = [
  {
    id: "TXN-2026-00142-APAE",
    evento: "Congresso Nacional APAE Brasil 2026",
    data: "10/01/2026",
    valor: "R$ 450,00",
    formaPagamento: "Cartao de Credito",
    status: "aprovado",
    etapas: [
      { titulo: "Pedido realizado", data: "10/01/2026 14:32", status: "concluido" },
      { titulo: "Pagamento processando", data: "10/01/2026 14:33", status: "concluido" },
      { titulo: "Pagamento aprovado", data: "10/01/2026 14:35", status: "concluido" },
      { titulo: "Inscricao confirmada", data: "10/01/2026 14:35", status: "concluido" },
      { titulo: "Ingresso disponivel", data: "12/01/2026 09:00", status: "concluido" },
    ],
  },
  {
    id: "TXN-2026-00089-APAE",
    evento: "Workshop: Tecnologias Assistivas",
    data: "15/01/2026",
    valor: "R$ 120,00",
    formaPagamento: "PIX",
    status: "pendente",
    etapas: [
      { titulo: "Pedido realizado", data: "15/01/2026 10:15", status: "concluido" },
      { titulo: "Aguardando pagamento", data: "15/01/2026 10:15", status: "atual" },
      { titulo: "Pagamento aprovado", data: "-", status: "pendente" },
      { titulo: "Inscricao confirmada", data: "-", status: "pendente" },
    ],
  },
];

const eventosDisponiveis = [
  {
    id: 1,
    nome: "Congresso Nacional APAE Brasil 2026",
    descricao: "O maior evento de inclusao social do Brasil reunindo profissionais, familias e gestores de todas as APAEs do pais.",
    data: "15 a 18 de Agosto, 2026",
    local: "Centro de Convencoes, Brasilia - DF",
    preco: "R$ 450,00",
    vagas: 2500,
    vagasRestantes: 847,
    imagem: "/images/login-bg.jpg",
    beneficios: ["Acesso a todas as palestras", "Material didatico", "Certificado de participacao", "Coffee break incluso"],
    status: "disponivel",
  },
  {
    id: 2,
    nome: "Workshop: Tecnologias Assistivas",
    descricao: "Workshop intensivo sobre novas tecnologias para auxiliar pessoas com deficiencia intelectual.",
    data: "16 de Agosto, 2026",
    local: "Sala 3 - Centro de Convencoes",
    preco: "R$ 120,00",
    vagas: 100,
    vagasRestantes: 23,
    imagem: "/images/login-bg.jpg",
    beneficios: ["Material exclusivo", "Certificado especifico", "Acesso ao conteudo online"],
    status: "disponivel",
  },
  {
    id: 3,
    nome: "Jantar de Confraternizacao",
    descricao: "Jantar especial de confraternizacao entre participantes do congresso com apresentacao cultural.",
    data: "17 de Agosto, 2026",
    local: "Salao Nobre - Centro de Convencoes",
    preco: "R$ 180,00",
    vagas: 500,
    vagasRestantes: 0,
    imagem: "/images/login-bg.jpg",
    beneficios: ["Jantar completo", "Apresentacao cultural", "Brinde exclusivo"],
    status: "esgotado",
  },
];

function PainelPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("dados");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<(typeof eventosDisponiveis)[0] | null>(null);
  const [compraSelecionada, setCompraSelecionada] = useState<(typeof historicoCompras)[0] | null>(null);
  console.log("user: ", user);

  const handleSave = async () => {
    setIsSaving(true);
    try {
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
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

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
      case "disponivel":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1">Disponivel</Badge>;
      case "esgotado":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 px-3 py-1">Esgotado</Badge>;
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
                  {formData?.nome} {formData?.sobrenome}
                </p>
                <p className="text-xs opacity-80">{formData?.inscricao}</p>
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
                    onClick={() => {
                      setActiveTab("dados");
                      setEventoSelecionado(null);
                      setCompraSelecionada(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "dados" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Dados Cadastrais</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("eventos");
                      setEventoSelecionado(null);
                      setCompraSelecionada(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "eventos" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-medium">Comprar Eventos</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("historico");
                      setEventoSelecionado(null);
                      setCompraSelecionada(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "historico" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <History className="h-5 w-5" />
                    <span className="font-medium">Historico</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("ingresso");
                      setEventoSelecionado(null);
                      setCompraSelecionada(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "ingresso" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <Ticket className="h-5 w-5" />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium">Meu Ingresso</span>
                      {mockPagamento.status === "aprovado" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                    </div>
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
                      Inscricao: {formData?.inscricao} | Realizada em {formData?.dataInscricao}
                    </p>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="bg-transparent">
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel} className="bg-transparent">
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
                        <Input value={formData?.cpf} disabled className="bg-muted/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Data de Nascimento</Label>
                        {isEditing ? (
                          <Input type="date" value={formData?.dataNascimento} onChange={(e) => handleInputChange("dataNascimento", e.target.value)} />
                        ) : (
                          <Input value={new Date(formData!.dataNascimento as string).toLocaleDateString("pt-BR")} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Nome</Label>
                        {isEditing ? (
                          <Input value={formData?.nome} onChange={(e) => handleInputChange("nome", e.target.value)} />
                        ) : (
                          <Input value={formData?.nome} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Sobrenome</Label>
                        {isEditing ? (
                          <Input value={formData?.sobrenome} onChange={(e) => handleInputChange("sobrenome", e.target.value)} />
                        ) : (
                          <Input value={formData?.sobrenome} disabled className="bg-muted/50" />
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
                          <Input type="email" value={formData?.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                        ) : (
                          <Input value={formData?.email} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Telefone</Label>
                        {isEditing ? (
                          <Input value={formData?.telefone} onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))} maxLength={15} />
                        ) : (
                          <Input value={formData?.telefone} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">WhatsApp</Label>
                        {isEditing ? (
                          <Input value={formData?.whatsapp} onChange={(e) => handleInputChange("whatsapp", formatPhone(e.target.value))} maxLength={15} />
                        ) : (
                          <Input value={formData?.whatsapp} disabled className="bg-muted/50" />
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Endereco */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Endereco</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">UF</Label>
                        {isEditing ? (
                          <Select value={formData?.uf} onValueChange={(value) => handleInputChange("uf", value)}>
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
                          <Input value={formData?.uf} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Municipio</Label>
                        {isEditing ? (
                          <Input value={formData?.municipio} onChange={(e) => handleInputChange("municipio", e.target.value)} />
                        ) : (
                          <Input value={formData?.municipio} disabled className="bg-muted/50" />
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Informacoes Adicionais */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Informacoes Adicionais</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Escolaridade</Label>
                        {isEditing ? (
                          <Select value={formData?.escolaridade} onValueChange={(value) => handleInputChange("escolaridade", value)}>
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
                          <Input value={getEscolaridadeLabel(formData?.escolaridade as string)} disabled className="bg-muted/50" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">APAE Filiada</Label>
                        {isEditing ? (
                          <Input value={formData?.apaeFiliada} onChange={(e) => handleInputChange("apaeFiliada", e.target.value)} />
                        ) : (
                          <Input value={formData?.apaeFiliada} disabled className="bg-muted/50" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tab: Eventos Disponiveis */}
            {activeTab === "eventos" && !eventoSelecionado && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Eventos Disponiveis</CardTitle>
                    <p className="text-sm text-muted-foreground">Selecione um evento para ver detalhes e realizar a compra</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {eventosDisponiveis.map((evento) => (
                      <div
                        key={evento.id}
                        className={`border rounded-xl p-4 transition-all ${
                          evento.status === "esgotado" ? "opacity-60 bg-muted/30" : "hover:border-primary/50 hover:shadow-md cursor-pointer"
                        }`}
                        onClick={() => evento.status !== "esgotado" && setEventoSelecionado(evento)}
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-32 h-24 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${evento.imagem})` }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">{evento.nome}</h3>
                              {getStatusBadge(evento.status)}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{evento.descricao}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{evento.data}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{evento.local}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                            <p className="text-xl font-bold text-secondary">{evento.preco}</p>
                            {evento.status !== "esgotado" && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{evento.vagasRestantes} vagas</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Detalhes do Evento Selecionado */}
            {activeTab === "eventos" && eventoSelecionado && (
              <div className="space-y-6">
                <Button variant="ghost" size="sm" onClick={() => setEventoSelecionado(null)} className="mb-2">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Voltar aos eventos
                </Button>

                <Card>
                  <div className="h-48 w-full bg-cover bg-center rounded-t-xl" style={{ backgroundImage: `url(${eventoSelecionado.imagem})` }} />
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-2xl font-bold text-foreground">{eventoSelecionado.nome}</h2>
                        {getStatusBadge(eventoSelecionado.status)}
                      </div>
                      <p className="text-muted-foreground">{eventoSelecionado.descricao}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Data</p>
                          <p className="font-medium">{eventoSelecionado.data}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Local</p>
                          <p className="font-medium">{eventoSelecionado.local}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">O que esta incluso:</h3>
                      <ul className="space-y-2">
                        {eventoSelecionado.beneficios.map((beneficio, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-secondary" />
                            <span>{beneficio}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Valor do ingresso</p>
                        <p className="text-3xl font-bold text-secondary">{eventoSelecionado.preco}</p>
                        <p className="text-sm text-muted-foreground">
                          {eventoSelecionado.vagasRestantes} de {eventoSelecionado.vagas} vagas disponiveis
                        </p>
                      </div>
                      <Button size="lg" className="w-full sm:w-auto">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Comprar Ingresso
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tab: Historico de Compras */}
            {activeTab === "historico" && !compraSelecionada && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Historico de Compras</CardTitle>
                  <p className="text-sm text-muted-foreground">Acompanhe todas as suas compras e status de pagamento</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {historicoCompras.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <History className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold">Nenhuma compra realizada</h3>
                      <p className="text-muted-foreground mt-2">Suas compras aparecerao aqui</p>
                      <Button className="mt-4" onClick={() => setActiveTab("eventos")}>
                        Ver Eventos Disponiveis
                      </Button>
                    </div>
                  ) : (
                    historicoCompras.map((compra) => (
                      <div
                        key={compra.id}
                        className="border rounded-xl p-4 hover:border-primary/50 hover:shadow-md cursor-pointer transition-all"
                        onClick={() => setCompraSelecionada(compra)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{compra.evento}</h3>
                              {getStatusBadge(compra.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Pedido #{compra.id} | {compra.data}
                            </p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <div className="text-right">
                              <p className="font-bold text-foreground">{compra.valor}</p>
                              <p className="text-xs text-muted-foreground">{compra.formaPagamento}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Detalhes da Compra Selecionada (Timeline) */}
            {activeTab === "historico" && compraSelecionada && (
              <div className="space-y-6">
                <Button variant="ghost" size="sm" onClick={() => setCompraSelecionada(null)} className="mb-2">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Voltar ao historico
                </Button>

                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{compraSelecionada.evento}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Pedido #{compraSelecionada.id}</p>
                      </div>
                      {getStatusBadge(compraSelecionada.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Resumo */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Data da Compra</p>
                        <p className="font-semibold">{compraSelecionada.data}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Forma de Pagamento</p>
                        <p className="font-semibold">{compraSelecionada.formaPagamento}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Valor Total</p>
                        <p className="font-semibold text-secondary">{compraSelecionada.valor}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Timeline */}
                    <div>
                      <h3 className="font-semibold mb-4">Linha do Tempo</h3>
                      <div className="space-y-0">
                        {compraSelecionada.etapas.map((etapa, index) => (
                          <div key={index} className="flex gap-4">
                            {/* Linha e Icone */}
                            <div className="flex flex-col items-center">
                              <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                  etapa.status === "concluido"
                                    ? "bg-secondary text-secondary-foreground"
                                    : etapa.status === "atual"
                                      ? "bg-yellow-500 text-white"
                                      : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {etapa.status === "concluido" ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : etapa.status === "atual" ? (
                                  <Clock className="h-4 w-4" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-current" />
                                )}
                              </div>
                              {index < compraSelecionada.etapas.length - 1 && <div className={`w-0.5 h-12 ${etapa.status === "concluido" ? "bg-secondary" : "bg-muted"}`} />}
                            </div>
                            {/* Conteudo */}
                            <div className="pb-8">
                              <p className={`font-medium ${etapa.status === "pendente" ? "text-muted-foreground" : "text-foreground"}`}>{etapa.titulo}</p>
                              <p className="text-sm text-muted-foreground">{etapa.data}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Acoes */}
                    {compraSelecionada.status === "aprovado" && (
                      <div className="flex gap-3">
                        <Button className="flex-1" onClick={() => setActiveTab("ingresso")}>
                          <Ticket className="h-4 w-4 mr-2" />
                          Ver Ingresso
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar Comprovante
                        </Button>
                      </div>
                    )}

                    {compraSelecionada.status === "pendente" && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">Aguardando Pagamento</p>
                            <p className="text-sm text-yellow-700 mt-1">Complete o pagamento para garantir sua vaga.</p>
                            <Button className="mt-3" size="sm">
                              Pagar Agora
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
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
                                  {formData!.nome} {formData!.sobrenome}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">CPF</p>
                                  <p className="font-medium">{formData!.cpf}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Inscricao</p>
                                  <p className="font-medium">{formData!.inscricao}</p>
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
                                <span className="text-sm">Centro de Convencoes, Brasilia - DF</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
                              <QrCode className="h-24 w-24 text-foreground" />
                              <p className="text-xs text-muted-foreground mt-2">Codigo de acesso</p>
                              <p className="font-mono text-sm font-medium">{formData!.inscricao}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Acoes */}
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
                          Apresente este ingresso (impresso ou no celular) na entrada do evento junto com um documento de identificacao com foto.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ticket className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold">Ingresso Indisponivel</h3>
                      <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                        {mockPagamento.status === "pendente"
                          ? "Seu ingresso estara disponivel assim que o pagamento for confirmado."
                          : "E necessario realizar o pagamento para ter acesso ao ingresso."}
                      </p>
                      <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setActiveTab("historico")}>
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
