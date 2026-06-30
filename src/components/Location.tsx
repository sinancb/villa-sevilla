import { MapPin } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

const highlights = [
  "lagoon",
  "beach",
  "paraglide",
  "fethiye",
  "dalaman",
] as const;

const Location = () => {
  const { lang } = useLang();
  const loc = t.location;

  return (
    <section id="location" className="py-24 bg-background">
      <div className="container">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-brand text-muted-foreground mb-3">
            {loc.title[lang]}
          </p>
          <h2 className="section-title">{loc.subtitle[lang]}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <div>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              {loc.description[lang]}
            </p>
            <ul className="space-y-3">
              {highlights.map((key) => (
                <li key={key} className="flex items-center gap-3 text-sm text-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                  {loc.highlights[key][lang]}
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-border shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[420px]">
            <iframe
              title="Villa Sevilla — Ölüdeniz, Fethiye"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.0!2d29.1140!3d36.5500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c045c3a7f12f47%3A0x0!2z4oCiT2zDvGRlbml6LCBGZXRoaXllLCBNde287la!5e0!3m2!1str!2str!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
