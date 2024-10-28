import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Filter from './_filter'
import FilterMap from './_filter_map'
import SuggestionPanel from './_suggest_panel'
import Logo from '../../assets/images/logo.png'
import { Icon } from '@iconify-icon/react'

function Dashboard() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col px-10">
        <div className="flex justify-between items-center">
          <div className="py-4 flex space-x-4 items-center">
            <img className="w-20" src={Logo} alt="logo" />
            <div className="flex flex-col">
              <h1 className="text-3xl font-extrabold">
                MPDC Dashboard for SAPOL
              </h1>
              <p>inft2064 Assignment Demo Website</p>
            </div>
          </div>
          <Link to={`/login`} className="text-3xl text-red-500">
            <Icon icon="material-symbols:logout" />
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <Filter />
          <FilterMap />
          <SuggestionPanel />
        </div>
      </div>
    </>
  )
}

export default Dashboard
