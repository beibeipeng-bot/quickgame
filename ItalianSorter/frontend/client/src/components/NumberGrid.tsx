import { Card } from "@/components/ui/card";

interface NumberGridProps {
  numbers: number[];
  selectedPivot: number | null;
  onNumberClick: (index: number) => void;
  disabled: boolean;
}

export default function NumberGrid({ 
  numbers, 
  selectedPivot, 
  onNumberClick, 
  disabled 
}: NumberGridProps) {
  const isSorted = () => {
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] > numbers[i + 1]) return false;
    }
    return true;
  };

  const sorted = isSorted();

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
      {numbers.map((num, index) => {
        const isPivot = selectedPivot === index;
        
        return (
          <Card
            key={index}
            className={`
              aspect-square flex items-center justify-center text-2xl font-bold 
              transition-all duration-300 cursor-pointer
              ${isPivot 
                ? 'bg-chart-3 text-chart-3-foreground ring-4 ring-chart-3 ring-opacity-50' 
                : sorted 
                  ? 'bg-chart-2/20 text-chart-2 border-chart-2' 
                  : 'hover-elevate active-elevate-2'
              }
              ${disabled ? 'cursor-not-allowed opacity-50' : ''}
            `}
            onClick={() => !disabled && onNumberClick(index)}
            data-testid={`card-number-${index}`}
          >
            {num}
          </Card>
        );
      })}
    </div>
  );
}
