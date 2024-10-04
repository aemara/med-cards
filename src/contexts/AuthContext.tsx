import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
}

interface AuthContextType {
  currentUser: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, you'd validate credentials against a backend
    const user = { id: '1', email }
    localStorage.setItem('user', JSON.stringify(user))
    setCurrentUser(user)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}