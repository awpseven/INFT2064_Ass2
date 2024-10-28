import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SuggestionPanel() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Step 2: Suggestions</h1>
        <p>
          There would list 10 locations which is suggested to place the cameras.
        </p>

        <h1 className="text-2xl font-bold mb-4">Step 3: Reasons:</h1>
        <p>
          The location of the camera is selected based on several factors: 1.
          xxx 2. xxx 3. xxx
        </p>

        <p>
          Here would list some graph to show the factors values of the previous
          10 locations.
        </p>
      </div>
    </>
  )
}

export default SuggestionPanel
