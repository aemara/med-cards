import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface FlashCard {
  id: string
  question: string
  answer: string
}

const FlashCards: React.FC = () => {
  const [cards, setCards] = useState<FlashCard[]>([])
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [currentCard, setCurrentCard] = useState<FlashCard | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    // Load cards from localStorage
    const savedCards = localStorage.getItem(`flashcards_${currentUser?.id}`)
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [currentUser])

  const saveCards = (updatedCards: FlashCard[]) => {
    localStorage.setItem(`flashcards_${currentUser?.id}`, JSON.stringify(updatedCards))
    setCards(updatedCards)
  }

  const addCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentUser) {
      const newCard = { id: Date.now().toString(), question, answer }
      const updatedCards = [...cards, newCard]
      saveCards(updatedCards)
      setQuestion('')
      setAnswer('')
    }
  }

  const nextCard = () => {
    const index = cards.findIndex(card => card.id === currentCard?.id)
    const nextIndex = (index + 1) % cards.length
    setCurrentCard(cards[nextIndex])
    setShowAnswer(false)
  }

  const startStudying = () => {
    if (cards.length > 0) {
      setCurrentCard(cards[0])
      setShowAnswer(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Flash Cards</h2>
      
      <form onSubmit={addCard} className="mb-8 space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Question</span>
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Answer</span>
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Card</button>
      </form>

      {cards.length > 0 ? (
        currentCard ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{currentCard.question}</h2>
              {showAnswer && <p>{currentCard.answer}</p>}
              <div className="card-actions justify-end">
                {!showAnswer && (
                  <button className="btn btn-primary" onClick={() => setShowAnswer(true)}>
                    Show Answer
                  </button>
                )}
                <button className="btn btn-secondary" onClick={nextCard}>
                  Next Card
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={startStudying}>
            Start Studying
          </button>
        )
      ) : (
        <p>No flash cards yet. Add some to get started!</p>
      )}
    </div>
  )
}

export default FlashCards