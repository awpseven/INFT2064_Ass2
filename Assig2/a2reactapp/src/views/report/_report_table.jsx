import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ReportTable({ data, suburb, startTime, endTime, offenceCodes }) {
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
          <div>
            <p>{message}</p>
            <Link to={url}>{url}</Link>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Location ID</th>
              <th>Road Name</th>
              <th>Road Type</th>
              <th>Camera Type</th>
              <th>Total Offences Count</th>
              <th>Total Demerits</th>
              <th>Total Fee Sum</th>
              <th>Avg Demerits Per Day</th>
              <th>Avg Fee Per Day</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, index) => (
                <tr key={index}>
                  <td>{d.locationId}</td>
                  <td>{d.roadName}</td>
                  <td>{d.roadType}</td>
                  <td>{d.cameraType1}</td>
                  <td>{d.totalOffencesCount}</td>
                  <td>{d.totalDemerits}</td>
                  <td>{d.totalFeeSum}</td>
                  <td>{d.avgDemeritsPerDay}</td>
                  <td>{d.avgFeePerDay}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )

  // )
}

export default ReportTable
