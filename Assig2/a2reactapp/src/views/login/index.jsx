import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/', { replace: true })
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
        <div className="flex flex-col items-center space-y-6 bg-white shadow-lg rounded p-8 w-80">
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>

          <div className="w-full space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm mb-1">Email:</label>
              <input
                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm mb-1">Password:</label>
              <input
                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
          >
            Login
          </button>

          <Link
            to={`/register`}
            className="text-blue-500 text-sm hover:underline"
          >
            Register a new account
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
