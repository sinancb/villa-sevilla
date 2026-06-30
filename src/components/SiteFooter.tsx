import { Instagram } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

const SiteFooter = () => {
  const { lang } = useLang();

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Villa <span className="text-primary">Sevilla</span>
          </span>
          <span className="text-xs text-muted-foreground">{t.footer.tagline[lang]}</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/villasevilla"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} Villa Sevilla. {t.footer.rights[lang]}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
