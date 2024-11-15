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
  suburb,
  setSuburb,
  offenceCodes,
  setOffenceCodes,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  const [suburbs, setSuburbs] = useState([])
  const [cameras, setCameras] = useState([])
  const [isDefault, setIsDefault] = useState(false)

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
    if (isDefault) {
      setStartTime(new Date('1974-01-01'))
      setEndTime(new Date())
    }
  }, [isDefault])

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
        // alert('Load suburbs failed!')
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
        // alert('Load cameras failed!')
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
    // alert('start:' + startTime + ',end:' + endTime)

    setExpiationStats([])

    const newStats = []

    await Promise.all(
      cameras.map(async (c, index) => {
        const locationId = c.locationId
        const cameraTypeCode = c.cameraTypeCode

        let _startTime = new Date(startTime)
        let _endTime = new Date(endTime)

        console.log({ _startTime })
        let start = parseInt(_startTime.getTime() / 1000)
        let end = parseInt(_endTime.getTime() / 1000)

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
              Offence codes (e.g A001,B001):
            </label>
            <input
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500"
              id="offenceCodes"
              name="offenceCodes"
              value={offenceCodes}
              onChange={(e) => {
                setOffenceCodes(e.target.value)
              }}
            />
          </div>

          <div className="flex items-center">
            <label className="w-64">Offences Start From</label>
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:border-blue-500"
              type="datetime-local"
            />
            <label className="px-4">To</label>
            <input
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full focus:border-blue-500"
              type="datetime-local"
            />
          </div>
          <div class="flex items-center">
            <input
              onChange={(e) => setIsDefault(!isDefault)}
              id="link-checkbox"
              type="checkbox"
              value={isDefault}
              class="ml-56 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="link-checkbox"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Include All Offences Time
            </label>
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
