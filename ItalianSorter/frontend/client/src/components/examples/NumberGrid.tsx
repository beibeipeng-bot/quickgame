import { useState } from 'react';
import NumberGrid from '../NumberGrid';

export default function NumberGridExample() {
  const [selectedPivot, setSelectedPivot] = useState<number | null>(null);
  const numbers = [45, 23, 67, 12, 89, 34, 56, 78, 90, 11, 33, 55, 77, 22, 44, 66, 88, 99, 15, 27];

  return (
    <div className="p-6 bg-background">
      <NumberGrid
        numbers={numbers}
        selectedPivot={selectedPivot}
        onNumberClick={(index) => {
          console.log('Clicked number:', numbers[index], 'at index:', index);
          setSelectedPivot(index);
        }}
        disabled={false}
      />
    </div>
  );
}
