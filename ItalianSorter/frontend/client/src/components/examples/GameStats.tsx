import GameStats from '../GameStats';

export default function GameStatsExample() {
  return (
    <div className="p-6 bg-background">
      <GameStats
        time={45}
        operations={12}
        isSorted={false}
      />
    </div>
  );
}
