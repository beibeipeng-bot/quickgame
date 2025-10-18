import CountdownScreen from '../CountdownScreen';

export default function CountdownScreenExample() {
  return (
    <CountdownScreen
      onCountdownComplete={() => console.log('Countdown complete!')}
    />
  );
}
