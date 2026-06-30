import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";

interface Availability {
  updated: string;
  blockedRanges: { start: string; end: string }[];
}

const MONTH_NAMES_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];
const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS_TR = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
const DAY_LABELS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function toYMD(d: Date) {
  return d.toISOString().slice(0, 10);
}

function isBlocked(dateStr: string, ranges: Availability["blockedRanges"]) {
  return ranges.some((r) => dateStr >= r.start && dateStr < r.end);
}

function MonthGrid({
  year,
  month,
  ranges,
  lang,
}: {
  year: number;
  month: number;
  ranges: Availability["blockedRanges"];
  lang: "TR" | "EN";
}) {
  const names = lang === "TR" ? MONTH_NAMES_TR : MONTH_NAMES_EN;
  const dayLabels = lang === "TR" ? DAY_LABELS_TR : DAY_LABELS_EN;

  const firstDay = new Date(year, month, 1);
  // Week starts Monday: 0=Mon … 6=Sun
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = toYMD(new Date());

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-center text-sm font-semibold text-foreground mb-4">
        {names[month]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-px">
        {dayLabels.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-muted-foreground pb-2">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`e-${i}`} />;
          }
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const blocked = isBlocked(dateStr, ranges);
          const isToday = dateStr === today;
          const isPast = dateStr < today;

          let cls =
            "relative flex items-center justify-center h-8 w-full rounded text-xs select-none ";

          if (isPast) {
            cls += "text-muted-foreground/40 cursor-default";
          } else if (blocked) {
            cls += "bg-red-100 text-red-400 line-through cursor-not-allowed";
          } else {
            cls += "bg-emerald-50 text-emerald-700 font-medium";
          }

          if (isToday) {
            cls += " ring-2 ring-primary ring-offset-1";
          }

          return (
            <div key={dateStr} className={cls}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const AvailabilityCalendar = () => {
  const { lang } = useLang();
  const [avail, setAvail] = useState<Availability | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch("/availability.json")
      .then((r) => r.json())
      .then(setAvail)
      .catch(() => {});
  }, []);

  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const m1 = { year: base.getFullYear(), month: base.getMonth() };
  const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
  const m2 = { year: next.getFullYear(), month: next.getMonth() };

  const ranges = avail?.blockedRanges ?? [];

  const updatedStr = avail?.updated
    ? new Date(avail.updated).toLocaleDateString(lang === "TR" ? "tr-TR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section id="availability" className="py-24 bg-stone-50">
      <div className="container">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-brand text-muted-foreground mb-3">
            {lang === "TR" ? "Müsaitlik" : "Availability"}
          </p>
          <h2 className="section-title">
            {lang === "TR" ? "Rezervasyon Takvimi" : "Booking Calendar"}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            {lang === "TR"
              ? "Yeşil günler müsait, kırmızı günler dolu veya bloke edilmiş tarihlerdir."
              : "Green dates are available, red dates are booked or blocked."}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-200" />
            <span className="text-xs text-muted-foreground">
              {lang === "TR" ? "Müsait" : "Available"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-100" />
            <span className="text-xs text-muted-foreground">
              {lang === "TR" ? "Dolu" : "Booked"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded ring-2 ring-primary" />
            <span className="text-xs text-muted-foreground">
              {lang === "TR" ? "Bugün" : "Today"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setOffset((o) => o - 1)}
            disabled={offset <= 0}
            className="p-2 rounded-md hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label={lang === "TR" ? "Önceki ay" : "Previous month"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOffset((o) => o + 1)}
            className="p-2 rounded-md hover:bg-stone-200 transition-colors"
            aria-label={lang === "TR" ? "Sonraki ay" : "Next month"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar grid — 2 months */}
        <div className="flex flex-col sm:flex-row gap-10">
          <MonthGrid {...m1} ranges={ranges} lang={lang} />
          <div className="hidden sm:block w-px bg-border" />
          <MonthGrid {...m2} ranges={ranges} lang={lang} />
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {updatedStr && (
            <p className="text-xs text-muted-foreground">
              {lang === "TR" ? `Son güncelleme: ${updatedStr}` : `Last updated: ${updatedStr}`}
            </p>
          )}
          <a
            href="https://wa.me/16478625496"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white tracking-wide transition-opacity hover:opacity-90 w-fit"
          >
            {lang === "TR" ? "WhatsApp'tan Rezervasyon" : "Book via WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityCalendar;
