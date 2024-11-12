import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ReportPanel({ locations, chooseIds }) {
  const locationNum = locations ? locations.length : 0

  const makeSuggestion = (locationNum, locations) => {
    // read chosen location ids
    let locationIds = chooseIds.split(',')
    locationIds = locationIds.map((l) => parseInt(l))

    locations = locations.filter(
      (l) => locationIds.indexOf(parseInt(l.locationId)) > -1
    )

    if (locationIds.length === 0) {
      return `There is no locations can choose.`
    }

    if (locationIds.length === 1) {
      const location = locations[0]
      const roadName = location?.roadName
      const roadType = location?.roadType
      const cameraType1 = location?.cameraType1
      return (
        <p>
          There is only one place can choose, is road {roadName}, which road
          type is {roadType}, the camera type is {cameraType1}.
        </p>
      )
    } else {
      return (
        <div>
          <p>The following two locations are selected:</p>
          <li>
            Road {locations[0]?.roadName}, which road type is{' '}
            {locations[0]?.roadType}, the camera type is{' '}
            {locations[0]?.cameraType1}.
          </li>
          <li>
            Road {locations[1]?.roadName}, which road type is{' '}
            {locations[1]?.roadType}, the camera type is{' '}
            {locations[1]?.cameraType1}.
          </li>
        </div>
      )
    }
  }

  const suggestion = makeSuggestion(locationNum, locations, chooseIds)

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold my-4">Report</h1>
        <h1 className="text-xl mb-4">{suggestion}</h1>

        <h1 className="text-2xl font-bold mb-4">
          How do we determine which locations are suitable for cameras?
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
          area and get the following stat graph, to justify the current choice.
        </p>
      </div>
    </>
  )
}

export default ReportPanel
