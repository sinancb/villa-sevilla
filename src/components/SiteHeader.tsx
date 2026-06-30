import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

function getTurkeyHour() {
  return (new Date().getUTCHours() + 3) % 24;
}
function checkIsDay() {
  const h = getTurkeyHour();
  return h >= 7 && h < 20;
}

// Airbnb bélo
function AirbnbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3c-1.2 0-2.1.9-2.1 2.1 0 1.6 2.1 4.6 2.1 4.6s2.1-3 2.1-4.6C14.1 3.9 13.2 3 12 3zm0 3.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM4.5 10.5c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l1.6 1.1c-.8.7-1.9 1.1-3.1 1.1C2.7 18 1 16.3 1 14.2c0-2.2 1.6-3.9 3.5-3.9 1.1 0 2.1.4 2.8 1.1l-1.5 1c-.4-.5-1-.9-1.8-.9zM19.5 10.5c-.8 0-1.4.4-1.9.9l-1.5-1c.7-.7 1.7-1.1 2.8-1.1 2 0 3.6 1.7 3.6 3.9 0 2.1-1.6 3.8-3.6 3.8-1.2 0-2.3-.4-3.1-1.1l1.6-1.1c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-2.1-2.9-2.1zM9.2 16.7L12 18.5l2.8-1.8.9 1.4C14.4 19.3 13.2 20 12 20s-2.4-.7-3.7-1.9l.9-1.4z"/>
    </svg>
  );
}

// Google "G" coloured mark
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const SiteHeader = () => {
  const { lang, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const [isDay, setIsDay] = useState(checkIsDay);

  useEffect(() => {
    const id = setInterval(() => setIsDay(checkIsDay()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const navLinks = [
    { label: t.nav.gallery[lang],                           href: "#gallery" },
    { label: lang === "TR" ? "Müsaitlik" : "Availability", href: "#availability" },
    { label: t.nav.amenities[lang],                         href: "#amenities" },
    { label: t.nav.location[lang],                          href: "#location" },
  ];

  const bg    = isDay ? "bg-[#0a3060]" : "bg-[#050e1b]";
  const mobBg = isDay ? "bg-[#0a3060]" : "bg-[#050e1b]";

  return (
    <header className={`${bg} relative z-50`}>
      <div className="container flex items-center justify-between gap-6 py-4">

        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center gap-2" aria-label="Villa Sevilla">
          <span className="text-lg font-semibold tracking-tight text-white">
            Villa <span className={isDay ? "text-amber-300" : "text-amber-400"}>Sevilla</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-brand text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: lang + Airbnb + Google */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className="text-xs uppercase tracking-brand text-white/70 transition-colors hover:text-white"
          >
            <span className={lang === "TR" ? "font-semibold text-white" : "text-white/35"}>TR</span>
            <span className="mx-1.5 text-white/35">|</span>
            <span className={lang === "EN" ? "font-semibold text-white" : "text-white/35"}>EN</span>
          </button>

          <div className="h-4 w-px bg-white/20" />

          <a
            href="https://www.airbnb.com/rooms/1415310273857886730?guests=1&adults=1&s=67&unique_share_id=2bce3397-f119-4bb1-b01a-454dec8a7d8c"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Airbnb'de Rezervasyon"
            title="Airbnb"
            className="text-white/70 transition-colors hover:text-white"
          >
            <AirbnbIcon className="h-4 w-4" />
          </a>

          <a
            href="https://share.google/qyvSm7CxYNBKY42uk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google İşletme Profili"
            title="Google"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <GoogleIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 ${mobBg} transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Menüyü kapat"
          className="absolute right-6 top-5 inline-flex h-10 w-10 items-center justify-center text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-brand text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleLang}
            className="mt-4 text-xs uppercase tracking-brand text-white/70 transition-colors hover:text-white"
          >
            <span className={lang === "TR" ? "font-semibold text-white" : "text-white/35"}>TR</span>
            <span className="mx-1.5 text-white/35">|</span>
            <span className={lang === "EN" ? "font-semibold text-white" : "text-white/35"}>EN</span>
          </button>
          <div className="flex items-center gap-5 mt-2">
            <a
              href="https://www.airbnb.com/rooms/1415310273857886730?guests=1&adults=1&s=67&unique_share_id=2bce3397-f119-4bb1-b01a-454dec8a7d8c"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Airbnb"
              className="text-white/70 transition-colors hover:text-white"
              onClick={() => setOpen(false)}
            >
              <AirbnbIcon className="h-5 w-5" />
            </a>
            <a
              href="https://share.google/qyvSm7CxYNBKY42uk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google İşletme Profili"
              className="opacity-80 transition-opacity hover:opacity-100"
              onClick={() => setOpen(false)}
            >
              <GoogleIcon className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
