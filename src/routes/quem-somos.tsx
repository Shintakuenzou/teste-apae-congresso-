import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Target, Award, ArrowRight, Building, Calendar, Globe } from "lucide-react";

export const Route = createFileRoute("/quem-somos")({
  component: QuemSomosPage,
});

const features = [
  {
    icon: Heart,
    title: "Inclusao",
    description: "Promovemos a inclusao social de pessoas com deficiencia intelectual e multipla em todas as esferas da sociedade.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Uma rede de mais de 2.000 APAEs em todo o Brasil, unidas pelo compromisso com a vida e a dignidade humana.",
  },
  {
    icon: Target,
    title: "Missao",
    description: "Defender os direitos das pessoas com deficiencia e promover politicas publicas que garantam sua plena cidadania.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Mais de 60 anos de historia dedicados a educacao especial, saude e assistencia social de qualidade.",
  },
];

const stats = [
  { value: "2.000+", label: "APAEs no Brasil", icon: Building },
  { value: "250.000+", label: "Pessoas atendidas", icon: Users },
  { value: "60+", label: "Anos de historia", icon: Calendar },
  { value: "27", label: "Estados representados", icon: Globe },
];

const timeline = [
  {
    year: "1954",
    title: "Fundacao da primeira APAE",
    description: "A primeira APAE foi fundada no Rio de Janeiro, iniciando o movimento apaeano no Brasil.",
  },
  {
    year: "1962",
    title: "Criacao da Fenapaes",
    description: "A Federacao Nacional das APAEs foi criada para coordenar e fortalecer o movimento em todo o pais.",
  },
  {
    year: "1988",
    title: "Constituicao Federal",
    description: "A nova Constituicao brasileira reconhece os direitos das pessoas com deficiencia.",
  },
  {
    year: "2015",
    title: "Lei Brasileira de Inclusao",
    description: "Marco historico na garantia dos direitos das pessoas com deficiencia no Brasil.",
  },
  {
    year: "2026",
    title: "Congresso Nacional",
    description: "O maior evento do movimento apaeano reunira milhares de participantes em Brasilia.",
  },
];

function QuemSomosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">Quem Somos</h1>
            <p className="text-base text-primary-foreground/80 leading-relaxed text-justify">
              APAE Brasil é a principal rede nacional responsável pela promoção, articulação e defesa dos direitos das pessoas com deficiência intelectual e múltipla, atuando em
              políticas públicas, capacitação técnica e monitoramento de garantias legais. Posso adaptar este texto para o cabeçalho do site.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent rounded-2xl mb-4">
                  <stat.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Nossa Historia</h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  A Federação Nacional das Apaes, ou Apae Brasil, é a maior rede de defesa e garantia de direitos das pessoas com deficiência intelectual e deficiência múltipla da
                  América Latina. De acordo com o Censo IBGE 2010, o Brasil tem 45.606.048 de pessoas com deficiência, o que equivale a 23,9% da população do país. Segundo a
                  pesquisa, 18,60% foram declaradas pessoas com deficiência visual, 7% com deficiência motora, 5,10% com deficiência auditiva e 1,40% com deficiência mental. O
                  movimento apaeano foi fundado por um grupo pioneiro de pais e profissionais dedicados, motivados pela urgência de promover a desinstitucionalização e garantir o
                  direito à educação e à vida comunitária para pessoas com deficiência intelectual. Esse movimento emergiu no Brasil, um país onde, historicamente, a rejeição, a
                  discriminação e o preconceito eram enfrentados cotidianamente por essas pessoas e suas famílias. Em resposta a esses desafios, as primeiras associações foram
                  criadas com o intuito de oferecer educação, atendimento na área de saúde e lutar pela inclusão social desses indivíduos. Essas associações, que se tornaram
                  conhecidas como Associações de Pais e Amigos dos Excepcionais (Apaes), formaram uma rede que se dedicava não apenas à educação e ao atendimento de saúde, mas
                  também à luta contínua pelos direitos das pessoas com deficiência. Esse compromisso incluiu a mobilização de diversos profissionais que, acreditando na causa,
                  realizaram estudos e pesquisas, buscaram informações em entidades estrangeiras e trocaram experiências com pessoas de outras nacionalidades que enfrentavam
                  desafios similares. O movimento apaeano, fundamentado na Declaração dos Direitos Humanos, iniciou uma significativa prestação de serviços em educação, saúde e
                  assistência social para aqueles que necessitavam, em toda a extensão do território nacional. Em 2022, a rede apaeana alcançou o impressionante número de
                  23.035.726 atendimentos nas áreas de prevenção e saúde, educação, assistência social e inclusão no mercado de trabalho, atendendo mais de 1,6 milhão de pessoas em
                  mais de 2.255 unidades espalhadas por todo o Brasil. A iniciativa dessas famílias em fundar as Apaes e a expansão desse movimento pelo Brasil deram origem ao que
                  hoje conhecemos como movimento apaeano, uma força significativa na promoção e defesa dos direitos das pessoas com deficiência intelectual e múltipla. Movimento
                  apaeano O movimento apaeano é uma grande rede constituída por pais, amigos, pessoas com deficiência, voluntários, profissionais e instituições parceiras –
                  públicas e privadas – unidas para a promoção e defesa dos direitos de cidadania da pessoa com deficiência e a sua inclusão social. Atualmente, o movimento
                  congrega a Federação Nacional das Apaes (Apae Brasil), 26 Federações das Apaes de Estado (Feapaes) e mais de duas mil e duzentas Apaes, distribuídas em todo o
                  território brasileiro, propiciando atenção integral a mais de 1,6 milhão de pessoas com deficiência intelectual e múltipla. É o maior movimento social do Brasil e
                  da América Latina na sua área de atuação. Federação Nacional das Apaes (Apae Brasil) A Federação Nacional das Apaes, ou Apae Brasil, é uma organização social sem
                  fins lucrativos, reconhecida como de utilidade pública federal e certificada como beneficente de assistência social, de caráter cultural, assistencial e
                  educacional, que congrega como filiadas atualmente mais de 2.200 Apaes e entidades filiadas e 26 Federações Estaduais, que compõem o movimento apaeano, tendo como
                  missão institucional promover e articular ações de defesa dos direitos das pessoas com deficiência e representar o movimento perante os organismos nacionais e
                  internacionais, para a melhoria da qualidade dos serviços prestados pelas Apaes, na perspectiva da inclusão social de seus usuários. Federação das Apaes do Estado
                  (Feapaes) A Federação das Apaes do Estado é uma associação civil, beneficente de assistência social, de assessoramento, de defesa e garantia de direitos com foco
                  no fortalecimento do movimento social da pessoa com deficiência, formação e capacitação de lideranças, defesa, efetivação e construção de novos direitos, promoção
                  da cidadania, enfrentamento das desigualdades sociais, articulação com órgãos públicos de defesa de direitos, dirigidos ao público da política de assistência
                  social, nas áreas da educação, saúde, esporte, cultura, formação do trabalho, estudo e pesquisa, sem fins lucrativos e de fins não econômicos, com duração
                  indeterminada com a missão de promover e articular ações de defesa dos direitos das pessoas com deficiência e representar o movimento perante os organismos
                  estaduais, para a melhoria da qualidade dos serviços prestados pelas Apaes, na perspectiva da inclusão social de seus usuários. As Apaes e outras entidades
                  análogas serão consideradas filiadas à Federação das Apaes de seu Estado após sua filiação à Federação Nacional das Apaes. Apae A Apae (Associação de Pais e
                  Amigos dos Excepcionais) nasceu em 1954, na cidade do Rio de Janeiro. Caracteriza-se por ser uma organização social, cujo objetivo principal é promover a atenção
                  integral à pessoa com deficiência, prioritariamente aquela com deficiência intelectual e múltipla. A Rede Apae destaca-se por seu pioneirismo e capilaridade,
                  estando presente, atualmente, em mais de 2.200 mil municípios em todo o território nacional. A Apae tem sido reconhecida ao longo dos anos como uma das
                  instituições mais confiáveis do Brasil, conforme demonstrado pelos múltiplos prêmios de “Marca de Confiança” recebidos da Revista Seleções. Este prestigioso
                  reconhecimento é um testemunho do comprometimento contínuo da Apae em promover uma vida de qualidade para pessoas com deficiência intelectual e múltipla, e
                  reflete a excelente reputação que a organização construiu ao longo de décadas de trabalho dedicado. Fundamentos da confiança A confiança que a Apae construiu
                  junto ao público brasileiro se baseia em diversos pilares fundamentais: Transparência nas operações A Apae sempre manteve uma política de transparência em suas
                  operações financeiras e administrativas, garantindo que doadores, parceiros e a comunidade em geral possam ter visibilidade e entendimento claro sobre como os
                  recursos são utilizados. Impacto comprovado Os programas e serviços oferecidos pela Apae têm resultados mensuráveis, que demonstram impacto positivo na vida das
                  pessoas atendidas. Isso inclui melhorias na educação, saúde, inclusão social e empregabilidade, entre outras áreas. Engajamento com a comunidade A Apae trabalha
                  em estreita colaboração com as comunidades locais, promovendo a inclusão de pessoas com deficiência em todas as esferas da vida social. Esse engajamento ajuda a
                  fortalecer laços comunitários e promove uma maior conscientização sobre as questões da deficiência. Advocacia e luta por direitos A organização não apenas presta
                  serviços diretos, mas também atua fortemente na advocacia pelos direitos das pessoas com deficiência, trabalhando para influenciar políticas públicas e
                  legislações que favoreçam essa parcela da população. Reconhecimento da Revista Seleções O prêmio de “Marca de Confiança”, da Revista Seleções, é concedido
                  anualmente a marcas em diversas categorias, com base em pesquisas de opinião pública que medem a percepção de confiança que os consumidores têm nas empresas e
                  instituições. Para a Apae, receber este prêmio, repetidas vezes, reforça o reconhecimento do trabalho sério e comprometido que a organização realiza. A premiação
                  também ressalta a responsabilidade que a Apae carrega em manter e superar as expectativas do público a cada ano. Cada reconhecimento recebido pela Apae não apenas
                  valida o trabalho já realizado, mas também impulsiona a organização a continuar inovando e melhorando seus programas e suas abordagens. Os prêmios de "Marca de
                  Confiança" que a Apae acumulou ao longo dos anos são muito mais do que meros troféus em uma estante. Eles são um reflexo do impacto profundo e duradouro que a
                  organização teve na sociedade brasileira, e um lembrete do trabalho contínuo que ainda precisa ser feito para garantir que todas as pessoas, independentemente de
                  suas capacidades, possam viver com dignidade e plenitude. A Apae, com o seu histórico de confiança e eficácia, permanece na vanguarda desse esforço, moldando um
                  futuro mais inclusivo para todos.
                </p>
              </div>

              <Button asChild size="lg" className="mt-8 group">
                <a href="/inscricao">
                  Participe do Congresso
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Nossa Trajetoria</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Mais de 60 anos de luta pela inclusao e pelos direitos das pessoas com deficiencia</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <Card className="inline-block">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-secondary mb-2">{item.year}</div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="relative z-10 w-4 h-4 bg-secondary rounded-full border-4 border-background shadow-lg" />

                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <Card className="inline-block">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-secondary mb-2">{item.year}</div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">Faça Parte Dessa História</h2>
          <p className="text-base text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            O Congresso Nacional APAE Brasil 2026 constitui o principal evento do movimento apaeano, congregando profissionais, familiares, pesquisadores e pessoas com deficiência
            de todo o país para debates técnicos, capacitação profissional e articulação de políticas públicas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-14 px-8">
              <a href="/login">Inscreva-se Agora</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
