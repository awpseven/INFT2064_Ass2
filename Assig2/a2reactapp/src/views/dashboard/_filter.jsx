import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Filter() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/', { replace: true })
  }

  return (
    <>
      <div className="">
        <div className="text-2xl font-bold mb-4">
          Step 1: Please enter your search filter:
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <label className="w-20" for="condition1">
              Search:
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              id="condition1"
              type="text"
              placeholder="Please enter your search keywords"
            />
          </div>
          <div className="flex items-center">
            <label className="w-20" for="filter1">
              Filter 1:
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              list="filter1-list"
              id="filter1"
              name="filter1"
            />

            <datalist id="filter1-list">
              <option value="Chocolate"></option>
              <option value="Coconut"></option>
              <option value="Mint"></option>
              <option value="Strawberry"></option>
              <option value="Vanilla"></option>
            </datalist>
          </div>

          <div className="flex items-center">
            <label className="w-20" for="filter2">
              Filter 2:
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              list="filter2-list"
              id="filter2"
              name="filter2"
            />

            <datalist id="filter2-list">
              <option value="Chocolate"></option>
              <option value="Coconut"></option>
              <option value="Mint"></option>
              <option value="Strawberry"></option>
              <option value="Vanilla"></option>
            </datalist>
          </div>

          <div className="flex items-center">
            <label className="w-20" for="filter3">
              Filter 3:
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              list="filter3-list"
              id="filter3"
              name="filter3"
            />

            <datalist id="filter3-list">
              <option value="Chocolate"></option>
              <option value="Coconut"></option>
              <option value="Mint"></option>
              <option value="Strawberry"></option>
              <option value="Vanilla"></option>
            </datalist>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200">
            Search
          </button>
        </div>
      </div>
    </>
  )
}

export default Filter
