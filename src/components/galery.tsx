import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { photos } from "@/routes/galeria";

const galleryImages = [
  {
    id: 1,
    title: "Congresso 2024",
    description: "Cerimônia de abertura do último congresso",
    category: "Eventos",
  },
  {
    id: 2,
    title: "Palestras",
    description: "Auditório lotado durante palestra principal",
    category: "Palestras",
  },
  {
    id: 3,
    title: "Workshops",
    description: "Participantes em atividade prática",
    category: "Workshops",
  },
  {
    id: 4,
    title: "Networking",
    description: "Momento de integração entre participantes",
    category: "Social",
  },
  {
    id: 5,
    title: "Exposição",
    description: "Stands de parceiros e expositores",
    category: "Exposição",
  },
  {
    id: 6,
    title: "Encerramento",
    description: "Show de encerramento do evento",
    category: "Eventos",
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">Galeria</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Galeria de fotos</h2>
            <p className="text-muted-foreground max-w-xl">Reviva os melhores momentos dos eventos anteriores e prepare-se para o Congresso 2026.</p>
          </div>
          <Button variant="outline" className="self-start md:self-auto group bg-transparent" asChild>
            <Link to="/galeria">
              Ver Galeria Completa
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.slice(0, 6).map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <div className={`bg-primary/20 ${index === 0 ? "aspect-square" : "aspect-square"}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20  group-hover:opacity-80 transition-opacity">
                  <img src={image.src || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-bold text-primary-foreground/30 ${index === 0 ? "text-8xl" : "text-4xl"}`}>{image.id}</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="inline-block px-2 py-1 bg-primary/80 text-primary-foreground text-xs rounded mb-2">{image.category}</span>
                <h3 className={`font-semibold text-background mb-1 ${index === 0 ? "text-xl" : "text-sm"}`}>{image.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button
            className="absolute top-4 right-4 p-2 bg-background/20 rounded-full hover:bg-background/40 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar"
          >
            <X className="h-6 w-6 text-background" />
          </button>

          <div className="max-w-4xl w-full bg-card rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-primary/20 flex items-center justify-center">
              <span className="text-8xl font-bold text-primary-foreground/30">{galleryImages[selectedImage].id}</span>
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">{galleryImages[selectedImage].category}</span>
              <h3 className="text-2xl font-bold text-foreground mb-2">{galleryImages[selectedImage].title}</h3>
              <p className="text-muted-foreground">{galleryImages[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
