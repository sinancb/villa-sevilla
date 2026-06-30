import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import ContactCta from "@/components/ContactCta";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Amenities from "@/components/Amenities";
import Location from "@/components/Location";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <Hero />
      <Gallery />
      <ContactCta />
      <AvailabilityCalendar />
      <Amenities />
      <Location />
    </main>
    <SiteFooter />
    <WhatsAppFab />
  </div>
);

export default Index;
