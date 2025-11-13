
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4">
      <span className="text-8xl mb-4">🤷‍♂️</span>
      <h1 className="text-5xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        A página que você está procurando não existe ou o contador foi removido.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFoundPage;
   