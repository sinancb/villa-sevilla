import { Phone } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

const PHONE = "05421124801";
const WHATSAPP = "16478625496";

const SiteFooter = () => {
  const { lang } = useLang();

  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="container flex flex-col md:flex-row items-start justify-between gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Villa <span className="text-primary">Sevilla</span>
          </span>
          <span className="text-xs text-muted-foreground">{t.footer.tagline[lang]}</span>
          <span className="mt-1 text-xs text-muted-foreground">Ölüdeniz, Fethiye, Türkiye</span>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-brand text-muted-foreground">
            {lang === "TR" ? "İletişim" : "Contact"}
          </p>
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {PHONE}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 32 32" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
              <path d="M16.003 3.2C9.373 3.2 3.999 8.573 3.999 15.2c0 2.091.545 4.05 1.497 5.749L3.2 28.8l8.085-2.12a12.7 12.7 0 0 0 4.718.907c6.628 0 12.001-5.373 12.001-12 0-6.628-5.373-12-12.001-12zm5.698 16.094c-.312-.157-1.847-.912-2.133-1.015-.287-.105-.495-.157-.703.157-.208.314-.805 1.014-.987 1.223-.182.208-.363.234-.675.079-.312-.158-1.318-.485-2.51-1.547-.928-.827-1.554-1.848-1.736-2.16-.182-.313-.019-.482.136-.638.14-.138.312-.363.468-.545.156-.181.208-.312.312-.52.104-.208.052-.39-.027-.545-.079-.156-.703-1.695-.963-2.32-.252-.607-.51-.525-.703-.535l-.599-.01a1.149 1.149 0 0 0-.833.39c-.286.314-1.09 1.066-1.09 2.6 0 1.534 1.116 3.016 1.272 3.224.156.209 2.197 3.355 5.323 4.706.744.32 1.325.512 1.776.655.747.237 1.428.204 1.966.124.599-.09 1.847-.756 2.107-1.486.26-.73.26-1.354.182-1.486-.079-.131-.287-.209-.599-.365z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="https://www.airbnb.com/rooms/1415310273857886730?guests=1&adults=1&s=67&unique_share_id=2bce3397-f119-4bb1-b01a-454dec8a7d8c"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-foreground"
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3c-1.2 0-2.1.9-2.1 2.1 0 1.6 2.1 4.6 2.1 4.6s2.1-3 2.1-4.6C14.1 3.9 13.2 3 12 3zm0 3.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM4.5 10.5c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l1.6 1.1c-.8.7-1.9 1.1-3.1 1.1C2.7 18 1 16.3 1 14.2c0-2.2 1.6-3.9 3.5-3.9 1.1 0 2.1.4 2.8 1.1l-1.5 1c-.4-.5-1-.9-1.8-.9zM19.5 10.5c-.8 0-1.4.4-1.9.9l-1.5-1c.7-.7 1.7-1.1 2.8-1.1 2 0 3.6 1.7 3.6 3.9 0 2.1-1.6 3.8-3.6 3.8-1.2 0-2.3-.4-3.1-1.1l1.6-1.1c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-2.1-2.9-2.1zM9.2 16.7L12 18.5l2.8-1.8.9 1.4C14.4 19.3 13.2 20 12 20s-2.4-.7-3.7-1.9l.9-1.4z"/>
            </svg>
            Airbnb
          </a>
        </div>

        {/* Copyright + certificate */}
        <div className="flex flex-col gap-1.5 md:items-end md:text-right">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Villa Sevilla. {t.footer.rights[lang]}
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            {lang === "TR"
              ? "T.C. Kültür ve Turizm Bakanlığı Belgeli"
              : "Ministry of Culture & Tourism Certified"}
          </p>
          <p className="text-[10px] text-muted-foreground/60">Belge No: 48-10917</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
