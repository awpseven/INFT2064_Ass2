import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Bounce } from 'react-toastify'
import { useAuth } from '../../utils/auth'
import { method } from 'requests'

function Filter({
  expiationStats,
  setExpiationStats,
  expiations,
  setExpiations,
}) {
  const [suburbs, setSuburbs] = useState([])
  const [suburb, setSuburb] = useState('')
  const [cameras, setCameras] = useState([])
  const [startTime, setStartTime] = useState(new Date('1974-01-01'))
  const [endTime, setEndTime] = useState(new Date())

  const { http } = useAuth()

  const addExpiationStat = (newStat) => {
    const newStats = [...expiationStats]
    newStats.push(newStat)
    setExpiationStats(newStats)
  }

  const navigate = useNavigate()

  const alert = (message) => {
    toast(message, {
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
  }

  useEffect(() => {
    // load suburbs from backend
    http({
      method: 'get',
      url: '/api/Get_ListCameraSuburbs',
      params: {},
    })
      .then((result) => {
        setSuburbs(result.data)
      })
      .catch((e) => {
        console.log(e)
        alert('Load suburbs failed!')
      })
  }, [])

  useEffect(() => {
    // set suburb
    if (suburbs && suburbs.length > 0) {
      setSuburb(suburbs[0])
    } else {
      setSuburb('')
    }
  }, [suburbs])

  const fetchLocations = () => {
    if (suburbs.indexOf(suburb) === -1) {
      return
    }

    // set cameras
    http({
      method: 'get',
      url: `/api/Get_ListCamerasInSuburb?suburb=${suburb}&cameraIdsOnly=false`,
    })
      .then((result) => {
        console.log(result.data)
        setCameras(result.data)
      })
      .catch((e) => {
        console.log(e)
        alert('Load cameras failed!')
      })
  }

  useEffect(() => {
    fetchLocations()
  }, [suburb])

  // fetch stat data
  const fetchLocationStat = () => {}

  // fetch all cameras data
  const handleSearch = async () => {
    // get suburbs
    if (!suburb || suburbs.indexOf(suburb) === -1) {
      alert('No valid suburb!')
      return
    }

    // get location
    if (!cameras || cameras.length === 0) {
      alert('No valid camera locations!')
      return
    }

    // get start time
    // get end time
    alert('start:' + startTime.getTime() + ',end:' + endTime.getTime())

    setExpiationStats([])

    const newStats = []

    await Promise.all(
      cameras.map(async (c, index) => {
        const locationId = c.locationId
        const cameraTypeCode = c.cameraTypeCode
        const start = parseInt(startTime.getTime() / 1000)
        const end = parseInt(endTime.getTime() / 1000)
        const stat = await http({
          method: 'get',
          url: `/api/Get_ExpiationStatsForLocationId`,
          params: {
            locationId: locationId,
            cameraTypeCode: cameraTypeCode,
            startTime: start,
            endTime: end,
          },
        })
          .then(async (result) => {
            console.log(result.data)
            const statData = result.data
            return {
              locationId: locationId,
              roadName: c.roadName,
              roadType: c.roadType,
              cameraType1: c.cameraType1,
              totalOffencesCount: statData.totalOffencesCount.toFixed(2),
              totalDemerits: statData.totalDemerits.toFixed(2),
              totalFeeSum: statData.totalFeeSum.toFixed(2),
              avgDemeritsPerDay: statData.avgDemeritsPerDay.toFixed(2),
              avgFeePerDay: statData.avgFeePerDay.toFixed(2),
            }
          })
          .catch((e) => {
            console.log(e)
            // alert('Load cameras failed!')
          })
        newStats.push(stat)
      })
    )

    // sort data
    newStats.sort((a, b) => {
      if (a.totalOffencesCount !== b.totalOffencesCount) {
        return -(a.totalOffencesCount - b.totalOffencesCount)
      }
      if (a.totalDemerits !== b.totalDemerits) {
        return -(a.totalDemerits - b.totalDemerits)
      }
      if (a.totalFeeSum !== b.totalDemerits) {
        return -(a.totalFeeSum - b.totalFeeSum)
      }
      if (a.avgDemeritsPerDay !== b.avgDemeritsPerDay) {
        return -(a.avgDemeritsPerDay - b.avgDemeritsPerDay)
      }
      if (a.avgFeePerDay !== b.avgFeePerDay) {
        return -(a.avgFeePerDay - b.avgFeePerDay)
      }
      return a.locationId - b.locationId
    })

    console.log(newStats)
    setExpiationStats(newStats)
  }

  return (
    <>
      <div className="">
        <div className="text-2xl font-bold mb-4">
          Step 1: Please enter your search filter:
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <label className="w-64" for="condition1">
              Search:
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              id="condition1"
              type="text"
              placeholder="Please enter your search keywords"
              autoComplete="false"
            />
          </div>
          <div className="flex items-center">
            <label className="w-64" for="suburb">
              Choose a Suburb:
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              autoComplete="false"
              list="suburb-list"
              id="suburb"
              name="suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            />

            <datalist id="suburb-list" className="w-full max-h-16">
              <option value="">Choose a suburb</option>
              {suburbs &&
                suburbs.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
            </datalist>
          </div>

          <div className="flex items-center">
            <label className="w-64" for="camera">
              Choose a Camera Location:
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              list="camera-list"
              id="camera"
              name="camera"
            />

            <datalist id="camera-list">
              {cameras &&
                cameras.map((c, index) => (
                  <option key={index} value={c.locationId}>
                    {c.roadName} - {c.cameraType1}
                  </option>
                ))}
              <option value="Chocolate"></option>
              <option value="Coconut"></option>
              <option value="Mint"></option>
              <option value="Strawberry"></option>
              <option value="Vanilla"></option>
            </datalist>
          </div>

          <div className="flex items-center">
            <label className="w-64">From</label>
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:border-blue-500"
              type="datetime-local"
            />
            <label className="">To</label>
            <input
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:border-blue-500"
              type="datetime-local"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
}

export default Filter
