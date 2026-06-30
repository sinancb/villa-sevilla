import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

// Turkey = UTC+3. Day = 07:00–20:00 TST.
function getTurkeyDecimal() {
  const now = new Date();
  return (now.getUTCHours() + 3 + now.getUTCMinutes() / 60) % 24;
}
interface SunProps { x: number; y: number; progress: number; isGolden: boolean; }
function calcSun(): SunProps | null {
  const d = getTurkeyDecimal();
  if (d < 7 || d >= 20) return null;
  const progress = (d - 7) / 13;
  const arc = 1 - 4 * (progress - 0.5) ** 2;
  return { x: 8 + progress * 84, y: 80 - arc * 70, progress, isGolden: progress < 0.12 || progress > 0.88 };
}

// Night assets
const STARS = [
  { top: 7,  left: 8,  o: 0.55, r: 1.5 }, { top: 13, left: 22, o: 0.35, r: 1.0 },
  { top: 5,  left: 38, o: 0.60, r: 1.2 }, { top: 9,  left: 55, o: 0.40, r: 0.8 },
  { top: 14, left: 68, o: 0.50, r: 1.3 }, { top: 6,  left: 82, o: 0.40, r: 1.0 },
  { top: 18, left: 91, o: 0.45, r: 1.5 }, { top: 22, left: 5,  o: 0.32, r: 1.0 },
  { top: 20, left: 47, o: 0.38, r: 1.1 }, { top: 16, left: 75, o: 0.42, r: 0.9 },
  { top: 3,  left: 60, o: 0.50, r: 1.4 }, { top: 4,  left: 72, o: 0.48, r: 1.1 },
  { top: 11, left: 15, o: 0.38, r: 0.7 }, { top: 30, left: 93, o: 0.22, r: 0.8 },
];
const NIGHT_ARCS = [800, 640, 490, 360, 250, 160];

const Hero = () => {
  const { lang } = useLang();
  const [sun, setSun] = useState<SunProps | null>(calcSun);
  useEffect(() => {
    const id = setInterval(() => setSun(calcSun()), 60_000);
    return () => clearInterval(id);
  }, []);

  const isDay = sun !== null;

  const dayBg = sun?.isGolden
    ? "linear-gradient(to bottom, #1a0500 0%, #7c2200 10%, #c44a00 22%, #e88020 32%, #5bbad4 50%, #00acc1 62%, #0097a7 75%, #006064 89%, #e8d09a 100%)"
    : "linear-gradient(to bottom, #0a3060 0%, #1565c0 18%, #1e88e5 34%, #29b6d8 48%, #00acc1 58%, #0097a7 72%, #006064 88%, #e8d09a 100%)";
  const nightBg = "linear-gradient(to bottom, #050e1b 0%, #091a2d 35%, #0d2340 65%, #0f2b4a 100%)";

  const sunDisc   = sun?.isGolden ? "radial-gradient(circle,#fff3d0 0%,#ff8c20 55%,#e05000 100%)" : "radial-gradient(circle,#fffde7 0%,#fdd835 55%,#f9a825 100%)";
  const sunGlow   = sun?.isGolden ? "0 0 50px rgba(255,110,0,0.85),0 0 110px rgba(255,70,0,0.45)" : "0 0 45px rgba(253,216,53,0.75),0 0 100px rgba(253,216,53,0.38)";
  const glowColor = sun?.isGolden ? "radial-gradient(circle,rgba(255,160,40,0.38) 0%,rgba(255,100,0,0.18) 40%,transparent 70%)" : "radial-gradient(circle,rgba(255,248,160,0.35) 0%,rgba(255,220,60,0.16) 40%,transparent 70%)";

  // Island colours
  const seaFar  = isDay ? (sun?.isGolden ? "rgba(140,80,40,0.35)"  : "rgba(0,150,185,0.28)") : "rgba(0,60,90,0.55)";
  const seaNear = isDay ? (sun?.isGolden ? "rgba(120,60,20,0.50)"  : "rgba(0,130,165,0.42)") : "rgba(0,45,72,0.72)";
  const islandFar  = isDay ? (sun?.isGolden ? "rgba(10,5,2,0.55)"  : "rgba(15,68,35,0.72)") : "rgba(5,20,10,0.88)";
  const islandNear = isDay ? (sun?.isGolden ? "rgba(5,2,1,0.72)"   : "rgba(10,50,25,0.85)") : "rgba(3,12,6,0.95)";
  const beachCol   = isDay ? (sun?.isGolden ? "rgba(200,140,60,0.35)" : "rgba(220,195,140,0.28)") : "rgba(30,55,80,0.40)";

  // Night mode → white & bold; Day → white but lighter
  const brandA   = "text-white font-light";
  const brandB   = isDay ? "italic font-light text-white" : "italic font-semibold text-amber-300";
  const h1Style  = isDay ? "text-white/80 font-medium" : "text-white font-bold";
  const tagStyle = isDay ? "text-white/80" : "text-white/90 font-medium";
  const locColor = isDay ? "text-white/90 font-medium" : "text-amber-300/80 font-medium";
  const locLine  = isDay ? "bg-white/50" : "bg-amber-400/45";
  const divColor = isDay ? "via-white/40" : "via-amber-400/35";
  const certBg   = isDay ? "bg-white/15 border-white/35" : "bg-amber-400/12 border-amber-400/35";
  const certTxt  = isDay ? "text-white font-semibold" : "text-amber-300 font-semibold";
  const certSub  = isDay ? "text-white/75" : "text-amber-400/70";
  const certIcon = isDay ? "text-white" : "text-amber-400";

  return (
    <section
      className="relative flex min-h-[62vh] items-center justify-center overflow-hidden sm:min-h-[78vh]"
      style={{ background: isDay ? dayBg : nightBg }}
    >
      {/* ── DAY ───────────────────────────────────── */}
      {isDay && sun && (
        <>
          <div className="pointer-events-none absolute" style={{ left:`${sun.x}%`, top:`${sun.y}%`, transform:"translate(-50%,-50%)", width:420, height:420, background:glowColor }} />
          <div className="pointer-events-none absolute transition-all duration-[60000ms] ease-linear" style={{ left:`${sun.x}%`, top:`${sun.y}%`, transform:"translate(-50%,-50%)", width:62, height:62, borderRadius:"50%", background:sunDisc, boxShadow:sunGlow }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#1565c0]/20 to-transparent" />
        </>
      )}

      {/* ── NIGHT ─────────────────────────────────── */}
      {!isDay && (
        <>
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width:1000, height:450, background:"radial-gradient(ellipse at center bottom,rgba(251,191,36,0.13) 0%,rgba(234,120,0,0.06) 45%,transparent 72%)" }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-teal-900/20 to-transparent" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {STARS.map(({ top, left, o, r }, i) => <circle key={i} cx={`${left}%`} cy={`${top}%`} r={r} fill="white" opacity={o} />)}
            {[{ x:"8%", y:"7%" },{ x:"82%", y:"6%" },{ x:"55%", y:"9%" }].map(({ x, y }, i) => (
              <g key={i} opacity={0.35}>
                <line x1={x} y1={`calc(${y} - 4px)`} x2={x} y2={`calc(${y} + 4px)`} stroke="white" strokeWidth="0.8" />
                <line x1={`calc(${x} - 4px)`} y1={y} x2={`calc(${x} + 4px)`} y2={y} stroke="white" strokeWidth="0.8" />
              </g>
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-x-0" style={{ bottom:"28%" }}>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300/18 to-transparent" />
            <div className="h-14 bg-gradient-to-b from-amber-400/5 to-transparent" />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-0 w-0">
            {NIGHT_ARCS.map((sz, i) => (
              <div key={sz} className="absolute bottom-0" style={{ width:sz, height:sz/2, marginLeft:-(sz/2), borderRadius:`${sz/2}px ${sz/2}px 0 0`, border:"1px solid", borderColor:`rgba(251,191,36,${0.04+i*0.022})`, borderBottom:"none" }} />
            ))}
          </div>
        </>
      )}

      {/* ── ÖLÜDENIZ ISLAND IN THE SEA ─────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full" style={{ height: 290, display:"block" }} aria-hidden="true">
          <defs>
            <linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={seaFar} />
              <stop offset="100%" stopColor={seaNear} />
            </linearGradient>
          </defs>

          {/* Sea surface */}
          <path d="M0,320 L0,155 C240,145 480,158 720,150 C960,142 1200,155 1440,148 L1440,320 Z" fill="url(#seaG)" />

          {/* Distant land / coastline across the bay */}
          <path d="M0,160 L0,138 C150,125 330,138 500,126 C660,114 820,128 980,118 C1120,110 1300,122 1440,116 L1440,160 Z" fill={islandFar} opacity="0.45" />

          {/* Far range of the headland (wider, softer) */}
          <path d="M420,320 C422,302 430,278 444,255 C462,224 490,198 522,178 C550,160 582,150 616,148 C652,145 686,152 716,168 C750,186 774,215 786,248 C796,275 798,302 798,320 Z" fill={islandFar} />

          {/* Main Ölüdeniz headland — prominent peak */}
          <path d="M460,320 C462,298 474,268 494,240 C518,206 552,178 590,162 C616,150 644,146 672,148 C702,151 730,163 752,186 C776,212 788,248 790,285 C790,300 790,320 790,320 Z" fill={islandNear} />

          {/* Curved beach on the left (Ölüdeniz lagoon side) */}
          <path d="M0,320 C100,317 200,312 300,306 C380,301 440,298 490,302 C520,305 545,312 560,320 Z" fill={beachCol} />

          {/* Glimmer / sea shimmer line */}
          <path d="M0,155 C240,148 480,158 720,150 C960,142 1200,155 1440,148" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background/65" />

      {/* ── CONTENT ───────────────────────────────── */}
      <div className="relative z-10 container flex flex-col items-center px-6 py-8 text-center sm:py-12">

        {/* Location */}
        <div className="mb-6 flex items-center gap-3 animate-fade-up [animation-delay:0.1s]">
          <div className={`h-px w-12 ${locLine}`} />
          <p className={`text-[10px] uppercase tracking-[0.42em] ${locColor}`}>Ölüdeniz · Fethiye</p>
          <div className={`h-px w-12 ${locLine}`} />
        </div>

        {/* Brand */}
        <div className="mb-4 animate-fade-up [animation-delay:0.2s] leading-[1.05]">
          <p className={`text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl ${brandA}`}>Villa</p>
          <p className={`text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl ${brandB}`}>Sevilla</p>
        </div>

        {/* SEO H1 */}
        <h1 className={`mb-4 text-xs uppercase tracking-[0.18em] animate-fade-up [animation-delay:0.28s] sm:text-sm ${h1Style}`}>
          {lang === "TR" ? "Sahibinden Kiralık Ölüdeniz'de Villa" : "Private Villa for Rent in Ölüdeniz"}
        </h1>

        {/* Divider */}
        <div className={`mb-5 h-px w-16 animate-fade-up [animation-delay:0.32s] bg-gradient-to-r from-transparent ${divColor} to-transparent`} />

        {/* Tagline */}
        <p className={`mb-8 max-w-xs text-sm leading-relaxed animate-fade-up [animation-delay:0.36s] md:text-base ${tagStyle}`}>
          {t.hero.tagline[lang]}
        </p>

        {/* CTAs */}
        <div className="mb-8 flex flex-col items-center gap-4 animate-fade-up [animation-delay:0.45s] sm:flex-row">
          <a href="#gallery" className={`inline-flex h-11 items-center justify-center rounded-md px-9 text-xs font-bold uppercase tracking-widest transition-all hover:opacity-90 ${isDay ? "bg-white text-[#0a3060] shadow-[0_0_24px_rgba(255,255,255,0.3)]" : "bg-amber-400 text-[#050e1b] shadow-[0_0_24px_rgba(251,191,36,0.25)]"}`}>
            {lang === "TR" ? "Villayi Gör" : "View Villa"}
          </a>
          <a href="#availability" className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 px-9 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-white/60 hover:text-white">
            {lang === "TR" ? "Müsaitlik Takvimi" : "Check Availability"}
          </a>
        </div>

        {/* Tourism cert badge */}
        <div className={`flex items-center gap-3 rounded-full border px-5 py-2.5 animate-fade-up [animation-delay:0.55s] ${certBg}`}>
          <svg className={`h-4 w-4 shrink-0 ${certIcon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div className="text-left leading-tight">
            <p className={`text-xs ${certTxt}`}>{lang === "TR" ? "T.C. Kültür ve Turizm Bakanlığı Belgeli" : "Ministry of Culture & Tourism Certified"}</p>
            <p className={`text-[11px] ${certSub}`}>Belge No: 48-10917</p>
          </div>
        </div>

      </div>

      {/* Scroll cue — clicks to gallery */}
      <a href="#gallery" aria-label="Galeriye git" className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce text-white/60 transition-colors hover:text-white">
        <ChevronDown className="h-7 w-7" strokeWidth={2} />
      </a>
    </section>
  );
};

export default Hero;
