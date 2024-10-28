import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FilterMap() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <div className="w-full min-h-60 border rounded">
        <h1>
          This would display a google map with some data to show the filter
          result.
        </h1>
      </div>
    </>
  )
}

export default FilterMap
