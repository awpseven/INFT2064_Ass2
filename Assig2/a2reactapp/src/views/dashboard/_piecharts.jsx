import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import PieChart from '../../components/piechart'

function PieCharts({ data }) {
  const [currentTab, setCurrentTab] = useState(0)

  const drawCharts = (data) => {
    console.log(data)

    // make x+y data for all process

    const ylist = [
      {
        y: 'totalOffencesCount',
        yLabel: 'Total Offences Count',
      },
      {
        y: 'totalDemerits',
        yLabel: 'Total Demerits',
      },
      {
        y: 'totalFeeSum',
        yLabel: 'Total Fee Sum',
      },
      {
        y: 'avgDemeritsPerDay',
        yLabel: 'Avg Demerits Per Day',
      },
      {
        y: 'avgFeePerDay',
        yLabel: 'Avg Fee Per Day',
      },
    ]

    return ylist.map((e, index) => {
      const y = e.y
      const yLabel = e.yLabel

      // generate x+y data
      const xyData = {}
      data.forEach((d) => {
        xyData[d.locationId] = parseFloat(d[y])
      })

      console.log(xyData)

      return {
        title: yLabel + ' of Locations',
        content: <PieChart key={index} data={xyData} yLabel={yLabel} />,
      }
    })
  }

  const pieCharts = drawCharts(data)

  return (
    <>
      <div>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            {pieCharts.map((p, index) => (
              <li key={index} class="me-2" role="presentation">
                <button
                  class={
                    index === currentTab
                      ? 'inline-block p-4 border-b-2 rounded-t-lg text-blue-500'
                      : 'inline-block p-4 border-b-2 rounded-t-lg'
                  }
                  id={'p' + index + '-tab'}
                  data-tabs-target={'#p' + index}
                  type="button"
                  role="tab"
                  aria-controls={'p' + index}
                  aria-selected="false"
                  onClick={() => setCurrentTab(index)}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="default-tab-content">
          {pieCharts.map((p, index) => (
            <div
              key={index}
              className={
                currentTab === index
                  ? ' p-4 rounded-lg bg-gray-50 dark:bg-gray-800'
                  : 'hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800'
              }
              id={'p' + index}
              role="tabpanel"
              aria-labelledby={'p' + index + '-tab'}
            >
              {p.content}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default PieCharts
