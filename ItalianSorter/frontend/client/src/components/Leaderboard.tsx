import { Card } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";

interface Player {
  name: string;
  operations: number;
  time: number;
}

interface LeaderboardProps {
  players: Player[];
  currentPlayerName?: string;
}

export default function Leaderboard({ players, currentPlayerName }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.operations !== b.operations) {
      return a.operations - b.operations;
    }
    return a.time - b.time;
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-chart-3" />;
    if (rank <= 3) return <Medal className="w-5 h-5 text-chart-3" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-chart-3/10 mb-4">
            <Trophy className="w-8 h-8 text-chart-3" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Classifica
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Classifica basata sul numero di operazioni e, in caso di parità, sul tempo impiegato.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Posizione</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Nome</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Operazioni</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Tempo</th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nessun giocatore ancora. Sii il primo!
                    </td>
                  </tr>
                ) : (
                  sortedPlayers.map((player, index) => {
                    const rank = index + 1;
                    const isTop3 = rank <= 3;
                    const isCurrentPlayer = player.name === currentPlayerName;

                    return (
                      <tr
                        key={index}
                        className={`
                          border-t border-border
                          ${isCurrentPlayer ? 'bg-primary/5 border-primary' : ''}
                          ${isTop3 ? 'bg-destructive/5' : ''}
                        `}
                        data-testid={`row-player-${index}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(rank)}
                            <span
                              className={`font-semibold ${isTop3 ? 'text-destructive' : ''}`}
                              data-testid={`text-rank-${index}`}
                            >
                              #{rank}
                            </span>
                          </div>
                        </td>
                        <td className={`py-3 px-4 ${isTop3 ? 'font-bold text-destructive' : 'font-medium'}`}>
                          {player.name}
                        </td>
                        <td className={`py-3 px-4 text-right ${isTop3 ? 'font-bold text-destructive' : ''}`}>
                          {player.operations}
                        </td>
                        <td className={`py-3 px-4 text-right ${isTop3 ? 'font-bold text-destructive' : ''}`}>
                          {formatTime(player.time)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {sortedPlayers.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Aggiornamento automatico ogni 3 secondi
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
