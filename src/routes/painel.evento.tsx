import { useState } from "react";
import { format } from "date-fns";
import { useLotes } from "@/hooks/useLotes";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Hourglass, MapPin, ShoppingCart, Users } from "lucide-react";
import type { LoteFields } from "@/services/form-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAtividade } from "@/hooks/useAtividade";
import { Switch } from "@/components/ui/switch";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/painel/evento")({
  component: RouteComponent,
});

function RouteComponent() {
  const { formatedDataLote } = useLotes();
  const [eventoSelecionado, setEventoSelecionado] = useState<LoteFields | null>();

  const id_lote = formatedDataLote ? formatedDataLote[formatedDataLote.length - 1].cardId : "";
  const { atividade } = useAtividade(id_lote.toString());

  return (
    <div className="space-y-6 col-span-3">
      {eventoSelecionado ? (
        <div className="space-y-6">
          <Button variant="ghost" className="cursor-pointer" onClick={() => setEventoSelecionado(null)}>
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Voltar aos eventos
          </Button>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{eventoSelecionado?.nome}</h2>
                </div>
                <p className="text-muted-foreground">{eventoSelecionado?.descricao}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-medium">
                      {format(eventoSelecionado!.data_inicio_vendas, "dd/MM/yyyy")} até {format(eventoSelecionado!.data_fim_vendas, "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Local</p>
                    <p className="font-medium">Salvador - BA</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">O que esta incluso:</h3>
                <ul className="space-y-2">
                  {atividade?.items?.map((beneficio, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Switch id="{beneficio.titulo}" />
                      <Field orientation="horizontal" className="max-w-sm">
                        <FieldContent>
                          <FieldLabel htmlFor="{beneficio.titulo}">{beneficio.titulo}</FieldLabel>
                        </FieldContent>
                      </Field>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Valor do ingresso</p>
                  <p className="text-3xl font-bold text-secondary">{eventoSelecionado?.preco}</p>
                  <p className="text-sm text-muted-foreground">{eventoSelecionado?.quantidade} vagas disponiveis</p>
                </div>
                <Button size="lg" className="w-full sm:w-auto">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Comprar Ingresso
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Eventos Disponiveis</CardTitle>
            <p className="text-sm text-muted-foreground">Selecione um evento para ver detalhes e realizar a compra</p>
          </CardHeader>
          <CardContent className="space-y-4 cursor-pointer">
            {formatedDataLote?.map((evento) => (
              <div key={evento.cardId} className="border rounded-xl p-4 transition-all" onClick={() => setEventoSelecionado(evento.fields)}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{evento.fields.nome}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{evento.fields.descricao}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{format(evento.fields.data_inicio_vendas, "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Hourglass className="h-4 w-4" />
                        <span>
                          {evento.fields.hora_inicio_vendas} - {evento.fields.hora_fim_vendas}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <p className="text-xl font-bold text-secondary">{evento.fields.preco}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{evento.fields.quantidade} vagas</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
