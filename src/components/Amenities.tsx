import {
  BedDouble,
  Bath,
  Users,
  Waves,
  Eye,
  Wind,
  Wifi,
  UtensilsCrossed,
  Flame,
  Car,

} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

const amenities = [
  { key: "bedrooms",  Icon: BedDouble },
  { key: "bathrooms", Icon: Bath },
  { key: "guests",    Icon: Users },
  { key: "pool",      Icon: Waves },
  { key: "seaview",   Icon: Eye },
  { key: "ac",        Icon: Wind },
  { key: "wifi",      Icon: Wifi },
  { key: "kitchen",   Icon: UtensilsCrossed },
  { key: "bbq",       Icon: Flame },
  { key: "parking",   Icon: Car },
] as const;

const Amenities = () => {
  const { lang } = useLang();
  const items = t.amenities.items;

  return (
    <section id="amenities" className="py-24 bg-secondary/40">
      <div className="container">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-brand text-muted-foreground mb-3">
            {t.amenities.title[lang]}
          </p>
          <h2 className="section-title">{t.amenities.subtitle[lang]}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-foreground leading-snug">
                {items[key][lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
