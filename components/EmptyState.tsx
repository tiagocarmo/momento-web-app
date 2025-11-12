import React from 'react';

interface EmptyStateProps {
  onAdd: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed border-border rounded-lg animate-fade-in">
      <span className="text-6xl mb-4 animate-spin-slow">⏳</span>
      <h2 className="text-2xl font-bold mb-2">Nenhum contador encontrado</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Parece que você ainda não criou nenhum evento. Clique no botão abaixo para começar a sua primeira contagem regressiva!
      </p>
      <button
        onClick={onAdd}
        className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Criar novo contador
      </button>
    </div>
  );
};
