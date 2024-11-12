import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function LocationTable({ data }) {
  console.log(data)
  return (
    <>
      <div>
        <h2>Stat of camera locations</h2>
        <table>
          <thead>
            <tr>
              <th>Location ID</th>
              <th>Road Name</th>
              <th>Road Type</th>
              <th>Camera Type</th>
              <th>Total Offences Count</th>
              <th>Total Demerits</th>
              <th>Total Fee Sum</th>
              <th>Avg Demerits Per Day</th>
              <th>Avg Fee Per Day</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((d, index) => (
                <tr key={index}>
                  <th>{d.locationId}</th>
                  <th>{d.roadName}</th>
                  <th>{d.roadType}</th>
                  <th>{d.cameraType1}</th>
                  <th>{d.totalOffencesCount}</th>
                  <th>{d.totalDemerits}</th>
                  <th>{d.totalFeeSum}</th>
                  <th>{d.avgDemeritsPerDay}</th>
                  <th>{d.avgFeePerDay}</th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )

  // )
}

export default LocationTable
