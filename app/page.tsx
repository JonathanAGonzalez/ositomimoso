import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Features from "@/components/Features";
import Programs from "@/components/Programs";
import Jornadas from "@/components/Jornadas";
import Facilities from "@/components/Facilities";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <FloatingElements />
      <WhatsAppButton />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Philosophy />
        <Features />
        <Programs />
        <Jornadas />
        <Facilities />
        <Team />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
