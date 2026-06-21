import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ClosingStatement } from "@/components/sections/ClosingStatement";
import { HomeHero } from "@/components/sections/HomeHero";
import { MessageSection } from "@/components/sections/MessageSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <HomeHero />
      <ServicesSection />
      <ClientsSection />
      <MessageSection />
      <ClosingStatement />
    </SmoothScrollProvider>
  );
}
