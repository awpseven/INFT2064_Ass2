import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const BarChart = ({ data, yLabel }) => {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || data.length === 0) {
      return
    }

    // sort values by y desc
    const sortedData = data.sort((a, b) => b.y - a.y)

    const svg = d3.select(svgRef.current)
    const margin = { top: 20, right: 20, bottom: 30, left: 60 }
    const width = +svg.attr('width') - margin.left - margin.right
    const height = +svg.attr('height') - margin.top - margin.bottom

    console.log({ width })
    console.log({ height })

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(sortedData.map((d) => d.x))

    let maxY = d3.max(sortedData, (d) => d.y)
    if (maxY === 0) {
      maxY = 100
    }
    console.log('max y:', maxY)

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, maxY + 10])

    // draw bar chart
    svg
      .selectAll('.bar')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.x))
      .attr('y', (d) => y(d.y))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.y))
      .attr('fill', 'steelblue')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    svg
      .selectAll('.bar-text')
      .data(sortedData)
      .enter()
      .append('text')
      .attr('class', 'bar-text')
      .text((d) => `${d.y}`)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('x', (d) => x(d.x) + x.bandwidth() / 2 - 3)
      .attr('y', (d) => y(d.y) - 3)
      .style('fill', 'black')

    // calculate avg y value
    const avgYValue = parseFloat(d3.mean(sortedData, (d) => d.y).toFixed(2))
    console.log(avgYValue, sortedData)

    // draw avg y line
    svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(avgYValue))
      .attr('y2', y(avgYValue))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('transform', `translate(${margin.left},${margin.top})`)

    svg
      .append('text')
      .attr('x', width - 200)
      .attr('y', y(avgYValue + maxY * 0.01))
      .text(`Average ${yLabel}: ${avgYValue}`)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .style('fill', 'red')

    // y label for y axis
    svg
      .append('text')
      .attr('x', -(height / 2) - margin.left)
      .attr('y', margin.top / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text(`${yLabel}`)
      .style('fill', 'black')

    // x label for x axis
    svg
      .append('text')
      .attr('x', width / 2 + margin.bottom)
      .attr('y', height + margin.top + margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Location ID')

    // set axises
    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(xAxis)

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis)
  }, [data])

  return <svg width="800" height="600" ref={svgRef}></svg>
}

export default BarChart
