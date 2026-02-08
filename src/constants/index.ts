import Galery1 from "../../public/congresso/galery01.jpg";
import Galery2 from "../../public/congresso/galery02.jpg";
import Galery3 from "../../public/congresso/galery03.jpg";
import Galery4 from "../../public/congresso/galery04.jpg";
import Galery5 from "../../public/congresso/galery05.jpg";
import Galery6 from "../../public/congresso/galery06.jpg";
import Galery7 from "../../public/congresso/53365182857_3349ba0b1f_c.jpg";
import Galery8 from "../../public/congresso/53366073631_543afd73ed_c.jpg";
import Galery9 from "../../public/congresso/53366074211_b92da23c88_c.jpg";
import Galery10 from "../../public/congresso/53366218926_da48f1f7f7_c.jpg";
import Galery11 from "../../public/congresso/53366419088_ffa60d46eb_c.jpg";
import Galery12 from "../../public/congresso/53366862836_7b816d6344_c.jpg";

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
  { value: "fundamental-incompleto", label: "Fundamental Incompleto" },
  { value: "fundamental-completo", label: "Fundamental Completo" },
  { value: "medio-incompleto", label: "Médio Incompleto" },
  { value: "medio-completo", label: "Médio Completo" },
  { value: "superior-incompleto", label: "Superior Incompleto" },
  { value: "superior-completo", label: "Superior Completo" },
  { value: "pos-graduacao", label: "Pós-graduação" },
  { value: "mestrado", label: "Mestrado" },
  { value: "doutorado", label: "Doutorado" },
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
    src: Galery1,
    title: "ABERTURA OFICIAL DO 27º CONGRESSO NACIONAL DAS APAES",
    category: "congressos",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: true,
    description: "Cerimônia de abertura do último congresso",
  },
  {
    id: 2,
    src: Galery2,
    title: "Palestra sobre Inclusão Digital",
    category: "palestras",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Palestra sobre inclusão digital e tecnologias assistivas",
  },
  {
    id: 3,
    src: Galery3,
    title: "Workshop de Artes",
    category: "workshops",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Participantes em atividade prática de artes",
  },
  {
    id: 4,
    src: Galery4,
    title: "Momento de Integração",
    category: "inclusao",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: true,
    description: "Momento de integração entre participantes",
  },
  {
    id: 5,
    src: Galery5,
    title: "Preparativos do Evento",
    category: "bastidores",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Equipe organizando os preparativos do evento",
  },
  {
    id: 6,
    src: Galery6,
    title: "Mesa Redonda sobre Políticas Públicas",
    category: "palestras",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Discussão sobre políticas públicas para inclusão",
  },
  {
    id: 7,
    src: Galery7,
    title: "Cerimônia de Encerramento",
    category: "congressos",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: true,
    description: "Show de encerramento do evento",
  },
  {
    id: 8,
    src: Galery8,
    title: "Atividades Inclusivas",
    category: "inclusao",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Atividades inclusivas durante o congresso",
  },
  {
    id: 9,
    src: Galery9,
    title: "Workshop de Capacitação",
    category: "workshops",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Sessão de capacitação para educadores",
  },
  {
    id: 10,
    src: Galery10,
    title: "27º CONGRESSO NACIONAL DAS APAES - 30-11",
    category: "bastidores",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Voluntários trabalhando nos bastidores do evento",
  },
  {
    id: 11,
    src: Galery11,
    title: "Networking entre Participantes",
    category: "congressos",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: false,
    description: "Participantes interagindo durante o evento",
  },
  {
    id: 12,
    src: Galery12,
    title: "Apresentação Cultural",
    category: "inclusao",
    year: "2023",
    location: "Maceió, Alagoas",
    featured: true,
    description: "Apresentação cultural durante o congresso",
  },
];
