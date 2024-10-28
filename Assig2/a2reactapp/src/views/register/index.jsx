import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const redirect = () => {
    navigate('/login', { replace: true })
  }

  const handleRegister = () => {
    navigate('/login', { replace: true })
  }

  const errorMsg =
    password != confirm_password ? (
      <div className="text-red-500">Password is different</div>
    ) : error == '' ? (
      ''
    ) : (
      <div className="text-red-500">{error}</div>
    )

  const disableRegister = password != confirm_password ? true : false

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
        <div className="flex flex-col items-center space-y-6 bg-white shadow-lg rounded p-8 w-80">
          <h1 className="text-2xl font-semibold text-gray-800">Register</h1>

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
                placeholder="Create a password"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm mb-1">
                Confirm Password:
              </label>
              <input
                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                type="password"
                name="confirm_password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs mt-2">{errorMsg}</p>
            )}
          </div>

          <button
            disabled={disableRegister}
            onClick={handleRegister}
            className={`w-full py-2 rounded font-semibold transition duration-200 ${
              disableRegister
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Register
          </button>

          <Link to={`/login`} className="text-blue-500 text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default Register
