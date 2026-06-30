import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const photos = [
  { src: "/photos/exterior-front.avif",   captionTR: "Villa Ön Cephesi",     captionEN: "Villa Exterior" },
  { src: "/photos/exterior-aerial.avif",  captionTR: "Havadan Görünüm",      captionEN: "Aerial View" },
  { src: "/photos/hero-pool.avif",        captionTR: "Özel Yüzme Havuzu",    captionEN: "Private Pool" },
  { src: "/photos/terrace-dining.avif",   captionTR: "Teras & Havuz",        captionEN: "Terrace & Pool" },
  { src: "/photos/terrace-bbq.avif",      captionTR: "Barbekü Terası",       captionEN: "BBQ Terrace" },
  { src: "/photos/living-wide.avif",      captionTR: "Oturma Odası",         captionEN: "Living Room" },
  { src: "/photos/living-lounge.avif",    captionTR: "Salon",                captionEN: "Lounge" },
  { src: "/photos/kitchen-dining.avif",   captionTR: "Mutfak & Yemek Odası", captionEN: "Kitchen & Dining" },
  { src: "/photos/bedroom-master.avif",   captionTR: "Ana Yatak Odası",      captionEN: "Master Bedroom" },
  { src: "/photos/bedroom-second.avif",   captionTR: "Yatak Odası 2",        captionEN: "Bedroom 2" },
  { src: "/photos/bedroom-twin.avif",     captionTR: "İkiz Yatak Odası",     captionEN: "Twin Bedroom" },
  { src: "/photos/wardrobe.avif",         captionTR: "Giyinme Odası",        captionEN: "Walk-in Wardrobe" },
  { src: "/photos/sauna-jacuzzi.avif",    captionTR: "Sauna & Jakuzi",       captionEN: "Sauna & Jacuzzi" },
  { src: "/photos/bathroom-marble.avif",  captionTR: "Mermer Banyo",         captionEN: "Marble Bathroom" },
  { src: "/photos/exterior-topdown.avif", captionTR: "Villa & Havuz",        captionEN: "Villa & Pool" },
];

const Gallery = () => {
  const { lang } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, prev, next, close]);

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>
      <section id="gallery" className="pt-14 pb-24 bg-background">
        <div className="container">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-brand text-muted-foreground mb-3">
              {lang === "TR" ? "Galeri" : "Gallery"}
            </p>
            <h2 className="section-title">
              {lang === "TR" ? "Villa Sevilla'yı Keşfedin" : "Explore Villa Sevilla"}
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map(({ src, captionTR, captionEN }, index) => (
              <div key={src} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="relative w-full rounded-md overflow-hidden group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={lang === "TR" ? captionTR : captionEN}
                >
                  <img
                    src={src}
                    alt={lang === "TR" ? captionTR : captionEN}
                    className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs uppercase tracking-brand text-white">
                      {lang === "TR" ? captionTR : captionEN}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-up [animation-duration:150ms]"
          onClick={close}
        >
          {/* Image container — stop propagation so clicks on image don't close */}
          <div
            className="relative max-w-5xl w-full mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={current.src}
              src={current.src}
              alt={lang === "TR" ? current.captionTR : current.captionEN}
              className="max-h-[85vh] w-auto max-w-full rounded-md object-contain shadow-2xl"
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 text-center pb-3 pt-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-md">
              <span className="text-xs uppercase tracking-brand text-white/80">
                {lang === "TR" ? current.captionTR : current.captionEN}
              </span>
              <span className="ml-4 text-xs text-white/40">
                {lightboxIndex! + 1} / {photos.length}
              </span>
            </div>
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
            aria-label={lang === "TR" ? "Önceki" : "Previous"}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
            aria-label={lang === "TR" ? "Sonraki" : "Next"}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
            aria-label={lang === "TR" ? "Kapat" : "Close"}
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
