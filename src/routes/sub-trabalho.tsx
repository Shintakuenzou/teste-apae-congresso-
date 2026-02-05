import { EmptyState } from "@/components/empty-state";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sub-trabalho")({
  component: SubTrabalho,
});

function SubTrabalho() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="py-16 flex-1 flex items-center justify-center">
        <EmptyState
          type="not-found"
          variant="ghost"
          size="default"
          title="Em breve..."
          description="Essa página em breve estará disponível"
          className="bg-transparent border-none shadow-none"
        />
      </section>

      <Footer />
    </main>
  );
}
