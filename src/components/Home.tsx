import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen } from 'lucide-react'

const subjects = ['Math', 'Science', 'History', 'Literature']

const Home: React.FC = () => {
  const { currentUser } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Flash Cards</h1>
      {currentUser ? (
        <>
          <p className="text-center mb-8">Choose a subject to start studying:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <Link key={subject} to={`/subject/${subject.toLowerCase()}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="card-body items-center text-center">
                  <BookOpen className="w-12 h-12 mb-4 text-primary" />
                  <h2 className="card-title text-2xl">{subject}</h2>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-4">Log in to start studying with flash cards.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      )}
    </div>
  )
}

export default Home