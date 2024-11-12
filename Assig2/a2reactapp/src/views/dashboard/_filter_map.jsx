import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import * as d3 from 'd3'

function FilterMap() {
  return <></>
  // const center = {
  //   lat: -3.745,
  //   lng: -38.523,
  // }

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: 'YOUR_API_KEY',
  // })

  // const [map, setMap] = useState(null)

  // const onLoad = useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center)
  //   map.fitBounds(bounds)

  //   setMap(map)
  // }, [])

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  // return isLoaded ? (
  //   <GoogleMap center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
  //     {/* Child components, such as markers, info windows, etc. */}
  //     <></>
  //   </GoogleMap>
  // ) : (
  //   <></>
  // )
}

export default FilterMap
