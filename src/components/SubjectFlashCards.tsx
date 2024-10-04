import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

// Dummy data - replace this with your database fetch later
const dummyFlashCards = {
  math: [
    { id: 1, question: "What is 2 + 2?", answer: "4" },
    { id: 2, question: "What is the square root of 16?", answer: "4" },
    { id: 3, question: "What is 5 x 7?", answer: "35" },
  ],
  science: [
    { id: 1, question: "What is the chemical symbol for water?", answer: "H2O" },
    { id: 2, question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    { id: 3, question: "What is the boiling point of water in Celsius?", answer: "100°C" },
  ],
  history: [
    { id: 1, question: "In which year did World War II end?", answer: "1945" },
    { id: 2, question: "Who was the first President of the United States?", answer: "George Washington" },
    { id: 3, question: "What year did the Berlin Wall fall?", answer: "1989" },
  ],
  literature: [
    { id: 1, question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
    { id: 2, question: "What's the name of the main character in 'To Kill a Mockingbird'?", answer: "Scout Finch" },
    { id: 3, question: "Who wrote '1984'?", answer: "George Orwell" },
  ],
}

const SubjectFlashCards: React.FC = () => {
  const { subject } = useParams<{ subject: string }>()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const cards = subject ? dummyFlashCards[subject as keyof typeof dummyFlashCards] : []

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length)
    setShowAnswer(false)
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  if (!subject || cards.length === 0) {
    return <div className="text-center mt-8">No flash cards available for this subject.</div>
  }

  const currentCard = cards[currentCardIndex]

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center capitalize">{subject}</h2>
      <div className="card bg-base-100 shadow-xl min-h-[300px]">
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title text-2xl mb-4">{currentCard.question}</h2>
          {showAnswer && (
            <p className="text-xl mb-4">{currentCard.answer}</p>
          )}
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={toggleAnswer}>
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            <button className="btn btn-secondary" onClick={handleNextCard}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectFlashCards