import { Phone, MessageCircle } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const ContactCta = () => {
  const { lang } = useLang();

  return (
    <section className="bg-[#0b1623] py-20">
      <div className="container flex flex-col items-center text-center gap-8">

        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-amber-400/40" />
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70 font-light">
            {lang === "TR" ? "İletişim" : "Get in Touch"}
          </p>
          <div className="h-px w-12 bg-amber-400/40" />
        </div>

        <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white/90">
          {lang === "TR"
            ? "Soruların mı var? Hemen ulaş."
            : "Have questions? Reach out now."}
        </h2>

        <p className="max-w-sm text-sm text-white/40 font-light leading-relaxed">
          {lang === "TR"
            ? "Rezervasyon, fiyat veya müsaitlik için bizi arayabilir ya da WhatsApp'tan yazabilirsiniz."
            : "For bookings, pricing or availability, call us or send a WhatsApp message."}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
          <a
            href="tel:05421124801"
            className="flex w-full items-center justify-center gap-3 h-14 rounded-md bg-amber-400 text-sm font-semibold text-[#0b1623] tracking-wide transition-opacity hover:opacity-90"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>0542 112 48 01</span>
          </a>
          <a
            href="https://wa.me/16478625496"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 h-14 rounded-md border border-white/15 text-sm font-medium text-white/75 tracking-wide transition-colors hover:border-white/35 hover:text-white"
          >
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span>WhatsApp'tan Yaz</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ContactCta;
