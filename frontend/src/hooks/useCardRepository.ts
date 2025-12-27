import { useRepositories } from '../context/RepositoryContext';
import type { CardRepository } from '../domain/ports/CardRepository';

export const useCardRepository = (): CardRepository => {
  const { cardRepository } = useRepositories();
  return cardRepository;
};
