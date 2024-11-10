import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [passwordHash, setPasswordHash] = useState(
    localStorage.getItem('passwordHash')
  )

  const logout = (redirect) => {
    setPasswordHash('')
    setUserName('')
    localStorage.removeItem('userName')
    localStorage.removeItem('passwordHash')
    redirect()
  }
  const contextValues = useMemo(
    () => ({
      userName,
      setUserName,
      passwordHash,
      setPasswordHash,
      logout,
    }),
    [userName, passwordHash]
  )

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
