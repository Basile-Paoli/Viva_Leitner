import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCardRepository} from '../../hooks/useCardRepository';
import type {CreateCardDTO} from '../../types';
import './CreateCard.css';

export const CreateCard = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tag, setTag] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cardRepository = useCardRepository();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const cardData: CreateCardDTO = {
                question,
                answer,
                tag: tag || undefined,
            };
            await cardRepository.createCard(cardData);
            setMessage('Carte créée avec succès !');

            setQuestion('');
            setAnswer('');
            setTag('');

            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Erreur lors de la création. Réessayez.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="create-card-container">
            <button onClick={handleBack} className="create-card-back-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
                Retour au Dashboard
            </button>

            <div className="create-card-header">
                <h1 className="create-card-title">Créer une nouvelle carte</h1>
                <p className="create-card-subtitle">
                    Ajoutez une question et sa réponse pour enrichir votre collection
                </p>
            </div>

            <div className="create-card-form-container">
                <form onSubmit={handleSubmit} className="create-card-form">
                    <div className="create-card-input-group">
                        <label className="create-card-label">
                            Question <span className="create-card-required">*</span>
                        </label>
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="create-card-textarea"
                            placeholder="Ex: Quelle est la capitale de la France ?"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="create-card-input-group">
                        <label className="create-card-label">
                            Réponse <span className="create-card-required">*</span>
                        </label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="create-card-textarea"
                            placeholder="Ex: Paris"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="create-card-input-group">
                        <label className="create-card-label">
                            Tag <span className="create-card-optional">(optionnel)</span>
                        </label>
                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="create-card-input"
                            placeholder="Ex: géographie, histoire, math..."
                        />
                        <span className="create-card-hint">
              Utilisez des tags pour organiser vos cartes par thème
            </span>
                    </div>

                    {message && (
                        <div className={`create-card-message ${message.includes('') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    <div className="create-card-button-group">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="create-card-button cancel"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="create-card-button submit"
                            disabled={loading}
                        >
                            {loading ? 'Création...' : 'Créer la carte'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
