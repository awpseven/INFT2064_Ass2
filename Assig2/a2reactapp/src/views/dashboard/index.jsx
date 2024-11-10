import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Filter from './_filter'
import FilterMap from './_filter_map'
import SuggestionPanel from './_suggest_panel'
import { Icon } from '@iconify-icon/react'

function Dashboard() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <Filter />
      <FilterMap />
      <SuggestionPanel />
    </>
  )
}

export default Dashboard
