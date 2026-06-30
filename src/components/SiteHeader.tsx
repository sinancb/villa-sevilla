import { useEffect, useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

const SiteHeader = () => {
  const { lang, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const navLinks = [
    { label: t.nav.gallery[lang],   href: "#gallery" },
    { label: t.nav.amenities[lang], href: "#amenities" },
    { label: t.nav.location[lang],  href: "#location" },
    { label: t.nav.book[lang],      href: "#book" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-6 py-5">
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center gap-2" aria-label="Villa Sevilla">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Villa <span className="text-primary">Sevilla</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-brand text-foreground/75 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: lang toggle + instagram */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className="text-xs uppercase tracking-brand text-foreground/75 transition-colors hover:text-foreground"
          >
            <span className={lang === "TR" ? "font-semibold text-foreground" : "text-foreground/35"}>TR</span>
            <span className="mx-1.5 text-foreground/35">|</span>
            <span className={lang === "EN" ? "font-semibold text-foreground" : "text-foreground/35"}>EN</span>
          </button>
          <a
            href="https://www.instagram.com/villasevilla"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground/75 transition-colors hover:text-foreground"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/97 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Menüyü kapat"
          className="absolute right-6 top-5 inline-flex h-10 w-10 items-center justify-center"
        >
          <X className="h-5 w-5" />
        </button>
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-brand text-foreground/75 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleLang}
            className="mt-4 text-xs uppercase tracking-brand text-foreground/75 transition-colors hover:text-foreground"
          >
            <span className={lang === "TR" ? "font-semibold text-foreground" : "text-foreground/35"}>TR</span>
            <span className="mx-1.5 text-foreground/35">|</span>
            <span className={lang === "EN" ? "font-semibold text-foreground" : "text-foreground/35"}>EN</span>
          </button>
          <a
            href="https://www.instagram.com/villasevilla"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground/75 transition-colors hover:text-foreground"
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
