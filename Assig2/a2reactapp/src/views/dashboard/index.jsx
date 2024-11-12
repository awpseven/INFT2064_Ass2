import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Filter from './_filter'
import FilterMap from './_filter_map'
import SuggestionPanel from './_suggest_panel'
import LocationTable from './_location_table'
import { Icon } from '@iconify-icon/react'
import BarCharts from './_barcharts'
import PieCharts from './_piecharts'

function Dashboard() {
  const [expiationStats, setExpiationStats] = useState([])
  const [expiations, setExpiations] = useState([])
  const [error, setError] = useState('')
  const [currentTab, setCurrentTab] = useState(0)
  const navigate = useNavigate()

  const [suburb, setSuburb] = useState('')
  const [offenceCodes, setOffenceCodes] = useState('')
  const [startTime, setStartTime] = useState(new Date('1974-01-01'))
  const [endTime, setEndTime] = useState(new Date())

  const tabs = [
    {
      title: 'Table Data',
      icon: <Icon icon="majesticons:table" />,
      description:
        'This is the indicator data for all locations so that you can clearly know the specific value.',
      content: (
        <LocationTable
          data={expiationStats}
          suburb={suburb}
          startTime={startTime}
          endTime={endTime}
          offenceCodes={offenceCodes}
        />
      ),
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
      <Filter
        expiationStats={expiationStats}
        setExpiationStats={setExpiationStats}
        expiations={expiations}
        setExpiations={setExpiations}
        suburb={suburb}
        setSuburb={setSuburb}
        offenceCodes={offenceCodes}
        setOffenceCodes={setOffenceCodes}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <FilterMap />
      <SuggestionPanel locations={expiationStats} />

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

export default Dashboard
