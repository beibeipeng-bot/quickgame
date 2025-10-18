import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface WelcomeScreenProps {
  onStart: (playerName: string) => void;
  errorMessage?: string;
}

export default function WelcomeScreen({ onStart, errorMessage }: WelcomeScreenProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Benvenuto al nostro gioco
            </h1>
            <p className="text-muted-foreground">
              Inserisci il tuo nome per iniziare
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-lg"
                data-testid="input-name"
                autoFocus
              />
              {errorMessage && (
                <p className="text-sm text-destructive text-center" data-testid="text-error">
                  {errorMessage}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!name.trim()}
              data-testid="button-start"
            >
              Inizia il gioco
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
