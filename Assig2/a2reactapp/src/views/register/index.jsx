import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import axios from 'axios'
import SHA256 from 'crypto-js/sha256'
import { useAuth } from '../../utils/auth'
import { toast, Bounce } from 'react-toastify'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setPasswordHash, setUserName } = useAuth()
  const passwordHash = SHA256(password).toString()

  const handleRegister = () => {
    console.log('start register: ', username, passwordHash)

    axios({
      method: 'post',
      url: '/api/Register',
      params: {
        userName: username,
        passwordHash: passwordHash,
      },
    })
      .then(() => {
        flushSync(() => {
          localStorage.setItem('passwordHash', passwordHash)
          localStorage.setItem('userName', username)
          setPasswordHash(passwordHash)
          setUserName(username)
        })
        toast('Register success! Directing to dashboard ...', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
        navigate('/', { replace: true })
      })
      .catch((e) => {
        toast('Invalid username or password!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
      })
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
              <label className="text-gray-700 text-sm mb-1">Username:</label>
              <input
                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
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
