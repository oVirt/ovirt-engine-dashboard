import React, { PropTypes } from 'react'
const { string, number, shape, arrayOf } = PropTypes
import $ from 'jquery'
import d3 from 'd3'

// Angular reference:
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/heatmap/heatmap.directive.js
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/heatmap/heatmap.html

class HeatMap extends React.Component {

  constructor (props) {
    super(props)
    this._heatMapContainer = null
  }

  componentDidMount () {
    this._generateHeatMap(this.props)
  }

  componentWillReceiveProps (newProps) {
    this._updateHeatMap(newProps)
  }

  render () {
    const containerStyle = { height: this.props.height }
    return (
      <div className='heatmap-container' style={containerStyle} ref={(e) => { this._heatMapContainer = e }}>
        <svg className='pf-heatmap-svg' />
      </div>
    )
  }

  _generateHeatMap ({ data, thresholds }) {
    const containerWidth = this._heatMapContainer.clientWidth
    const containerHeight = this._heatMapContainer.clientHeight
    const blockSize = this._determineBlockSize({ containerWidth, containerHeight, numberOfBlocks: data.length })
    const numberOfRows = (blockSize === 0) ? 0 : Math.floor(containerHeight / blockSize)
    const color = d3.scale.threshold().domain(thresholds.domain).range(thresholds.colors)
    const blockPadding = 1

    function highlightBlock (block, active) {
      block.style('fill-opacity', active ? 1 : 0.4)
    }

    const svg = d3.select(this._heatMapContainer).select('svg.pf-heatmap-svg')
    svg.selectAll('*').remove()

    // generate heat map blocks
    const blocks = svg.selectAll('rect').data(data).enter().append('rect')
    blocks
      .attr('x', (d, i) => (Math.floor(i / numberOfRows) * blockSize) + blockPadding)
      .attr('y', (d, i) => (i % numberOfRows * blockSize) + blockPadding)
      .attr('width', blockSize - (2 * blockPadding))
      .attr('height', blockSize - (2 * blockPadding))
      .style('fill', (d) => color(d.value))
      .attr('data-index', (d, i) => i)
      .attr('data-role', 'heat-map-block')

    // attach event listeners
    blocks.on('mouseover', function () {
      blocks.call(highlightBlock, false)
      d3.select(this).call(highlightBlock, true)
    })
    svg.on('mouseleave', () => { blocks.call(highlightBlock, true) })

    // tooltips are done via jQuery
    $('rect[data-role=heat-map-block]', this._heatMapContainer).tooltip({
      animation: false,
      container: 'body',
      title: function () {
        return data[$(this).attr('data-index')].tooltip
      }
    })
  }

  _updateHeatMap (props) {
    this._generateHeatMap(props)
  }

  _determineBlockSize ({ containerWidth, containerHeight, numberOfBlocks }) {
    const x = containerWidth
    const y = containerHeight
    const n = numberOfBlocks
    const px = Math.ceil(Math.sqrt(n * x / y))
    const py = Math.ceil(Math.sqrt(n * y / x))

    let sx
    if (Math.floor(px * y / x) * px < n) {
      sx = y / Math.ceil(px * y / x)
    } else {
      sx = x / px
    }

    let sy
    if (Math.floor(py * x / y) * py < n) {
      sy = x / Math.ceil(x * py / y)
    } else {
      sy = y / py
    }

    return Math.max(sx, sy)
  }

}

HeatMap.propTypes = {
  height: number.isRequired,
  data: arrayOf(shape({
    value: number, // from range <0, 1>
    tooltip: string
  })).isRequired,
  thresholds: shape({
    domain: arrayOf(number), // threshold scale domain
    colors: arrayOf(string)  // threshold scale range
  })
}

HeatMap.defaultProps = {
  thresholds: {
    domain: [0.7, 0.8, 0.9],
    colors: ['#D4F0FA', '#F9D67A', '#EC7A08', '#CE0000']
  }
}

export default HeatMap
