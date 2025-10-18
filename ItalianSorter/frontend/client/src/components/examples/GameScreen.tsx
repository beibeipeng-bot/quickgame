import GameScreen from '../GameScreen';

export default function GameScreenExample() {
  return (
    <GameScreen
      playerName="Mario"
      onGameComplete={(operations, time) => {
        console.log('Game completed!', { operations, time });
      }}
    />
  );
}
