import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, MapPin, Mail, MapPinned, Phone, User } from "lucide-react";
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    try {
      const response = await handlePostFormParticipant({
        documentId: import.meta.env.VITE_FORM_PARTICIPANTE as string,
        values: [
          {
            fieldId: "nome",
            value: formData.nome,
          },
          {
            fieldId: "email",
            value: formData.email,
          },
        ],
      });

      console.log("response ", response);
    } catch (error) {
      console.log(error);
    }
    setSubmitted(true);
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Garanta sua Vaga</h1>
            <p className="text-muted-foreground">Preencha seus dados para participar do Congresso Nacional APAE Brasil 2026</p>
          </div>

          <Card className="border-border shadow-sm mb-8">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-foreground">Dados Pessoais</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        required
                        maxLength={14}
                        value={formData.cpf}
                        onChange={(e) => handleChange("cpf", formatCPF(e.target.value))}
                        className="h-11 bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        required
                        value={formData.dataNascimento}
                        onChange={(e) => handleChange("dataNascimento", e.target.value)}
                        className="h-11 bg-muted/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" placeholder="Seu nome" required value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} className="h-11 bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <Input
                        id="sobrenome"
                        placeholder="Seu sobrenome"
                        required
                        value={formData.sobrenome}
                        onChange={(e) => handleChange("sobrenome", e.target.value)}
                        className="h-11 bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Mail className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-foreground">Contato</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="h-11 bg-muted/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone de Contato</Label>
                      <Input
                        id="telefone"
                        placeholder="(00) 00000-0000"
                        required
                        maxLength={15}
                        value={formData.telefone}
                        onChange={(e) => handleChange("telefone", formatPhone(e.target.value))}
                        className="h-11 bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        placeholder="(00) 00000-0000"
                        required
                        maxLength={15}
                        value={formData.whatsapp}
                        onChange={(e) => handleChange("whatsapp", formatPhone(e.target.value))}
                        className="h-11 bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereco */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <MapPinned className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-foreground">Endereco</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="uf">UF</Label>
                      <Select onValueChange={(value) => handleChange("uf", value)}>
                        <SelectTrigger id="uf" className="h-11 bg-muted/30">
                          <SelectValue placeholder="Selecione" />
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
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="municipio">Municipio</Label>
                      <Input
                        id="municipio"
                        placeholder="Sua cidade"
                        required
                        value={formData.municipio}
                        onChange={(e) => handleChange("municipio", e.target.value)}
                        className="h-11 bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Informacoes Adicionais */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Phone className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-foreground">Informacoes Adicionais</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="escolaridade">Escolaridade</Label>
                      <Select onValueChange={(value) => handleChange("escolaridade", value)}>
                        <SelectTrigger id="escolaridade" className="h-11 bg-muted/30 w-full">
                          <SelectValue placeholder="Selecione" />
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

                    <div className="space-y-2">
                      <Label htmlFor="apaeFiliada">APAE Filiada</Label>
                      <Input
                        id="apaeFiliada"
                        placeholder="Nome da APAE"
                        required
                        value={formData.apaeFiliada}
                        onChange={(e) => handleChange("apaeFiliada", e.target.value)}
                        className="h-11 bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-2">
                  Confirmar Inscricao
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-secondary" />
              <span>15 a 18 de Agosto, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-secondary" />
              <span>Brasilia, DF</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
