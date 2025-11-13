
import React from 'react';
import { type TimeLeft } from '../types';

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
  fullscreen?: boolean;
}

const TimeCard: React.FC<{ value: number; label: string; fullscreen?: boolean }> = ({ value, label, fullscreen = false }) => {
  const formattedValue = String(value).padStart(2, '0');
  const key = `${label}-${value}`;

  const containerClasses = fullscreen ? 'w-28 h-32 md:w-48 md:h-56' : 'w-16 h-16';
  const valueClasses = fullscreen ? 'text-6xl md:text-8xl' : 'text-3xl';
  const labelClasses = fullscreen ? 'text-lg md:text-2xl' : 'text-xs';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`flex items-center justify-center bg-secondary/80 rounded-lg backdrop-blur-sm shadow-lg ${containerClasses}`}>
        <span key={key} className={`font-mono font-bold text-primary animate-flip ${valueClasses}`}>
          {formattedValue}
        </span>
      </div>
      <span className={`mt-2 uppercase tracking-widest text-muted-foreground ${labelClasses}`}>{label}</span>
    </div>
  );
};

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ timeLeft, fullscreen }) => {
  const timeUnits = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4">
      {timeUnits.map(unit => (
        <TimeCard key={unit.label} value={unit.value} label={unit.label} fullscreen={fullscreen} />
      ))}
    </div>
  );
};
   