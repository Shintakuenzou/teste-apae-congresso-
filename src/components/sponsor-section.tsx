import { useCallback } from "react";
import { ExternalLink, Globe, Tag } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

interface Sponsor {
  name: string;
  initial: string;
  category: string;
  description: string;
  site: string;
  bg: string;
  ring: string;
  text: string;
  badge: string;
  avatar: string;
}

const sponsors: Sponsor[] = [
  {
    name: "Ministério da Saúde",
    initial: "MS",
    category: "Governo",
    description: "Órgão federal responsável pela política nacional de saúde e pelo apoio a programas de inclusão social em todo o território brasileiro.",
    site: "https://www.gov.br/saude",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-600",
    avatar: "bg-blue-600",
  },
  {
    name: "TOTVS",
    initial: "TV",
    category: "Tecnologia",
    description: "Maior empresa de tecnologia do Brasil, fornecendo soluções de gestão para organizações de todos os portes com inovação e excelência.",
    site: "https://www.totvs.com",
    bg: "bg-red-50",
    ring: "ring-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-600",
    avatar: "bg-red-600",
  },
  {
    name: "Banco do Brasil",
    initial: "BB",
    category: "Financeiro",
    description: "Um dos maiores bancos da América Latina, com forte atuação em responsabilidade social e programas de inclusão financeira.",
    site: "https://www.bb.com.br",
    bg: "bg-yellow-50",
    ring: "ring-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-700",
    avatar: "bg-yellow-500",
  },
  {
    name: "Caixa Econômica",
    initial: "CE",
    category: "Financeiro",
    description: "Instituição financeira pública focada em habitação, infraestrutura e programas sociais para a população brasileira.",
    site: "https://www.caixa.gov.br",
    bg: "bg-orange-50",
    ring: "ring-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-600",
    avatar: "bg-orange-500",
  },
  {
    name: "Petrobras",
    initial: "PB",
    category: "Energia",
    description: "Empresa de energia com programas robustos de responsabilidade social e apoio à cultura, educação e inclusão em todo o Brasil.",
    site: "https://petrobras.com.br",
    bg: "bg-green-50",
    ring: "ring-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-600",
    avatar: "bg-green-600",
  },
  {
    name: "Embratel",
    initial: "EM",
    category: "Telecom",
    description: "Líder em soluções de telecomunicações e conectividade, apoiando a digitalização de serviços sociais em todo o território nacional.",
    site: "https://www.embratel.com.br",
    bg: "bg-purple-50",
    ring: "ring-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-600",
    avatar: "bg-purple-600",
  },
  {
    name: "Correios",
    initial: "CO",
    category: "Logística",
    description: "Empresa pública presente em todo o território nacional, facilitando comunicação, logística e inclusão com responsabilidade social.",
    site: "https://www.correios.com.br",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    avatar: "bg-amber-500",
  },
  {
    name: "CNI",
    initial: "CN",
    category: "Indústria",
    description: "Confederação Nacional da Indústria, representando o setor industrial e promovendo educação, qualificação e inclusão no mercado de trabalho.",
    site: "https://www.portaldaindustria.com.br",
    bg: "bg-sky-50",
    ring: "ring-sky-200",
    text: "text-sky-700",
    badge: "bg-sky-100 text-sky-600",
    avatar: "bg-sky-600",
  },
];

// ─── Embla auto-scroll: pausa ao hover/foco, respeita prefers-reduced-motion ───
const autoScrollPlugin = AutoScroll({
  speed: 1,
  stopOnInteraction: false, // continua após drag
  stopOnMouseEnter: true, // pausa no hover (a11y)
  stopOnFocusIn: true, // pausa quando um card recebe foco via teclado (a11y)
});

