"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Ticket, Calendar, MapPin } from "lucide-react";
import { handlePostFormParticipant } from "@/services/form-service";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cidade: "",
    estado: "",
    apae: "",
    categoria: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Dados enviados:", formData);

    try {
      console.log("to entrando");

      handlePostFormParticipant({
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
    } catch (error) {
      console.log(error);
    } finally {
      console.log("to saindo");
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <section id="inscricao" className="py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-20 w-20 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Inscrição Realizada!</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Obrigado por se inscrever no Congresso Nacional APAE Brasil 2026. Em breve você receberá um e-mail com mais informações.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            Fazer nova inscrição
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="inscricao" className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Garanta sua Vaga</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">Faça sua inscrição agora e participe do maior evento do movimento apaeano brasileiro. Vagas limitadas!</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Ticket className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Inscrição Antecipada</h3>
                  <p className="text-primary-foreground/70 text-sm">Garanta seu lugar com desconto até 30 de Junho de 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">4 Dias de Evento</h3>
                  <p className="text-primary-foreground/70 text-sm">Acesso completo a todas as palestras, workshops e atividades</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <MapPin className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Local Acessível</h3>
                  <p className="text-primary-foreground/70 text-sm">Centro de Convenções com total acessibilidade</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-primary-foreground/10 rounded-lg">
              <div className="text-sm text-primary-foreground/70 mb-2">Investimento</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$ 350</span>
                <span className="text-primary-foreground/70 line-through">R$ 500</span>
              </div>
              <div className="text-sm text-secondary mt-1">Desconto de 30% até 30/06/2026</div>
            </div>
          </div>

          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>Formulário de Inscrição</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" placeholder="Seu nome completo" required value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" required value={formData.telefone} onChange={(e) => handleChange("telefone", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" required value={formData.cpf} onChange={(e) => handleChange("cpf", e.target.value)} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Sua cidade" required value={formData.cidade} onChange={(e) => handleChange("cidade", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select onValueChange={(value) => handleChange("estado", value)}>
                      <SelectTrigger id="estado">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">Acre</SelectItem>
                        <SelectItem value="AL">Alagoas</SelectItem>
                        <SelectItem value="AP">Amapá</SelectItem>
                        <SelectItem value="AM">Amazonas</SelectItem>
                        <SelectItem value="BA">Bahia</SelectItem>
                        <SelectItem value="CE">Ceará</SelectItem>
                        <SelectItem value="DF">Distrito Federal</SelectItem>
                        <SelectItem value="ES">Espírito Santo</SelectItem>
                        <SelectItem value="GO">Goiás</SelectItem>
                        <SelectItem value="MA">Maranhão</SelectItem>
                        <SelectItem value="MT">Mato Grosso</SelectItem>
                        <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                        <SelectItem value="MG">Minas Gerais</SelectItem>
                        <SelectItem value="PA">Pará</SelectItem>
                        <SelectItem value="PB">Paraíba</SelectItem>
                        <SelectItem value="PR">Paraná</SelectItem>
                        <SelectItem value="PE">Pernambuco</SelectItem>
                        <SelectItem value="PI">Piauí</SelectItem>
                        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                        <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        <SelectItem value="RO">Rondônia</SelectItem>
                        <SelectItem value="RR">Roraima</SelectItem>
                        <SelectItem value="SC">Santa Catarina</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="SE">Sergipe</SelectItem>
                        <SelectItem value="TO">Tocantins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apae">APAE de Origem (opcional)</Label>
                  <Input id="apae" placeholder="Nome da APAE" value={formData.apae} onChange={(e) => handleChange("apae", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select onValueChange={(value) => handleChange("categoria", value)}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione sua categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profissional">Profissional da APAE</SelectItem>
                      <SelectItem value="familiar">Familiar</SelectItem>
                      <SelectItem value="autodefensor">Autodefensor</SelectItem>
                      <SelectItem value="estudante">Estudante</SelectItem>
                      <SelectItem value="convidado">Convidado</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Realizar Inscrição
                </Button>

                <p className="text-xs text-muted-foreground text-center">Ao se inscrever, você concorda com os termos de uso e política de privacidade da Fenapaes.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
