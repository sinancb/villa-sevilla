import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/lib/i18n";

const WHATSAPP_NUMBER = "905XXXXXXXXX"; // replace with actual number

const ContactBook = () => {
  const { lang } = useLang();
  const bk = t.book;
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "",
    message: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `*${bk.name[lang]}:* ${form.name}\n` +
      `*${bk.email[lang]}:* ${form.email}\n` +
      `*${bk.phone[lang]}:* ${form.phone}\n` +
      `*${bk.checkin[lang]}:* ${form.checkin}\n` +
      `*${bk.checkout[lang]}:* ${form.checkout}\n` +
      `*${bk.guests[lang]}:* ${form.guests}\n` +
      `*${bk.message[lang]}:* ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${body}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="book" className="py-24 bg-secondary/40">
      <div className="container">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-brand text-muted-foreground mb-3">
            {bk.title[lang]}
          </p>
          <h2 className="section-title">{bk.subtitle[lang]}</h2>
        </div>

        <div className="max-w-2xl">
          {submitted ? (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-base font-medium text-foreground">{bk.success[lang]}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-brand text-muted-foreground">
                  {bk.name[lang]}
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="h-11 rounded-md border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-brand text-muted-foreground">
                  {bk.email[lang]}
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="h-11 rounded-md border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-brand text-muted-foreground">
                  {bk.phone[lang]}
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  className="h-11 rounded-md border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-brand text-muted-foreground">
                  {bk.guests[lang]}
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={onChange}
                  required
                  className="h-11 rounded-md border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value=""></option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Check-in */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-brand text-muted-foreground">
                  {bk.checkin[lang]}
                </label>
                <input
                  name="checkin"
                  type="date"
                  value={form.checkin}
                  onChange={onChange}
                  required
                  className="h-11 rounded-md border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Check-out */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-brand text-muted-foreground">
                  {bk.checkout[lang]}
                </label>
                <input
                  name="checkout"
                  type="date"
                  value={form.checkout}
                  onChange={onChange}
                  required
                  className="h-11 rounded-md border border-input bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-brand text-muted-foreground">
                  {bk.message[lang]}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  className="rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white tracking-wide transition-opacity hover:opacity-90"
                >
                  {bk.submit[lang]}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-8 text-sm font-medium text-foreground tracking-wide transition-colors hover:bg-secondary"
                >
                  {bk.whatsapp[lang]}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactBook;