export function SponsorsSection() {
  // `open` controla o Radix Dialog (permite a animação de saída rodar completa)
  // `selected` guarda os dados — só limpa APÓS a animação terminar
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Sponsor | null>(null);

  // Embla — loop: true habilita o loop infinito real sem duplicar itens manualmente
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      slidesToScroll: 1,
      // Responsividade automática via breakpoints do Embla
      breakpoints: {
        "(max-width: 640px)": { slidesToScroll: 1 },
        "(min-width: 641px)": { slidesToScroll: 2 },
      },
    },
    [autoScrollPlugin],
  );

  // Para/retoma o scroll quando o modal abre/fecha
  const autoScroll = emblaApi?.plugins()?.autoScroll;

  const openModal = useCallback(
    (sponsor: Sponsor) => {
      autoScroll?.stop();
      setSelected(sponsor); // dados primeiro
      setOpen(true); // Radix anima a entrada
    },
    [autoScroll],
  );

  const closeModal = useCallback(() => {
    setOpen(false); // Radix roda a animação de saída completa
    // `selected` só limpa depois que a animação termina (bate com duration-200)
    setTimeout(() => {
      setSelected(null);
      autoScroll?.play();
    }, 200);
  }, [autoScroll]);

  return (
    <section className="relative bg-background border-b border-border overflow-hidden" aria-label="Patrocinadores Oficiais">
      {/* Faixa de destaque superior */}
      <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-primary to-secondary" />

      {/* Fundo pontilhado sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
          <div className="text-center shrink-0">
            <h2 className="text-xl font-bold text-foreground">Patrocinadores Oficiais</h2>
            <p className="text-sm text-muted-foreground mt-1">Clique em um patrocinador para ver detalhes</p>
          </div>
          <div className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        {/* ── Embla Carousel ── */}
        {/*
          role="region" + aria-label: screen readers anunciam "Carrossel de patrocinadores"
          aria-roledescription="carrossel": semântica WCAG para carrosséis
        */}
        <div
          ref={emblaRef}
          className="overflow-hidden"
          role="region"
          aria-label="Carrossel de patrocinadores"
          aria-roledescription="carrossel"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex py-2">
            {sponsors.map((s, i) => (
              /*
                role="group" + aria-roledescription="item": cada slide é anunciado
                como "item X de Y" pelo leitor de tela
              */
              <div key={i} className="embla__slide flex-shrink-0 px-2" role="group" aria-roledescription="item" aria-label={`${s.name} — ${s.category}`}>
                {/*
                  role="button" + tabIndex: card navegável por teclado
                  onKeyDown: abre com Enter e Space (padrão de botão)
                */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalhes de ${s.name}`}
                  onClick={() => openModal(s)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(s);
                    }
                  }}
                  className={`
                    flex flex-col items-center gap-2
                    rounded-2xl px-6 py-5 cursor-pointer select-none
                    transition-all duration-200 border
                    hover:scale-105 hover:shadow-lg active:scale-95
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    ${s.bg} border-border shadow-sm
                  `}
                  style={{ minWidth: 180 }}
                >
                  <div aria-hidden="true" className={`w-12 h-12 rounded-2xl ${s.avatar} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {s.initial}
                  </div>
                  <p className={`text-sm font-bold text-center leading-tight ${s.text}`}>{s.name}</p>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${s.badge}`}>{s.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p aria-hidden="true" className="text-center text-xs text-muted-foreground/40 mt-6 flex items-center justify-center gap-2">
          <span className="text-primary/30">✦</span>
          Clique para ver detalhes do patrocinador
          <span className="text-primary/30">✦</span>
        </p>
      </div>

      {/* Faixa inferior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Radix Dialog Modal ──
        Benefícios vs implementação manual:
        • Focus trap automático (Tab não vaza para o fundo)
        • Fecha com Esc nativamente
        • aria-modal="true" gerenciado automaticamente
        • Foco retorna ao elemento que abriu o modal ao fechar
        • aria-labelledby e aria-describedby conectados via Dialog.Title / Dialog.Description
        • Scroll lock no body
      */}
      <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <Dialog.Portal>
          {/* Backdrop */}
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          {/* Card do modal */}
          <Dialog.Content
            className={`
              fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-full max-w-md rounded-3xl shadow-2xl overflow-hidden
              data-[state=open]:animate-in data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
              duration-200
              ${selected?.bg ?? ""}
            `}
            // Radix gerencia aria-modal, aria-labelledby e aria-describedby automaticamente
          >
            {/* Header colorido */}
            <div className={`${selected?.avatar} p-6 flex items-center gap-4`}>
              <div aria-hidden="true" className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black text-xl shadow-lg">
                {selected?.initial}
              </div>

              <div className="flex-1 min-w-0">
                {/* Dialog.Title: conectado automaticamente ao aria-labelledby do dialog */}
                <Dialog.Title className="text-white font-black text-xl leading-tight">{selected?.name}</Dialog.Title>
                <div className="flex items-center gap-1.5 mt-1.5" aria-hidden="true">
                  <Tag className="w-3 h-3 text-white/70" />
                  <span className="text-white/80 text-xs font-semibold">{selected?.category}</span>
                </div>
              </div>

              {/* Dialog.Close: Radix gerencia o retorno de foco automaticamente */}
              <Dialog.Close
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Fechar detalhes do patrocinador"
              >
                <span aria-hidden="true" className="text-white text-sm font-bold">
                  ✕
                </span>
              </Dialog.Close>
            </div>

            {/* Corpo */}
            <div className="p-6 flex flex-col gap-5">
              {/* Dialog.Description: conectado ao aria-describedby do dialog */}
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${selected?.text} opacity-60`} aria-hidden="true">
                  Sobre
                </p>
                <Dialog.Description className="text-foreground/80 text-sm leading-relaxed">{selected?.description}</Dialog.Description>
              </div>

              {/* Divider */}
              <div aria-hidden="true" className={`h-px ${selected?.ring} ring-1 ring-inset opacity-30`} />

              {/* Site */}
              <div className="flex items-center gap-2">
                <Globe className={`w-4 h-4 ${selected?.text} shrink-0`} aria-hidden="true" />
                <a
                  href={selected?.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${selected?.text} truncate hover:underline focus-visible:outline-none focus-visible:underline`}
                  aria-label={`Site oficial de ${selected?.name} (abre em nova aba)`}
                >
                  {selected?.site.replace("https://", "")}
                </a>
              </div>

              {/* Botão principal */}
              <a
                href={selected?.site}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar site oficial de ${selected?.name} (abre em nova aba)`}
                className={`
                  w-full flex items-center justify-center gap-2
                  py-3 rounded-2xl text-white font-bold text-sm
                  shadow-lg hover:opacity-90 hover:scale-[1.02]
                  active:scale-[0.98] transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2
                  ${selected?.avatar}
                `}
              >
                Visitar site oficial
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>

              {/* Botão fechar secundário */}
              <Dialog.Close className="w-full py-2.5 rounded-2xl text-sm font-semibold text-muted-foreground hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Fechar
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
