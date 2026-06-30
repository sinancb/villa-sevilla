import { createContext, useContext, useState } from "react";
import type { Lang } from "@/lib/i18n";

type LangCtx = { lang: Lang; toggleLang: () => void };

const LangContext = createContext<LangCtx>({ lang: "TR", toggleLang: () => {} });

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("TR");
  const toggleLang = () => setLang((l) => (l === "TR" ? "EN" : "TR"));
  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
