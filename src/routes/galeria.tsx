import { useState, useCallback } from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { X, ChevronLeft, ChevronRight, Grid3X3, LayoutGrid, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "congressos", label: "Congressos" },
  { id: "palestras", label: "Palestras" },
  { id: "workshops", label: "Workshops" },
  { id: "inclusao", label: "Inclusão" },
  { id: "bastidores", label: "Bastidores" },
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

export const Route = createFileRoute("/galeria")({
  component: Galery,
});

function Galery() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const filteredPhotos = activeCategory === "todos" ? photos : photos.filter((photo) => photo.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  }, [filteredPhotos.length]);

  const goToNext = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
  }, [filteredPhotos.length]);

  const currentPhoto = filteredPhotos[currentPhotoIndex];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Minimalista */}
      <section className="pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary mb-2">Galeria</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Momentos que
              <br />
              <span className="text-muted-foreground">inspiram</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">Reviva os melhores momentos dos nossos eventos e congressos.</p>
          </div>

          {/* Contador elegante */}
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filteredPhotos.length}</span>
            <span>momentos capturados</span>
          </div>
        </div>
      </section>

      {/* Filtros e Controles */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Categorias */}
            <div className="flex flex-wrap items-center gap-2 none">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                    activeCategory === category.id ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Toggle de visualização */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setViewMode("masonry")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "masonry" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="Visualização masonry"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-2 rounded-md transition-colors", viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                aria-label="Visualização em grade"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {viewMode === "masonry" ? (
            /* Layout Masonry */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className={cn("group relative break-inside-avoid cursor-pointer overflow-hidden rounded-xl", photo.featured ? "row-span-2" : "")}
                >
                  <div className={cn("relative w-full", photo.featured ? "aspect-[4/5]" : "aspect-[4/3]")}>
                    <img src={photo.src || "/placeholder.svg"} alt={photo.title} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Overlay com informações */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-background font-medium text-lg leading-tight">{photo.title}</h3>
                        <div className="mt-2 flex items-center gap-4 text-sm text-background/70">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {photo.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {photo.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Layout Grid Uniforme */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPhotos.map((photo, index) => (
                <div key={photo.id} onClick={() => openLightbox(index)} className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl">
                  <img src={photo.src || "/placeholder.svg"} alt={photo.title} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {/* Overlay com informações */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-background font-medium text-sm leading-tight">{photo.title}</h3>
                      <p className="mt-1 text-xs text-background/70">
                        {photo.year} • {photo.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentPhoto && (
        <div className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm">
          {/* Botão Fechar */}
          <button onClick={closeLightbox} className="absolute top-6 right-6 z-10 p-2 text-background/70 hover:text-background transition-colors" aria-label="Fechar">
            <X className="h-6 w-6" />
          </button>

          {/* Navegação */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/10 hover:bg-background/20 rounded-full text-background transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/10 hover:bg-background/20 rounded-full text-background transition-colors"
            aria-label="Próxima foto"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Imagem */}
          <div className="flex h-full items-center justify-center p-4 md:p-16">
            <div className="relative max-h-full max-w-full">
              <div className="relative aspect-video w-[90vw] max-w-5xl">
                <img src={currentPhoto.src || "/placeholder.svg"} alt={currentPhoto.title} className="object-contain" />
              </div>

              {/* Informações da foto */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <h3 className="text-background font-medium text-xl">{currentPhoto.title}</h3>
                <div className="mt-2 flex items-center justify-center gap-4 text-sm text-background/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {currentPhoto.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {currentPhoto.location}
                  </span>
                </div>
                {/* Contador */}
                <p className="mt-4 text-sm text-background/40">
                  {currentPhotoIndex + 1} / {filteredPhotos.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
