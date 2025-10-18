import { Card } from "@/components/ui/card";
import { Clock, Calculator, TrendingUp } from "lucide-react";

interface GameStatsProps {
  time: number;
  operations: number;
  isSorted: boolean;
}

export default function GameStats({ time, operations, isSorted }: GameStatsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tempo</p>
            <p className="text-2xl font-bold" data-testid="text-time">
              {formatTime(time)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-chart-3/10">
            <Calculator className="w-5 h-5 text-chart-3" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Operazioni</p>
            <p className="text-2xl font-bold" data-testid="text-operations">
              {operations}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isSorted ? 'bg-chart-2/10' : 'bg-muted'}`}>
            <TrendingUp className={`w-5 h-5 ${isSorted ? 'text-chart-2' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stato</p>
            <p className="text-lg font-semibold" data-testid="text-status">
              {isSorted ? 'Completato!' : 'In corso...'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
