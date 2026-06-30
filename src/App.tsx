import { LangProvider } from "@/hooks/useLang";
import Index from "@/pages/Index";

const App = () => (
  <LangProvider>
    <Index />
  </LangProvider>
);

export default App;
