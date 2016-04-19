import React, { PropTypes } from 'react'
const { string, number, bool, element, shape, oneOf } = PropTypes
import classNames from 'classnames'
import { formatNumber0D, formatNumber1D } from '../../utils/formatting'
import Tooltip from '../bootstrap/Tooltip'

// PatternFly reference:
//  https://www.patternfly.org/patterns/utilization-bar-chart/

// Angular reference:
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/utilization-bar/utilization-bar-chart.directive.js
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/utilization-bar/utilization-bar-chart.html

// TODO(vs) sync with latest Angular impl.

/*
  TODO(vs) update markup to match the latest PatternFly reference:
  <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;" data-toggle="tooltip" title="25% Used">
      <span class="sr-only">25% Used</span>
    </div>
    <div class="progress-bar progress-bar-remaining" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%;" data-toggle="tooltip" title="75% Available">
      <span class="sr-only">75% Available</span>
    </div>
  </div>
 */

function UtilizationBarChart ({
    used, total, unit, thresholds, layout, title, footer, footerLabelFormat,
    titleLabelWidth, footerLabelWidth
  }) {
  const percentUsed = used / total * 100
  const percentAvailable = 100 - percentUsed
  const useDefaultFooter = !footer

  const progressThresholdClass = thresholds.enabled && classNames({
    'progress-bar-success': (percentUsed < thresholds.warning),
    'progress-bar-warning': (percentUsed >= thresholds.warning && percentUsed <= thresholds.error),
    'progress-bar-danger': (percentUsed > thresholds.error)
  }) || ''

  return (
    <div className='pf-utilization-bar-chart'>

      {layout === 'regular' &&
        <span>
          {title && <div className='progress-description'>{title}</div>}
          <div className='progress progress-label-top-right'>

            {/* used progress */}
            <Tooltip text={`${formatNumber0D(percentUsed)}% Used`}>
              <div className={`progress-bar ${progressThresholdClass}`} style={{ width: `${percentUsed}%` }} role='progressbar'>
                {useDefaultFooter && footerLabelFormat === 'actual' &&
                  <span>
                    <strong>{formatNumber1D(used)} of {formatNumber1D(total)} {unit}</strong> Used
                  </span>
                }
                {useDefaultFooter && footerLabelFormat === 'percent' &&
                  <span>
                    <strong>{formatNumber0D(percentUsed)}%</strong> Used
                  </span>
                }
                {!useDefaultFooter && footer}
              </div>
            </Tooltip>

            {/* available progress */}
            <Tooltip text={`${formatNumber0D(percentAvailable)}% Available`}>
              <div className='progress-bar progress-bar-remaining' style={{ width: `${100 - percentUsed}%` }} role='progressbar'>
              </div>
            </Tooltip>

          </div>
        </span>
      }

      {layout === 'inline' &&
        <div className='progress-container progress-description-left progress-label-right'
          style={{ paddingLeft: titleLabelWidth, paddingRight: footerLabelWidth }}>
          {title && <div className='progress-description' style={{ maxWidth: titleLabelWidth }}>{title}</div>}
          <div className='progress'>

            {/* used progress */}
            <Tooltip text={`${formatNumber0D(percentUsed)}% Used`}>
              <div className={`progress-bar ${progressThresholdClass}`} style={{ width: `${percentUsed}%` }} role='progressbar'>
                {useDefaultFooter && footerLabelFormat === 'actual' &&
                  <span style={{ maxWidth: footerLabelWidth }}>
                    <strong>{formatNumber1D(used)} {unit}</strong> Used
                  </span>
                }
                {useDefaultFooter && footerLabelFormat === 'percent' &&
                  <span style={{ maxWidth: footerLabelWidth }}>
                    <strong>{formatNumber0D(percentUsed)}%</strong> Used
                  </span>
                }
                {!useDefaultFooter && footer}
              </div>
            </Tooltip>

            {/* available progress */}
            <Tooltip text={`${formatNumber0D(percentAvailable)}% Available`}>
              <div className='progress-bar progress-bar-remaining' style={{ width: `${100 - percentUsed}%` }} role='progressbar'>
              </div>
            </Tooltip>

          </div>
        </div>
      }
    </div>
  )
}

UtilizationBarChart.propTypes = {
  used: number.isRequired,
  total: number.isRequired,
  unit: string.isRequired,
  thresholds: shape({
    enabled: bool,
    warning: number,
    error: number
  }),
  layout: oneOf(['regular', 'inline']),
  title: string,   // custom title
  footer: element, // custom footer
  footerLabelFormat: oneOf(['actual', 'percent']),
  titleLabelWidth: string, // used with 'inline' layout
  footerLabelWidth: string // used with 'inline' layout
}

UtilizationBarChart.defaultProps = {
  thresholds: {
    enabled: true,
    warning: 60,
    error: 90
  },
  layout: 'regular',
  footerLabelFormat: 'actual'
}

export default UtilizationBarChart
