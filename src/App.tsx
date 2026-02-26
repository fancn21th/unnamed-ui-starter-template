import { Sparkles } from "lucide-react";
import { WelcomeMessage } from "@/components/wuhan/composed/welcome";

function App() {
  return (
    <div className="p-4">
      <WelcomeMessage
        icon={<Sparkles className="w-6 h-6" />}
        text="Hello Unnamed UI"
      />
    </div>
  );
}
export default App;
