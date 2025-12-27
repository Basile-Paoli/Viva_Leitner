import React, { createContext, useContext, ReactNode } from 'react';
import type { CardRepository } from '../domain/ports/CardRepository';
import { CardApiAdapter } from '../adapters/api/CardApiAdapter';

interface RepositoryContextType {
  cardRepository: CardRepository;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

interface RepositoryProviderProps {
  children: ReactNode;
  repositories?: Partial<RepositoryContextType>;
}

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({
  children,
  repositories,
}) => {
  const apiUrl = '';

  const defaultRepositories: RepositoryContextType = {
    cardRepository: new CardApiAdapter(apiUrl),
  };

  const value: RepositoryContextType = {
    ...defaultRepositories,
    ...repositories,
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = (): RepositoryContextType => {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error('useRepositories must be used within a RepositoryProvider');
  }
  return context;
};
