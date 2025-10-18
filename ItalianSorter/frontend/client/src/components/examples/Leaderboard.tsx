import Leaderboard from '../Leaderboard';

export default function LeaderboardExample() {
  const mockPlayers = [
    { name: 'Giulia', operations: 25, time: 45 },
    { name: 'Marco', operations: 28, time: 52 },
    { name: 'Sofia', operations: 25, time: 48 },
    { name: 'Luca', operations: 30, time: 55 },
    { name: 'Francesca', operations: 32, time: 60 },
    { name: 'Alessandro', operations: 29, time: 50 },
  ];

  return (
    <Leaderboard
      players={mockPlayers}
      currentPlayerName="Marco"
    />
  );
}
