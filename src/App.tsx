import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedSchedule } from "@/components/featured-schedule";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export function App() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedSchedule />
      <CTASection />
      <Footer />
    </main>
  );
}
