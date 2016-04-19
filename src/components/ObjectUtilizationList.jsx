import React, { PropTypes } from 'react'
const { string, number, shape, oneOf, arrayOf, func } = PropTypes
import classNames from 'classnames'
import UtilizationBarChart from './patternfly/UtilizationBarChart'

function ObjectUtilizationList ({ data, unit, emptyListText, thresholds, utilizationBarFooterLabelFormat, onObjectNameClick }) {
  if (data.length === 0) {
    return (
      <div className='no-overutilized'>{emptyListText}</div>
    )
  }

  const sortedData = data.slice().sort((a, b) => {
    return (b.used / b.total) - (a.used / a.total)
  })

  return (
    <div className='overutilized-container'>
      <div className='overutilized-section'>
        {sortedData.map((item) => (
          <div key={item.name} className='row'>
            <div className='col-md-2 text-right'>
              <a href='#' onClick={(event) => {
                event.preventDefault()
                onObjectNameClick(item)
              }}>{item.name}</a>
            </div>
            <div className='col-md-9'>
              <UtilizationBarChart
                used={item.used}
                total={item.total}
                unit={unit}
                thresholds={thresholds}
                layout='inline'
                footerLabelFormat={utilizationBarFooterLabelFormat} />
            </div>
            <div className='col-md-1'>
              {item.trend !== 'same' &&
                <span className={classNames('pficon', {
                  'pficon-trend-up': item.trend === 'up',
                  'pficon-trend-down': item.trend === 'down'
                })}/>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const dataItemShape = ObjectUtilizationList.dataItemShape = {
  name: string,
  used: number,
  total: number,
  trend: oneOf(['up', 'down', 'same'])
}

ObjectUtilizationList.propTypes = {
  data: arrayOf(shape(dataItemShape)).isRequired,
  unit: string.isRequired,
  emptyListText: string.isRequired,
  thresholds: UtilizationBarChart.propTypes.thresholds,
  utilizationBarFooterLabelFormat: UtilizationBarChart.propTypes.footerLabelFormat,
  onObjectNameClick: func // (dataItem:object) => void
}

ObjectUtilizationList.defaultProps = {
  thresholds: UtilizationBarChart.defaultProps.thresholds,
  utilizationBarFooterLabelFormat: UtilizationBarChart.defaultProps.footerLabelFormat,
  onObjectNameClick () {}
}

export default ObjectUtilizationList
