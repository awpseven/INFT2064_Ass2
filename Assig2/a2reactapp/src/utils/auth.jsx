import { createContext, useContext, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [passwordHash, setPasswordHash] = useState(
    localStorage.getItem('passwordHash')
  )
  const http = axios.create({
    baseURL: 'http://localhost:5147',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    proxy: {
      host: 'localhost',
      port: 3000,
    },
  })

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
      http,
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
