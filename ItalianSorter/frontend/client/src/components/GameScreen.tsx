import { useState, useEffect } from "react";
import GameStats from "./GameStats";
import NumberGrid from "./NumberGrid";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface GameScreenProps {
  playerName: string;
  onGameComplete: (operations: number, time: number) => void;
}

function generateRandomNumbers(count: number): number[] {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * 100) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}

export default function GameScreen({ playerName, onGameComplete }: GameScreenProps) {
  const [numbers, setNumbers] = useState<number[]>(() => generateRandomNumbers(20));
  const [selectedPivot, setSelectedPivot] = useState<number | null>(null);
  const [operations, setOperations] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  const checkIfSorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  const handleNumberClick = (index: number) => {
    if (isComplete) return;

    const pivot = numbers[index];
    setSelectedPivot(index);

    setTimeout(() => {
      const left: number[] = [];
      const right: number[] = [];
      let comparisons = 0;

      for (let i = 0; i < numbers.length; i++) {
        if (i === index) continue;
        comparisons++;
        if (numbers[i] < pivot) {
          left.push(numbers[i]);
        } else {
          right.push(numbers[i]);
        }
      }

      const newNumbers = [...left, pivot, ...right];
      const swaps = Math.abs(index - left.length);
      const totalOps = comparisons + swaps;

      setNumbers(newNumbers);
      setOperations((prev) => prev + totalOps);
      setSelectedPivot(null);

      if (checkIfSorted(newNumbers)) {
        setIsComplete(true);
        setTimeout(() => {
          onGameComplete(operations + totalOps, time);
        }, 500);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Ciao, {playerName}!
          </h1>
          <p className="text-muted-foreground">
            Seleziona un numero come pivot per ordinare l'array
          </p>
        </div>

        <GameStats
          time={time}
          operations={operations}
          isSorted={isComplete}
        />

        {isComplete && (
          <Card className="p-4 mb-6 bg-chart-2/10 border-chart-2">
            <div className="flex items-center gap-3 text-chart-2">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <p className="font-semibold text-lg">Completato! Ottimo lavoro!</p>
                <p className="text-sm text-chart-2/80">
                  Il tuo risultato sarà salvato nella classifica
                </p>
              </div>
            </div>
          </Card>
        )}

        <NumberGrid
          numbers={numbers}
          selectedPivot={selectedPivot}
          onNumberClick={handleNumberClick}
          disabled={isComplete}
        />
      </div>
    </div>
  );
}
