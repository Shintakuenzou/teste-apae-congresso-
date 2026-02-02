import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, MapPinned, User, Lock, Briefcase, Heart } from "lucide-react";
import { handlePostFormParticipant } from "@/services/form-service";

export const Route = createFileRoute("/inscricao")({
  component: InscricaoPage,
});

const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
const escolaridades = [
  "Ensino Fundamental Incompleto",
  "Ensino Fundamental Completo",
  "Ensino Medio Incompleto",
  "Ensino Medio Completo",
  "Ensino Superior Incompleto",
  "Ensino Superior Completo",
  "Pos-graduacao",
  "Mestrado",
  "Doutorado",
];

function InscricaoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    sobrenome: "",
    email: "",
    dataNascimento: "",
    uf: "",
    municipio: "",
    telefone: "",
    whatsapp: "",
    escolaridade: "",
    apaeFiliada: "",
    senha: "",
    presidente_apae: "",
    funcao: "",
    area_atuacao: "",
    possui_deficiencia: "",
    tipo_deficiencia: "",
    necessita_apoio: "",
    coordenacao: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    try {
      const response = await handlePostFormParticipant({
        documentId: import.meta.env.VITE_FORM_PARTICIPANTE as string,
        values: [
          { fieldId: "cpf", value: formData.cpf },
          { fieldId: "senha", value: formData.senha },
          { fieldId: "nome", value: formData.nome },
          { fieldId: "sobrenome", value: formData.sobrenome },
          { fieldId: "email", value: formData.email },
          { fieldId: "data_nascimento", value: formData.dataNascimento },
          { fieldId: "uf", value: formData.uf },
          { fieldId: "municipio", value: formData.municipio },
          { fieldId: "telefone_contato", value: formData.telefone },
          { fieldId: "whatsapp", value: formData.whatsapp },
          { fieldId: "escolaridade", value: formData.escolaridade },
          { fieldId: "apae_filiada", value: formData.apaeFiliada },
          { fieldId: "presidente_apae", value: formData.presidente_apae },
          { fieldId: "funcao", value: formData.funcao },
          { fieldId: "area_atuacao", value: formData.area_atuacao },
          { fieldId: "possui_deficiencia", value: formData.possui_deficiencia },
          { fieldId: "tipo_deficiencia", value: formData.tipo_deficiencia },
          { fieldId: "necessita_apoio", value: formData.necessita_apoio },
          { fieldId: "coordenacao", value: formData.coordenacao },
        ],
      });

      console.log("response ", response);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar inscricao. Tente novamente.");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-24 min-h-[80vh] flex items-center">
          <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-secondary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Inscricao Realizada!</h1>
            <p className="text-muted-foreground mb-6">
              Voce recebera um e-mail em <strong className="text-foreground">{formData.email}</strong> com as instrucoes de pagamento e detalhes do evento.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  cpf: "",
                  nome: "",
                  sobrenome: "",
                  email: "",
                  dataNascimento: "",
                  uf: "",
                  municipio: "",
                  telefone: "",
                  whatsapp: "",
                  escolaridade: "",
                  apaeFiliada: "",
                  senha: "",
                  presidente_apae: "",
                  funcao: "",
                  area_atuacao: "",
                  possui_deficiencia: "",
                  tipo_deficiencia: "",
                  necessita_apoio: "",
                  coordenacao: "",
                });
              }}
              variant="outline"
              size="lg"
            >
              Nova inscricao
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Garanta sua Vaga</h1>
            <p className="text-muted-foreground text-lg">Preencha seus dados para participar do Congresso Nacional APAE Brasil 2026</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">Dados Pessoais</h2>
                    <p className="text-sm text-muted-foreground">Informacoes basicas de identificacao</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      required
                      maxLength={14}
                      value={formData.cpf}
                      onChange={(e) => handleChange("cpf", formatCPF(e.target.value))}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input id="nome" placeholder="Seu nome" required value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sobrenome">Sobrenome *</Label>
                    <Input
                      id="sobrenome"
                      placeholder="Seu sobrenome"
                      required
                      value={formData.sobrenome}
                      onChange={(e) => handleChange("sobrenome", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      required
                      value={formData.dataNascimento}
                      onChange={(e) => handleChange("dataNascimento", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="escolaridade">Escolaridade *</Label>
                    <Select onValueChange={(value) => handleChange("escolaridade", value)} required>
                      <SelectTrigger id="escolaridade" className="!h-11 w-full">
                        <SelectValue placeholder="Selecione sua escolaridade" />
                      </SelectTrigger>
                      <SelectContent>
                        {escolaridades.map((esc) => (
                          <SelectItem key={esc} value={esc}>
                            {esc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">Informacoes de Contato</h2>
                    <p className="text-sm text-muted-foreground">Como podemos entrar em contato com voce</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone de Contato *</Label>
                    <Input
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      required
                      maxLength={15}
                      value={formData.telefone}
                      onChange={(e) => handleChange("telefone", formatPhone(e.target.value))}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      placeholder="(00) 00000-0000"
                      required
                      maxLength={15}
                      value={formData.whatsapp}
                      onChange={(e) => handleChange("whatsapp", formatPhone(e.target.value))}
                      className="h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereco */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPinned className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">Localizacao</h2>
                    <p className="text-sm text-muted-foreground">Seu endereco atual</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="uf">Estado (UF) *</Label>
                    <Select onValueChange={(value) => handleChange("uf", value)} required>
                      <SelectTrigger id="uf" className="!h-11 w-full">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        {estados.map((uf) => (
                          <SelectItem key={uf} value={uf}>
                            {uf}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="municipio">Municipio *</Label>
                    <Input
                      id="municipio"
                      placeholder="Sua cidade"
                      required
                      value={formData.municipio}
                      onChange={(e) => handleChange("municipio", e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informacoes Profissionais */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">Informacoes Profissionais</h2>
                    <p className="text-sm text-muted-foreground">Dados sobre sua atuacao na APAE</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="apaeFiliada">APAE Filiada *</Label>
                    <Input
                      id="apaeFiliada"
                      placeholder="Nome da APAE onde voce atua"
                      required
                      value={formData.apaeFiliada}
                      onChange={(e) => handleChange("apaeFiliada", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="presidente_apae">Presidente da APAE</Label>
                    <Input
                      id="presidente_apae"
                      placeholder="Nome do presidente"
                      value={formData.presidente_apae}
                      onChange={(e) => handleChange("presidente_apae", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="funcao">Funcao</Label>
                    <Input id="funcao" placeholder="Sua funcao" value={formData.funcao} onChange={(e) => handleChange("funcao", e.target.value)} className="h-11" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="area_atuacao">Area de Atuacao</Label>
                    <Input
                      id="area_atuacao"
                      placeholder="Qual sua area de atuacao?"
                      value={formData.area_atuacao}
                      onChange={(e) => handleChange("area_atuacao", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coordenacao">Coordenacao</Label>
                    <Input id="coordenacao" placeholder="Coordenacao" value={formData.coordenacao} onChange={(e) => handleChange("coordenacao", e.target.value)} className="h-11" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acessibilidade */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">Acessibilidade</h2>
                    <p className="text-sm text-muted-foreground">Informacoes para garantir sua participacao</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="possui_deficiencia">Possui Deficiencia?</Label>
                    <Select onValueChange={(value) => handleChange("possui_deficiencia", value)}>
                      <SelectTrigger id="possui_deficiencia" className="!h-11 w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sim">Sim</SelectItem>
                        <SelectItem value="Nao">Nao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo_deficiencia">Tipo de Deficiencia</Label>
                    <Input
                      id="tipo_deficiencia"
                      placeholder="Especifique, se aplicavel"
                      value={formData.tipo_deficiencia}
                      onChange={(e) => handleChange("tipo_deficiencia", e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="necessita_apoio">Necessita de Apoio Especial?</Label>
                    <Input
                      id="necessita_apoio"
                      placeholder="Descreva se necessita de algum tipo de apoio"
                      value={formData.necessita_apoio}
                      onChange={(e) => handleChange("necessita_apoio", e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Senha de Acesso */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">Senha de Acesso</h2>
                    <p className="text-sm text-muted-foreground">Crie uma senha para acessar sua inscricao</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha *</Label>
                    <Input
                      id="senha"
                      type="password"
                      placeholder="Minimo 6 caracteres"
                      required
                      minLength={6}
                      value={formData.senha}
                      onChange={(e) => handleChange("senha", e.target.value)}
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">Use esta senha para acessar e gerenciar sua inscricao</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col items-center gap-4 pt-4">
              <Button type="submit" size="lg" className="w-full md:w-auto min-w-[300px] h-12 text-base font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Confirmar Inscricao
              </Button>
              <p className="text-xs text-muted-foreground text-center">* Campos obrigatorios</p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
