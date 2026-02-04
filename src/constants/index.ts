type DisabilityOption =
  | "deficiencia_fisica"
  | "deficiencia_visual"
  | "deficiencia_auditiva"
  | "deficiencia_intelectual"
  | "deficiencia_mental"
  | "deficiencia_multipla"
  | "sindrome_down"
  | "paralisia_cerebral"
  | "multipla";

export const tamanhosCamisa = ["PP", "P", "M", "G", "GG", "XG", "XGG"];

export const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export const escolaridades = [
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

export const DISABILITY_OPTIONS: { value: DisabilityOption; label: string }[] = [
  { value: "deficiencia_intelectual", label: "Deficiência Intelectual (DI)" },
  { value: "sindrome_down", label: "Síndrome de Down" },
  { value: "paralisia_cerebral", label: "Paralisia Cerebral" },
  { value: "deficiencia_fisica", label: "Deficiência Física" },
  { value: "deficiencia_visual", label: "Deficiência Visual" },
  { value: "deficiencia_auditiva", label: "Deficiência Auditiva" },
  { value: "deficiencia_mental", label: "Deficiência Mental / Psicossocial" },
  { value: "deficiencia_multipla", label: "Deficiência Múltipla" },
  { value: "multipla", label: "Multipla" },
];

export const opcao_apoio: { value: string; label: string }[] = [
  {
    value: "cadeira de rodas",
    label: "Cadeira de rodas não motorizada",
  },
  {
    value: "cadeira de rodas motorizada",
    label: "Cadeira de rodas motorizada",
  },
  {
    value: "andador",
    label: "Andador",
  },
  {
    value: "bengala",
    label: "Bengala",
  },
  {
    value: "muletas",
    label: "Muletas",
  },
  {
    value: "rampas e elevadores",
    label: "Rampas e elevadores",
  },
  {
    value: "proteses ou orteses",
    label: "Próteses ou orteses",
  },
  {
    value: "calcados ortopedicos",
    label: "Calçados ortopédicos",
  },
  {
    value: "tecnologias assistivas",
    label: "Tecnologias assistivas",
  },
  {
    value: "Outros",
    label: "Outros",
  },
];

export const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    title: "Abertura do Congresso 2024",
    category: "congressos",
    year: "2024",
    location: "São Paulo, SP",
    featured: true,
    description: "Cerimônia de abertura do último congresso",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    title: "Palestra sobre Inclusão Digital",
    category: "palestras",
    year: "2024",
    location: "Rio de Janeiro, RJ",
    featured: false,
    description: "Palestra sobre inclusão digital e tecnologias assistivas",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    title: "Workshop de Artes",
    category: "workshops",
    year: "2023",
    location: "Belo Horizonte, MG",
    featured: false,
    description: "Participantes em atividade prática de artes",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    title: "Momento de Integração",
    category: "inclusao",
    year: "2024",
    location: "Brasília, DF",
    featured: true,
    description: "Momento de integração entre participantes",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    title: "Preparativos do Evento",
    category: "bastidores",
    year: "2023",
    location: "Curitiba, PR",
    featured: false,
    description: "Equipe organizando os preparativos do evento",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=600&fit=crop",
    title: "Mesa Redonda sobre Políticas Públicas",
    category: "palestras",
    year: "2024",
    location: "Salvador, BA",
    featured: false,
    description: "Discussão sobre políticas públicas para inclusão",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    title: "Cerimônia de Encerramento",
    category: "congressos",
    year: "2023",
    location: "Fortaleza, CE",
    featured: true,
    description: "Show de encerramento do evento",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
    title: "Atividades Inclusivas",
    category: "inclusao",
    year: "2024",
    location: "Porto Alegre, RS",
    featured: false,
    description: "Atividades inclusivas durante o congresso",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop",
    title: "Workshop de Capacitação",
    category: "workshops",
    year: "2023",
    location: "Recife, PE",
    featured: false,
    description: "Sessão de capacitação para educadores",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",
    title: "Equipe de Voluntários",
    category: "bastidores",
    year: "2024",
    location: "Manaus, AM",
    featured: false,
    description: "Voluntários trabalhando nos bastidores do evento",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    title: "Networking entre Participantes",
    category: "congressos",
    year: "2024",
    location: "Goiânia, GO",
    featured: false,
    description: "Participantes interagindo durante o evento",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&h=600&fit=crop",
    title: "Apresentação Cultural",
    category: "inclusao",
    year: "2023",
    location: "Florianópolis, SC",
    featured: true,
    description: "Apresentação cultural durante o congresso",
  },
];
