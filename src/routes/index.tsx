import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedSchedule } from "@/components/featured-schedule";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { SpeakersSection } from "@/components/speakers-section";
import { GallerySection } from "@/components/galery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Hero />
        <SpeakersSection />
        <FeaturedSchedule />
        <GallerySection />
        <CTASection />
        <Footer />
      </QueryClientProvider>
    </main>
  );
}
