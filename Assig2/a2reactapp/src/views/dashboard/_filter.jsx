import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Bounce } from 'react-toastify'
import { useAuth } from '../../utils/auth'

function Filter() {
  const [suburbs, setSuburbs] = useState([])
  const [suburb, setSuburb] = useState('')
  const [cameras, setCameras] = useState([])
  const { http } = useAuth()

  const navigate = useNavigate()

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
        toast('Load suburbs failed!', {
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
  }, [])

  useEffect(() => {
    // set suburb
    if (suburbs && suburbs.length > 0) {
      setSuburb(suburbs[0])
    } else {
      setSuburb('')
    }
  }, [suburbs])

  useEffect(() => {
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
        toast('Load cameras failed!', {
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
  }, [suburb])

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
            <label className="w-64" for="filter3">
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
