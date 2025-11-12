import React from 'react';
import { Link } from 'react-router-dom';
import { type CountdownEvent } from '../types';
import { useCountdown } from '../hooks/useCountdown';
import { CountdownDisplay } from './CountdownDisplay';

interface CountdownCardProps {
  event: CountdownEvent;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ event }) => {
  const timeLeft = useCountdown(event.targetDate);
  const theme = event.theme || 'default';
  const themeStyle = { '--current-theme-hsl': `var(--theme-${theme})` } as React.CSSProperties;

  return (
    <Link to={`/countdown/${event.id}`} className="block animate-fade-in" style={themeStyle}>
      <div className="group relative p-6 bg-secondary rounded-lg border border-border transition-all duration-300 transform hover:-translate-y-1 hover:border-[hsl(var(--current-theme-hsl))] hover:shadow-2xl hover:shadow-[hsl(var(--current-theme-hsl)/0.2)]">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-5xl">{event.emoji}</span>
          <h2 className="text-xl font-semibold text-center text-foreground truncate w-full">{event.title}</h2>
          <CountdownDisplay timeLeft={timeLeft} />
        </div>
      </div>
    </Link>
  );
};
