import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
  InfoWindow,
} from '@vis.gl/react-google-maps'
import React from 'react'

function ReportMap({ locations, suburb }) {
  const [coordinates, setCoordinates] = useState([]) // 保存地址对应的坐标信息，格式为[{lat: xxx, lng: xxx, addr: '具体地址', rank: 数字, info: '详细信息'},...]
  const [selectedMarker, setSelectedMarker] = useState(null) // 用于记录当前选中的标记
  const [center, setCenter] = useState({ lat: -33.860664, lng: 151.208138 })
  const mapRef = useRef()

  // 利用Google Maps API获取地址坐标的函数（这里简化示例，实际需处理请求错误等情况）
  const getCoordinatesForLocations = async () => {
    const results = []
    for (const loc of locations) {
      // if we have cached local, use cached dat
      console.log(loc)
      const locationId = loc.locationId

      let data = localStorage.getItem(locationId)
      if (data === null) {
        console.log('no data, need fetch from google', locationId)
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            loc.roadName + ',' + suburb
          )}&key=AIzaSyAnQR_NvQRceJ4gWfcf503f6bCJqfgZc2c`
        )
        data = await response.json()
        if (data.results.length > 0) {
          localStorage.setItem(locationId, JSON.stringify(data))
          const { lat, lng } = data.results[0].geometry.location
          results.push({
            lat,
            lng,
            addr: loc.roadName + ',' + loc.suburb,
            rank: locationId,
            info: loc.roadName + ',' + loc.suburb,
          })
        }
      } else {
        console.log('have data cache!', locationId)
        data = JSON.parse(data)
        const { lat, lng } = data.results[0].geometry.location
        results.push({
          lat,
          lng,
          addr: loc.addr,
          rank: loc.rank,
          info: loc.info,
        })
      }
    }

    // set the first location as the center
    // console.log(mapRef)
    // mapRef?current?.setCenter(results[0])
    setCenter(results[0])

    setCoordinates(results)
  }

  useEffect(() => {
    console.log('locations changed...', locations)
    if (locations.length > 0) {
      getCoordinatesForLocations()
    } else {
      console.log('no locations')
    }
  }, [locations])

  useEffect(() => {
    console.log('init...')
    if (locations.length > 0) {
      getCoordinatesForLocations()
    } else {
      console.log('no locations')
    }
  }, [])

  return (
    <>
      <div className="h-[600px]">
        <Map
          ref={mapRef}
          defaultZoom={15}
          center={center}
          onCameraChanged={(ev) =>
            console.log(
              'camera changed:',
              ev.detail.center,
              'zoom:',
              ev.detail.zoom
            )
          }
        >
          {coordinates.map((loc, index) => (
            <Marker
              key={index}
              position={{ lat: loc.lat, lng: loc.lng }}
              onClick={() => setSelectedMarker(loc.addr)} // 点击标记时设置选中的标记索引
            >
              <div>{loc.rank}</div> {/* 在标记上显示排名 */}
            </Marker>
          ))}
          {selectedMarker !== null && (
            <InfoWindow
              position={{
                lat: coordinates[selectedMarker].lat,
                lng: coordinates[selectedMarker].lng,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>{coordinates[selectedMarker].info}</div>{' '}
              {/* 显示选中标记对应的详细信息 */}
            </InfoWindow>
          )}
        </Map>
      </div>
    </>
  )
}

export default ReportMap
