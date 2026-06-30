import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

const placeholders = [
  { key: "exterior",  gradient: "from-stone-300 to-amber-200",    aspect: "aspect-[4/3]" },
  { key: "pool",      gradient: "from-cyan-400 to-blue-500",      aspect: "aspect-square" },
  { key: "living",    gradient: "from-stone-200 to-slate-300",    aspect: "aspect-[4/3]" },
  { key: "seaview",   gradient: "from-sky-300 to-blue-700",       aspect: "aspect-[16/9]",  wide: true },
  { key: "master",    gradient: "from-rose-100 to-stone-200",     aspect: "aspect-[4/3]" },
  { key: "terrace",   gradient: "from-green-200 to-teal-300",     aspect: "aspect-square" },
  { key: "kitchen",   gradient: "from-amber-100 to-stone-200",    aspect: "aspect-[4/3]" },
  { key: "bedroom2",  gradient: "from-slate-200 to-stone-300",    aspect: "aspect-square" },
  { key: "bathroom",  gradient: "from-teal-100 to-cyan-200",      aspect: "aspect-[4/3]" },
] as const;

const Gallery = () => {
  const { lang } = useLang();
  const captions = t.gallery.captions;

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-brand text-muted-foreground mb-3">
            {t.gallery.title[lang]}
          </p>
          <h2 className="section-title">{t.gallery.subtitle[lang]}</h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {placeholders.map(({ key, gradient, aspect }) => (
            <div key={key} className="break-inside-avoid">
              <div
                className={`relative w-full ${aspect} rounded-md overflow-hidden bg-gradient-to-br ${gradient} group`}
              >
                {/* Placeholder label — remove once real photos are added */}
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs uppercase tracking-brand text-white">
                    {captions[key][lang]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
