import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { CheckCircle, Mail, MapPinned, User, Lock, Briefcase, Heart, Loader2 } from "lucide-react";
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

// Schema de validação com Zod
const formSchema = z.object({
  cpf: z.string().min(14, "CPF deve ter 11 dígitos").max(14),
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  sobrenome: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  uf: z.string().min(2, "Selecione um estado"),
  municipio: z.string().min(2, "Município é obrigatório"),
  telefone: z.string().min(14, "Telefone inválido"),
  whatsapp: z.string().min(14, "WhatsApp inválido"),
  escolaridade: z.string().min(1, "Selecione a escolaridade"),
  apaeFiliada: z.string().min(2, "Nome da APAE é obrigatório"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  presidente_apae: z.string().optional(),
  funcao: z.string().optional(),
  area_atuacao: z.string().optional(),
  possui_deficiencia: z.string().optional(),
  tipo_deficiencia: z.string().optional(),
  necessita_apoio: z.string().optional(),
  coordenacao: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function InscricaoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Dados enviados:", data);

    try {
      const response = await handlePostFormParticipant({
        documentId: import.meta.env.VITE_FORM_PARTICIPANTE as string,
        values: [
          { fieldId: "cpf", value: data.cpf },
          { fieldId: "senha", value: data.senha },
          { fieldId: "nome", value: data.nome },
          { fieldId: "sobrenome", value: data.sobrenome },
          { fieldId: "email", value: data.email },
          { fieldId: "data_nascimento", value: data.dataNascimento },
          { fieldId: "uf", value: data.uf },
          { fieldId: "municipio", value: data.municipio },
          { fieldId: "telefone_contato", value: data.telefone },
          { fieldId: "whatsapp", value: data.whatsapp },
          { fieldId: "escolaridade", value: data.escolaridade },
          { fieldId: "apae_filiada", value: data.apaeFiliada },
          { fieldId: "presidente_apae", value: data.presidente_apae || "" },
          { fieldId: "funcao", value: data.funcao || "" },
          { fieldId: "area_atuacao", value: data.area_atuacao || "" },
          { fieldId: "possui_deficiencia", value: data.possui_deficiencia || "" },
          { fieldId: "tipo_deficiencia", value: data.tipo_deficiencia || "" },
          { fieldId: "necessita_apoio", value: data.necessita_apoio || "" },
          { fieldId: "coordenacao", value: data.coordenacao || "" },
        ],
      });

      console.log("response ", response);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar inscricao. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Funções de formatação
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
              Voce recebera um e-mail em <strong className="text-foreground">{getValues("email")}</strong> com as instrucoes de pagamento e detalhes do evento.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                reset();
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

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Garanta sua Vaga</h1>
            <p className="text-muted-foreground text-lg">Preencha seus dados para participar do Congresso Nacional APAE Brasil 2026</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                <FieldSet className="w-full">
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field className="md:col-span-2">
                      <FieldLabel htmlFor="cpf">CPF *</FieldLabel>
                      <Controller
                        name="cpf"
                        control={control}
                        render={({ field }) => (
                          <Input id="cpf" placeholder="000.000.000-00" maxLength={14} {...field} onChange={(e) => field.onChange(formatCPF(e.target.value))} className="h-11" />
                        )}
                      />
                      {errors.cpf && <p className="text-sm text-destructive mt-1">{errors.cpf.message}</p>}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="nome">Nome *</FieldLabel>
                      <Input id="nome" placeholder="Seu nome" {...register("nome")} className="h-11" />
                      {errors.nome && <p className="text-sm text-destructive mt-1">{errors.nome.message}</p>}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="sobrenome">Sobrenome *</FieldLabel>
                      <Input id="sobrenome" placeholder="Seu sobrenome" {...register("sobrenome")} className="h-11" />
                      {errors.sobrenome && <p className="text-sm text-destructive mt-1">{errors.sobrenome.message}</p>}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="dataNascimento">Data de Nascimento *</FieldLabel>
                      <Input id="dataNascimento" type="date" {...register("dataNascimento")} className="h-11" />
                      {errors.dataNascimento && <p className="text-sm text-destructive mt-1">{errors.dataNascimento.message}</p>}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="escolaridade">Escolaridade *</FieldLabel>
                      <Controller
                        name="escolaridade"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
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
                        )}
                      />
                      {errors.escolaridade && <p className="text-sm text-destructive mt-1">{errors.escolaridade.message}</p>}
                    </Field>
                  </FieldGroup>
                </FieldSet>
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

                <FieldSet className="w-full">
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field className="md:col-span-2">
                      <FieldLabel htmlFor="email">E-mail *</FieldLabel>
                      <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} className="h-11" />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="telefone">Telefone de Contato *</FieldLabel>
                      <Controller
                        name="telefone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="telefone"
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            {...field}
                            onChange={(e) => field.onChange(formatPhone(e.target.value))}
                            className="h-11"
                          />
                        )}
                      />
                      {errors.telefone && <p className="text-sm text-destructive mt-1">{errors.telefone.message}</p>}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="whatsapp">WhatsApp *</FieldLabel>
                      <Controller
                        name="whatsapp"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="whatsapp"
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            {...field}
                            onChange={(e) => field.onChange(formatPhone(e.target.value))}
                            className="h-11"
                          />
                        )}
                      />
                      {errors.whatsapp && <p className="text-sm text-destructive mt-1">{errors.whatsapp.message}</p>}
                    </Field>
                  </FieldGroup>
                </FieldSet>
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

                <FieldSet className="w-full">
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field>
                      <FieldLabel htmlFor="uf">Estado (UF) *</FieldLabel>
                      <Controller
                        name="uf"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
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
                        )}
                      />
                      {errors.uf && <p className="text-sm text-destructive mt-1">{errors.uf.message}</p>}
                    </Field>

                    <Field className="md:col-span-2">
                      <FieldLabel htmlFor="municipio">Municipio *</FieldLabel>
                      <Input id="municipio" placeholder="Sua cidade" {...register("municipio")} className="h-11" />
                      {errors.municipio && <p className="text-sm text-destructive mt-1">{errors.municipio.message}</p>}
                    </Field>
                  </FieldGroup>
                </FieldSet>
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

                <FieldSet className="w-full">
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field className="md:col-span-2">
                      <FieldLabel htmlFor="apaeFiliada">APAE Filiada *</FieldLabel>
                      <Input id="apaeFiliada" placeholder="Nome da APAE onde voce atua" {...register("apaeFiliada")} className="h-11" />
                      {errors.apaeFiliada && <p className="text-sm text-destructive mt-1">{errors.apaeFiliada.message}</p>}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="presidente_apae">Presidente da APAE</FieldLabel>
                      <Input id="presidente_apae" placeholder="Nome do presidente" {...register("presidente_apae")} className="h-11" />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="funcao">Funcao</FieldLabel>
                      <Input id="funcao" placeholder="Sua funcao" {...register("funcao")} className="h-11" />
                    </Field>

                    <Field className="md:col-span-2">
                      <FieldLabel htmlFor="area_atuacao">Area de Atuacao</FieldLabel>
                      <Input id="area_atuacao" placeholder="Qual sua area de atuacao?" {...register("area_atuacao")} className="h-11" />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="coordenacao">Coordenacao</FieldLabel>
                      <Input id="coordenacao" placeholder="Coordenacao" {...register("coordenacao")} className="h-11" />
                    </Field>
                  </FieldGroup>
                </FieldSet>
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

                <FieldSet className="w-full">
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="possui_deficiencia">Possui Deficiencia?</FieldLabel>
                      <Controller
                        name="possui_deficiencia"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="possui_deficiencia" className="!h-11 w-full">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Sim">Sim</SelectItem>
                              <SelectItem value="Nao">Nao</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="tipo_deficiencia">Tipo de Deficiencia</FieldLabel>
                      <Input id="tipo_deficiencia" placeholder="Especifique, se aplicavel" {...register("tipo_deficiencia")} className="h-11" />
                    </Field>

                    <Field className="md:col-span-2">
                      <FieldLabel htmlFor="necessita_apoio">Necessita de Apoio Especial?</FieldLabel>
                      <Input id="necessita_apoio" placeholder="Descreva se necessita de algum tipo de apoio" {...register("necessita_apoio")} className="h-11" />
                    </Field>
                  </FieldGroup>
                </FieldSet>
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

                <FieldSet className="w-full">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="senha">Senha *</FieldLabel>
                      <FieldDescription>Use esta senha para acessar e gerenciar sua inscricao</FieldDescription>
                      <Input id="senha" type="password" placeholder="Minimo 6 caracteres" {...register("senha")} className="h-11" />
                      {errors.senha && <p className="text-sm text-destructive mt-1">{errors.senha.message}</p>}
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </CardContent>
            </Card>

            <div className="flex flex-col items-center gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-[300px] h-12 text-base font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Confirmar Inscricao"
                )}
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
