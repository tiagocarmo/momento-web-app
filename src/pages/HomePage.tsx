import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { type CountdownEvent, type ThemeKey } from '../types';
import { CountdownCard } from '../components/CountdownCard';
import { EmptyState } from '../components/EmptyState';

const themeOptions: { key: ThemeKey; name: string; class: string }[] = [
    { key: 'default', name: 'Padrão', class: 'bg-secondary border-border' },
    { key: 'sky', name: 'Céu', class: 'bg-sky-500' },
    { key: 'mint', name: 'Menta', class: 'bg-emerald-400' },
    { key: 'rose', name: 'Rosa', class: 'bg-rose-400' },
    { key: 'amber', name: 'Âmbar', class: 'bg-amber-400' },
];

const emojiOptions = ['🚀', '🎉', '🎂', '✈️', '💼', '🎓', '🏆', '❤️', '🎁', '🏡', '🎮', '💡'];


const CountdownForm: React.FC<{ onSave: (event: Omit<CountdownEvent, 'id' | 'createdAt'>) => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [theme, setTheme] = useState<ThemeKey>('default');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && emoji && targetDate) {
      onSave({ title, emoji, targetDate, theme });
    }
  };
  
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minDateTime = today.toISOString().slice(0, 16);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-secondary border border-border rounded-lg p-8 w-full max-w-md m-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Novo Contador</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Lançamento do Projeto X"
              required
              className="w-full bg-gray-100 text-black border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Emoji</label>
            <div className="grid grid-cols-6 gap-2">
                {emojiOptions.map(option => (
                    <button
                        type="button"
                        key={option}
                        onClick={() => setEmoji(option)}
                        className={`flex items-center justify-center text-2xl p-2 rounded-lg transition-all transform hover:scale-110 focus:outline-none ${emoji === option ? 'bg-primary ring-2 ring-primary' : 'bg-input hover:bg-accent'}`}
                        aria-label={`Selecionar emoji ${option}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
          </div>
          <div>
            <label htmlFor="targetDate" className="block text-sm font-medium text-muted-foreground mb-1">Data e Hora</label>
            <input
              id="targetDate"
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
              min={minDateTime}
              className="w-full bg-gray-100 text-black border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-muted-foreground mb-2">Tema de Cor</label>
             <div className="flex items-center space-x-3">
                {themeOptions.map(option => (
                    <button
                        type="button"
                        key={option.key}
                        onClick={() => setTheme(option.key)}
                        className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 focus:outline-none ${option.class} ${theme === option.key ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''}`}
                        aria-label={`Selecionar tema ${option.name}`}
                    />
                ))}
             </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md hover:bg-accent transition-colors">Cancelar</button>
            <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!title || !emoji || !targetDate}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const HomePage = () => {
  const [events, setEvents] = useLocalStorage<CountdownEvent[]>('countdownEvents', []);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveEvent = (newEventData: Omit<CountdownEvent, 'id' | 'createdAt'>) => {
    const newEvent: CountdownEvent = {
      ...newEventData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a,b) => +new Date(a.targetDate) - +new Date(b.targetDate)));
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-grid-pattern">
      <header className="flex-shrink-0 p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold text-center text-primary">Momento</h1>
        <p className="text-center text-muted-foreground mt-2">Dê vida à sua contagem regressiva.</p>
      </header>
      <main className="flex-grow p-4 sm:p-6 lg:p-8 pt-0 overflow-y-auto">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map(event => (
              <CountdownCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
             <div className="max-w-2xl w-full">
                <EmptyState onAdd={() => setIsFormOpen(true)} />
             </div>
          </div>
        )}
      </main>
      <button
        onClick={() => setIsFormOpen(true)}
        className="group fixed bottom-8 right-8 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center text-3xl font-bold hover:bg-primary/90 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 focus:ring-offset-background"
        aria-label="Adicionar novo contador"
      >
        <span className="transition-transform duration-300 group-hover:rotate-90">+</span>
      </button>

      {isFormOpen && (
        <CountdownForm
          onSave={handleSaveEvent}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
