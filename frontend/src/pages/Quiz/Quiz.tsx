import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCardRepository} from '../../hooks/useCardRepository';
import './Quiz.css';
import type {Card, AnswerResult} from '../../types';

export const Quiz: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState<AnswerResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const cardRepository = useCardRepository();

    useEffect(() => {
        loadQuiz();
    }, []);

    const loadQuiz = async () => {
        setLoading(true);
        setError('');
        try {
            const quizCards = await cardRepository.getQuizz();
            setCards(quizCards);
            if (quizCards.length === 0) {
                setError('No cards to review today! Great job!');
            }
        } catch (err) {
            setError('Failed to load quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async () => {
        const currentCard = cards[currentIndex];
        try {
            const answerResult = await cardRepository.submitAnswer(currentCard.id, {
                userAnswer: userAnswer,
            });
            setResult(answerResult);

            if (!answerResult.needsManualConfirmation) {
                setTimeout(() => {
                    moveToNextCard();
                }, 2500);
            }
        } catch (err) {
            setError('Failed to submit answer. Please try again.');
        }
    };

    const handleConfirmCorrect = async () => {
        const currentCard = cards[currentIndex];
        try {
            const answerResult = await cardRepository.submitAnswer(currentCard.id, {
                userAnswer: userAnswer,
                isCorrect: true,
            });
            setResult({...answerResult, needsManualConfirmation: false});

            setTimeout(() => {
                moveToNextCard();
            }, 2000);
        } catch (err) {
            setError('Failed to submit answer. Please try again.');
        }
    };

    const handleConfirmWrong = async () => {
        const currentCard = cards[currentIndex];
        try {
            const answerResult = await cardRepository.submitAnswer(currentCard.id, {
                userAnswer: userAnswer,
                isCorrect: false,
            });
            setResult({...answerResult, needsManualConfirmation: false});

            setTimeout(() => {
                moveToNextCard();
            }, 2000);
        } catch (err) {
            setError('Failed to submit answer. Please try again.');
        }
    };

    const moveToNextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
            setUserAnswer('');
            setResult(null);
        } else {
            navigate('/dashboard');
        }
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="quiz-container">
                <div className="quiz-card">
                    <h2>Loading quiz...</h2>
                </div>
            </div>
        );
    }

    if (error || cards.length === 0) {
        return (
            <div className="quiz-container">
                <div className="quiz-card">
                    <h2>{error || 'No cards available'}</h2>
                    <button onClick={handleBack} className="quiz-button">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <button onClick={handleBack} className="quiz-back-button">
                    ← Back
                </button>
                <div className="quiz-progress">
                    Card {currentIndex + 1} of {cards.length}
                </div>
            </div>

            <div className="quiz-card">
                <div className="quiz-category-badge">
                    Category: {currentCard.category}
                </div>
                {currentCard.tag && (
                    <div className="quiz-tag-badge">
                        {currentCard.tag}
                    </div>
                )}

                <div className="quiz-question-section">
                    <h2 className="quiz-question-title">Question:</h2>
                    <p className="quiz-question-text">{currentCard.question}</p>
                </div>

                {!showAnswer && !result && (
                    <div>
                        <label className="quiz-label">Votre réponse:</label>
                        <textarea
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="quiz-textarea"
                            placeholder="Tapez votre réponse ici..."
                            rows={4}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmitAnswer();
                                }
                            }}
                        />
                        <div className="quiz-button-group">
                            <button onClick={handleShowAnswer} className="quiz-button secondary">
                                Voir la réponse
                            </button>
                            <button
                                onClick={handleSubmitAnswer}
                                className="quiz-button submit"
                                disabled={!userAnswer.trim()}>
                                Valider ma réponse
                            </button>
                        </div>
                    </div>
                )}

                {showAnswer && !result && (
                    <div className="quiz-answer-section">
                        <h2 className="quiz-answer-title">Réponse correcte:</h2>
                        <p className="quiz-answer-text">{currentCard.answer}</p>
                    </div>
                )}

                {result && (
                    <div>
                        <div className="quiz-answer-section">
                            <h2 className="quiz-answer-title">Réponse correcte:</h2>
                            <p className="quiz-answer-text">{result.correctAnswer}</p>
                        </div>

                        {result.userAnswer && (
                            <div className="quiz-comparison-section">
                                <h3 className="quiz-comparison-title">Votre réponse:</h3>
                                <p className="quiz-user-answer-text">{result.userAnswer}</p>
                            </div>
                        )}

                        {result.needsManualConfirmation ? (
                            <div>
                                <p className="quiz-confirmation-text">
                                    Est-ce que votre réponse était correcte ?
                                </p>
                                <div className="quiz-button-group">
                                    <button
                                        onClick={handleConfirmWrong}
                                        className="quiz-button wrong"
                                    >
                                        J'ai eu faux
                                    </button>
                                    <button
                                        onClick={handleConfirmCorrect}
                                        className="quiz-button correct">
                                        J'ai eu bon
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`quiz-result-message ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                                {result.message}
                            </div>
                        )}

                        <div className="quiz-category-change">
                            {result.previousCategory} → {result.newCategory}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
