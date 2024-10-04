import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, BookOpen, ChevronDown } from 'lucide-react'

const subjects = ['Math', 'Science', 'History', 'Literature']

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <BookOpen className="mr-2" />
          Flash Cards
        </Link>
      </div>
      <div className="flex-none">
        {currentUser && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost m-1">
              Subjects
              <ChevronDown className="ml-1" size={16} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 z-50">
              {subjects.map((subject) => (
                <li key={subject}>
                  <Link to={`/subject/${subject.toLowerCase()}`} className="text-base-content hover:bg-base-300">
                    {subject}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentUser ? (
          <button className="btn btn-ghost" onClick={handleLogout}>
            <LogOut />
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-ghost">Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar