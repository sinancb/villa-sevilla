import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const { lang } = useLang();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — replace with actual villa photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-cyan-800 to-teal-900" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center">
        <p className="mb-4 text-xs uppercase tracking-brand text-white/70 animate-fade-up [animation-delay:0.1s]">
          Ölüdeniz · Fethiye
        </p>
        <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white animate-fade-up [animation-delay:0.2s]">
          Villa Sevilla
        </h1>
        <p className="mb-4 text-lg md:text-xl text-white/90 font-light animate-fade-up [animation-delay:0.3s]">
          {t.hero.tagline[lang]}
        </p>
        <p className="mb-10 max-w-lg text-sm md:text-base text-white/70 font-light leading-relaxed animate-fade-up [animation-delay:0.4s]">
          {t.hero.description[lang]}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up [animation-delay:0.5s]">
          <a
            href="#book"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white tracking-wide transition-opacity hover:opacity-90"
          >
            {t.hero.cta_book[lang]}
          </a>
          <a
            href="#gallery"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 px-8 text-sm font-medium text-white tracking-wide transition-colors hover:bg-white/10"
          >
            {t.hero.cta_gallery[lang]}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
      </div>
    </section>
  );
};

export default Hero;
