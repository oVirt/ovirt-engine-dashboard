import React, { PropTypes } from 'react'
const { string, arrayOf } = PropTypes
import HeatMap from './HeatMap'

// Angular reference:
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/heatmap/heatmap-legend.directive.js
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/heatmap/heatmap-legend.html

function HeatMapLegend ({ colors, labels }) {
  const reversedColors = colors.slice().reverse()
  const reversedLabels = labels.slice().reverse()
  return (
    <div className='heatmap-legend heatmap-legend-container'>
      <ul className='heatmap-legend-container' style={{paddingLeft: 0}}>
        {reversedColors.map((color, index) => (
          <li key={index} className='heatmap-pf-legend-items'>
            <span className='color-box' style={{backgroundColor: color}}></span>
            <span className='legend-text'>{reversedLabels[index]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

HeatMapLegend.propTypes = {
  colors: arrayOf(string),
  labels: arrayOf(string)
}

HeatMapLegend.defaultProps = {
  colors: HeatMap.defaultProps.thresholds.colors,
  labels: ['< 70%', '70-80%', '80-90%', '> 90%']
}

export default HeatMapLegend
