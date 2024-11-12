import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LocationTable({ data, suburb, startTime, endTime, offenceCodes }) {
  const [choose, setChoose] = useState([])

  const addLocation = (locationId) => {
    console.log({ choose })
    console.log({ locationId })
    if (choose.indexOf(locationId) > -1) {
      console.log('choose not found!')
      return
    }

    const newChoose = [...choose]
    newChoose.push(locationId)
    setChoose(newChoose)
  }

  const removeLocation = (locationId) => {
    if (choose.indexOf(locationId) === -1) {
      return
    }

    const newChoose = choose.filter((x) => x !== locationId)
    setChoose(newChoose)
  }

  console.log(data)

  const message =
    `You have choose locations: ` +
    choose.join() +
    ', click following url to read the report:'

  const makeUrl = () => {
    let _startTime = new Date(startTime)
    let _endTime = new Date(endTime)
    console.log({ _startTime })
    let start = parseInt(_startTime.getTime() / 1000)
    let end = parseInt(_endTime.getTime() / 1000)

    return (
      `/report?suburb=${suburb}&startTime=${start}&endTime=${end}&chooseIds=` +
      choose.join() +
      `&offenceCodes=${offenceCodes}`
    )
  }

  const url = makeUrl()

  return (
    <>
      <div>
        <h2 className="text-2xl text-black">Stat of camera locations</h2>

        {choose.length === 0 ? (
          ''
        ) : (
          <div className="my-2 p-2 bg-orange-100 rounded-lg">
            <p>{message}</p>
            <Link className="text-red-500" to={url}>
              {url}
            </Link>
          </div>
        )}

        <table className="border">
          <thead>
            <tr>
              <th className="border p-2">Location ID</th>
              <th className="border p-2">Road Name</th>
              <th className="border p-2">Road Type</th>
              <th className="border p-2">Camera Type</th>
              <th className="border p-2">Total Offences Count</th>
              <th className="border p-2">Total Demerits</th>
              <th className="border p-2">Total Fee Sum</th>
              <th className="border p-2">Avg Demerits Per Day</th>
              <th className="border p-2">Avg Fee Per Day</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, index) => (
                <tr key={index}>
                  <td className="border p-2">{d.locationId}</td>
                  <td className="border p-2">{d.roadName}</td>
                  <td className="border p-2">{d.roadType}</td>
                  <td className="border p-2">{d.cameraType1}</td>
                  <td className="border p-2">{d.totalOffencesCount}</td>
                  <td className="border p-2">{d.totalDemerits}</td>
                  <td className="border p-2">{d.totalFeeSum}</td>
                  <td className="border p-2">{d.avgDemeritsPerDay}</td>
                  <td className="border p-2">{d.avgFeePerDay}</td>
                  <td className="border p-2">
                    {choose.indexOf(d.locationId) === -1 ? (
                      <button
                        className="p-2 rounded-lg bg-blue-500 text-white"
                        type="button"
                        onClick={() => addLocation(d.locationId)}
                      >
                        Choose
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded-lg bg-red-500 text-white"
                        type="button"
                        onClick={() => removeLocation(d.locationId)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )

  // )
}

export default LocationTable
