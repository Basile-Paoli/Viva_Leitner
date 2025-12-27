import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardRepository } from '../../hooks/useCardRepository';
import type { Card, Category } from '../../types';
import './Library.css';

export const Library: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const navigate = useNavigate();
  const cardRepository = useCardRepository();

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cards, selectedTags, selectedCategories]);

  const loadCards = async () => {
    setLoading(true);
    setError('');
    try {
      const allCards = await cardRepository.getCards();
      setCards(allCards);

      const tags = new Set<string>();
      allCards.forEach(card => {
        if (card.tag) tags.add(card.tag);
      });
      setAvailableTags(Array.from(tags).sort());
    } catch (err) {
      setError('Failed to load cards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...cards];

    if (selectedTags.length > 0) {
      filtered = filtered.filter(card =>
        card.tag && selectedTags.includes(card.tag)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(card =>
        selectedCategories.includes(card.category)
      );
    }

    setFilteredCards(filtered);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategories([]);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const getCategoryColor = (category: Category): string => {
    const colors: Record<Category, string> = {
      'FIRST': '#f44336',
      'SECOND': '#ff9800',
      'THIRD': '#ffc107',
      'FOURTH': '#ffeb3b',
      'FIFTH': '#cddc39',
      'SIXTH': '#8bc34a',
      'SEVENTH': '#4caf50',
      'DONE': '#2196f3',
    };
    return colors[category] || '#999';
  };

  const categories: Category[] = [
    'FIRST', 'SECOND', 'THIRD', 'FOURTH',
    'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'
  ];

  if (loading) {
    return (
      <div className="library-container">
        <div className="library-loading">
          <h2>Loading cards...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="library-container">
        <div className="library-error">
          <h2>{error}</h2>
          <button onClick={handleBack} className="library-back-button">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="library-container">
      <button onClick={handleBack} className="library-back-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Retour
      </button>

      <div className="library-header">
        <h1>Votre Bibliothèque</h1>
        <p>Accédez à toutes vos cartes en un seul endroit</p>
      </div>

      <div className="library-content-box">
        <div className="library-filters-section">
          <div className="library-filters-grid">
            <div className="library-filter-group">
              <label className="library-filter-label" htmlFor="tag-filter">
                Filtrer par Tag
              </label>
              <select
                id="tag-filter"
                className="library-filter-select"
                value={selectedTags[0] || ''}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedTags([e.target.value]);
                  } else {
                    setSelectedTags([]);
                  }
                }}
              >
                <option value="">Tous les tags</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <div className="library-filter-group">
              <label className="library-filter-label" htmlFor="category-filter">
                Filtrer par Catégorie
              </label>
              <select
                id="category-filter"
                className="library-filter-select"
                value={selectedCategories[0] || ''}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedCategories([e.target.value as Category]);
                  } else {
                    setSelectedCategories([]);
                  }
                }}
              >
                <option value="">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {(selectedTags.length > 0 || selectedCategories.length > 0) && (
              <button onClick={clearFilters} className="library-clear-button">
                ✕ Effacer les filtres
              </button>
            )}
          </div>
        </div>

        <div className="library-cards-grid">
          {filteredCards.length === 0 ? (
            <div className="library-no-cards">
              <h3>Aucune carte trouvée</h3>
              <p>Essayez d'ajuster vos filtres</p>
            </div>
          ) : (
            filteredCards.map(card => (
              <div key={card.id} className="library-card-item">
                <div className="library-card-header">
                  <span
                    className="library-category-badge"
                    style={{ backgroundColor: getCategoryColor(card.category) }}
                  >
                    {card.category}
                  </span>
                  {card.tag && (
                    <span className="library-tag-badge">{card.tag}</span>
                  )}
                </div>
                <div className="library-card-content">
                  <div className="library-question-section">
                    <strong className="library-label">Q:</strong> {card.question}
                  </div>
                  <div className="library-answer-section">
                    <strong className="library-label">A:</strong> {card.answer}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
