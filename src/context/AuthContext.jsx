import { createContext, useState, useEffect } from 'react'

const AuthContextObj = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState({})

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      
      const savedProfile = localStorage.getItem(`profile_${user.id}`)
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile))
      }
    }
  }, [])

  const login = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user))
    setCurrentUser(user)
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  const updateProfile = (profile) => {
    if (currentUser) {
      localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(profile))
      setUserProfile(profile)
    }
  }

  const updateEmail = (newEmail) => {
    if (currentUser) {
      const updated = { ...currentUser, email: newEmail }
      localStorage.setItem('currentUser', JSON.stringify(updated))
      setCurrentUser(updated)
    }
  }

  return (
    <AuthContextObj.Provider value={{ currentUser, userProfile, login, logout, updateProfile, updateEmail }}>
      {children}
    </AuthContextObj.Provider>
  )
}

export default AuthContextObj
