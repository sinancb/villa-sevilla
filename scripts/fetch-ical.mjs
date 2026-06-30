import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ICAL_URL =
  "https://www.airbnb.com/calendar/ical/1415310273857886730.ics?t=508030549f874185ab94798b5881ab6a";

function toIsoDate(raw) {
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

const res = await fetch(ICAL_URL);
if (!res.ok) throw new Error(`Failed to fetch iCal: ${res.status}`);
const text = await res.text();

const blockedRanges = [];
for (const block of text.split("BEGIN:VEVENT").slice(1)) {
  const s = block.match(/DTSTART[^:]*:(\d{8})/);
  const e = block.match(/DTEND[^:]*:(\d{8})/);
  if (s && e) {
    blockedRanges.push({ start: toIsoDate(s[1]), end: toIsoDate(e[1]) });
  }
}

const out = { updated: new Date().toISOString(), blockedRanges };
const dest = resolve(__dirname, "../public/availability.json");
writeFileSync(dest, JSON.stringify(out, null, 2));
console.log(`✓ Wrote ${blockedRanges.length} blocked ranges → public/availability.json`);
