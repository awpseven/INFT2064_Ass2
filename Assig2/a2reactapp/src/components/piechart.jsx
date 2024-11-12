// I used the following tutorial to create the current pie diagram
// https://d3-graph-gallery.com/graph/donut_label.html

import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'

const PieChart = ({ data, yLabel }) => {
  const svgRef = useRef()
  const [zeroMessage, setZeroMessage] = useState('')

  useEffect(() => {
    if (!data || data.length === 0) {
      return
    }

    // set the dimensions and margins of the graph
    var width = 450
    var height = 450
    var margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    const zeroLocationIds = []
    const garphData = {}
    for (const locationId in data) {
      const y = parseFloat(data[locationId])
      if (y === 0) {
        zeroLocationIds.push(locationId)
      } else {
        garphData[locationId] = y
      }
    }

    // 先获取当前的svg元素
    var svg = d3.select(svgRef.current)

    // 清空svg中之前绘制的与饼图相关的元素，这里以选择器来区分相关元素（可根据实际情况优化选择器更精准清除）
    svg.selectAll('path').remove()
    svg.selectAll('polyline').remove()
    svg.selectAll('text').remove()

    svg = svg
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    // set the color scale
    const locationIds = []
    for (var locationId in garphData) {
      locationIds.push(locationId)
    }
    var color = d3.scaleOrdinal().domain(locationIds).range(d3.schemeDark2)

    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d) => d[1])
    var data_ready = pie(Object.entries(garphData))

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data[1]))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)

    // Add the polylines between chart and labels:
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', function (d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d) // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1) // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      })

    // Add the polylines between chart and labels:
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) {
        console.log(d.data)
        return d.data[0]
      })
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d)
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1)
        return 'translate(' + pos + ')'
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return midangle < Math.PI ? 'start' : 'end'
      })

    const msg =
      zeroLocationIds.length === 0
        ? ''
        : 'Following locations have no data: ' + zeroLocationIds.join()
    setZeroMessage(msg)
  }, [data])

  return (
    <div>
      <svg width="500" height="500" ref={svgRef}></svg>
      <p>{zeroMessage}</p>
    </div>
  )
}

export default PieChart
