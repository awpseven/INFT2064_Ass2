import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReportPanel from './_report_panel'
import ReportTable from './_report_table'
import ReportMap from './_report_map'
import { Icon } from '@iconify-icon/react'
import BarCharts from '../dashboard/_barcharts'
import PieCharts from '../dashboard/_piecharts'
import { useAuth } from '../../utils/auth'

function Report() {
  const [expiationStats, setExpiationStats] = useState([])
  const [expiations, setExpiations] = useState([])
  const [error, setError] = useState('')
  const [currentTab, setCurrentTab] = useState(0)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [cameras, setCameras] = useState([])
  const { http } = useAuth()
  const [chooseIds, setChooseIds] = useState('')

  useEffect(() => {
    // Read params
    setChooseIds(searchParams.get('chooseIds'))
    fetchLocations(searchParams.get('suburb'))
  }, [])

  const fetchLocations = (suburb) => {
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
    if (!cameras || cameras.length === 0) {
      return
    }
    const suburb = searchParams.get('suburb')
    const startTime = searchParams.get('startTime')
    const endTime = searchParams.get('endTime')
    const offenceCodes = searchParams.get('offenceCodes')
    handleSearch(suburb, cameras, startTime, endTime, offenceCodes)
  }, [cameras])

  // fetch all cameras data
  const handleSearch = async (
    suburb,
    cameras,
    startTime,
    endTime,
    offenceCodes
  ) => {
    // get location
    if (!cameras || cameras.length === 0) {
      alert('No valid camera locations!')
      return
    }

    // get start time
    // get end time
    // alert('start:' + startTime.getTime() + ',end:' + endTime.getTime())

    setExpiationStats([])

    const newStats = []

    await Promise.all(
      cameras.map(async (c, index) => {
        const locationId = c.locationId
        const cameraTypeCode = c.cameraTypeCode
        const start = parseInt(startTime)
        const end = parseInt(endTime)
        const stat = await http({
          method: 'get',
          url: `/api/Get_ExpiationStatsForLocationId`,
          params: {
            locationId: locationId,
            cameraTypeCode: cameraTypeCode,
            startTime: start,
            endTime: end,
            offenceCodes: offenceCodes,
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

  const tabs = [
    {
      title: 'Table Data',
      icon: <Icon icon="majesticons:table" />,
      description:
        'This is the indicator data for all locations so that you can clearly know the specific value.',
      content: <ReportTable data={expiationStats} />,
    },
    {
      title: 'Ranks',
      icon: <Icon icon="f7:chart-bar-square-fill" />,
      description:
        'This is the indicator data for all locations so that you can clearly know the specific value.',
      content: <BarCharts data={expiationStats} />,
    },
    {
      title: 'Proportions',
      icon: <Icon icon="uim:chart-pie" />,
      description:
        'This is the indicator data for all locations so that you can clearly know the specific value.',
      content: <PieCharts data={expiationStats} />,
    },
  ]
  return (
    <>
      <Link className="border w-fit p-2 rounded-xl" to="/">
        Back to Dashboard
      </Link>

      <ReportMap
        locations={expiationStats}
        suburb={searchParams.get('suburb')}
      />
      <ReportPanel locations={expiationStats} chooseIds={chooseIds} />

      <div class="md:flex">
        <ul class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {tabs.map((t, index) => (
            <li key={index} onClick={() => setCurrentTab(index)}>
              <a
                href={`#` + index}
                class={
                  currentTab === index
                    ? 'active  inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg  w-full dark:bg-blue-600'
                    : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
                }
              >
                {t.icon}
                {t.title}
              </a>
            </li>
          ))}
        </ul>
        <div class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          {tabs.map((t, index) => (
            <div
              id={`#` + index}
              key={index}
              className={index === currentTab ? '' : 'hidden'}
            >
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t.title}
              </h3>
              <p class="mb-2">{t.description}</p>
              {t.content}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Report
