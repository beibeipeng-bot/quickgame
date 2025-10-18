import { useEffect, useState } from "react";

interface CountdownScreenProps {
  onCountdownComplete: () => void;
}

export default function CountdownScreen({ onCountdownComplete }: CountdownScreenProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onCountdownComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onCountdownComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <h2 className="text-4xl font-display font-bold text-foreground">
          Pronto? Via!
        </h2>
        <div 
          className="text-9xl font-display font-bold text-primary animate-pulse"
          data-testid="text-countdown"
        >
          {count}
        </div>
      </div>
    </div>
  );
}
