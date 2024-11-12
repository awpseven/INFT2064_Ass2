import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SuggestionPanel({ locations }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const locationNum = locations ? locations.length : 0

  const makeSuggestion = (locationNum, locations) => {
    if (locationNum === 0) {
      return `There is no locations can choose.`
    }

    if (locationNum === 1) {
      const location = locations[0]
      const roadName = location.roadName
      const roadType = location.roadType
      const cameraType1 = location.cameraType1
      return (
        <p>
          There is only one place can choose, is road {roadName}, which road
          type is {roadType}, the camera type is {cameraType1}.
        </p>
      )
    } else {
      return (
        <div>
          <p>The following two locations are recommended:</p>
          <li>
            Road {locations[0].roadName}, which road type is{' '}
            {locations[0].roadType}, the camera type is{' '}
            {locations[0].cameraType1}.
          </li>
          <li>
            Road {locations[1].roadName}, which road type is{' '}
            {locations[1].roadType}, the camera type is{' '}
            {locations[1].cameraType1}.
          </li>
        </div>
      )
    }
  }

  const suggestion = makeSuggestion(locationNum, locations)

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Step 2: How do we determine which locations are suitable for cameras?
        </h1>
        <p>
          Judging which locations are suitable for adding cameras is based on
          the following points, in order of priority from high to low, they are:
        </p>
        <p>
          1. Total offences count, the higher its value, the more suitable for
          placing the camera
        </p>
        <p>
          2. Total demerits, the higher its value, the more suitable for placing
          the camera
        </p>
        <p>
          3. Total fee sum, the higher its value, the more suitable for placing
          the camera
        </p>
        <p>
          4. Average demerits per day, the higher its value, the more suitable
          for placing the camera
        </p>
        <p>
          5. Average fee per day, the higher its value, the more suitable for
          placing the camera
        </p>

        <p>
          According to the algorithm, we sort all the cameras in the current
          area and get the following result.
        </p>

        <h1 className="text-2xl font-bold mb-4">Step 3: Suggestions</h1>
        {suggestion}
      </div>
    </>
  )
}

export default SuggestionPanel
