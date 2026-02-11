import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = ["Acesso completo a todas as palestras", "Material exclusivo do evento", "Certificado de participação", "Networking com profissionais"];

export function CTASection() {
  return (
    <section className="py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">Garanta sua Vaga no Maior Evento do Movimento Apaeano</h2>
            <p className="text-lg text-primary-foreground/75 mb-8">
              Inscrições com desconto de 30% ate 30 de Junho de 2026. Não perca essa oportunidade única de fazer parte dessa transformação.
            </p>

            <ul className="space-y-3 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-primary-foreground/85">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-14 px-8 shadow-lg hover:shadow-xl transition-all group"
              >
                <a href="/login">
                  Inscreva-se agora
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 bg-transparent"
              >
                <a href="/quem-somos">Saiba mais</a>
              </Button>
            </div>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/20">
            <div className="text-center">
              <div className="text-sm text-primary-foreground/60 mb-2">Investimento</div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-primary-foreground/50 line-through text-2xl">R$ 500</span>
                <span className="text-5xl font-bold text-primary-foreground">R$ 350</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium">Economia de 30%</div>

              <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-foreground">3</div>
                    <div className="text-xs text-primary-foreground/60">Dias</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-foreground">50+</div>
                    <div className="text-xs text-primary-foreground/60">Palestras</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-foreground">100%</div>
                    <div className="text-xs text-primary-foreground/60">Acessivel</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
