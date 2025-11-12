import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { type CountdownEvent, type ThemeKey } from '../types';
import { useCountdown } from '../hooks/useCountdown';
import { CountdownDisplay } from '../components/CountdownDisplay';

const CountdownPage = () => {
  const { id } = useParams<{ id: string }>();
  const [events] = useLocalStorage<CountdownEvent[]>('countdownEvents', []);
  const navigate = useNavigate();

  const event = useMemo(() => events.find(e => e.id === id), [events, id]);
  const timeLeft = useCountdown(event?.targetDate || '');

  useEffect(() => {
    if (!event) {
      // Se o evento não for encontrado após um pequeno atraso, redirecione.
      const timer = setTimeout(() => navigate('/404'), 100);
      return () => clearTimeout(timer);
    }
  }, [event, navigate]);

  if (!event) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
  }

  const theme = event.theme || 'default';
  const themeGradients: Record<ThemeKey, string> = {
    default: 'to-[#1e1b4b]',
    sky: 'to-sky-900/60',
    mint: 'to-emerald-900/60',
    rose: 'to-rose-900/60',
    amber: 'to-amber-900/60',
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-background ${themeGradients[theme]}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{backgroundSize: '4rem 4rem'}}></div>
        <main className="z-10 flex flex-col items-center justify-center text-center w-full animate-fade-in">
            <span className="text-7xl md:text-8xl mb-6">{event.emoji}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-12 max-w-4xl">{event.title}</h1>
            <CountdownDisplay timeLeft={timeLeft} fullscreen />
        </main>
        <Link
            to="/"
            className="z-10 absolute top-6 left-6 px-4 py-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-full text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Voltar para a página inicial"
        >
            &larr; Voltar
        </Link>
    </div>
  );
};

export default CountdownPage;
