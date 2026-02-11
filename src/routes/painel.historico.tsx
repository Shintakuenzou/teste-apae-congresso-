/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/painel/historico")({
  component: RouteComponent,
});

const historicoCompras: any = [];

function RouteComponent() {
  const [compraSelecionada, setCompraSelecionada] = useState();

  return (
    <>
      {!compraSelecionada && (
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl">Histórico de Compras</CardTitle>
            <p className="text-sm text-muted-foreground">Acompanhe todas as suas compras e status de pagamento</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {historicoCompras.length === 0 ? (
              <div className="text-center py-12">
                <EmptyState title="Nenhum histórico de compras no momento" description="" type="no-data" />
              </div>
            ) : (
              historicoCompras.map((compra: any) => (
                <div
                  key={compra.id}
                  className="border rounded-xl p-4 hover:border-primary/50 hover:shadow-md cursor-pointer transition-all"
                  onClick={() => setCompraSelecionada(compra)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{compra.evento}</h3>
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
    </>
  );
}
