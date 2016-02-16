import React from 'react'

// Angular reference:
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/donut/donut-pct-chart-directive.js
//  https://github.com/patternfly/angular-patternfly/blob/master/src/charts/donut/donut-pct-chart.html

function DonutPctChart ({ used, total }) {
  return (
    <div className="donut-chart-pf">
      <div></div> {/* render chart into this div */}
    </div>
  )
}

DonutPctChart.propTypes = {
  used: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
}

export default DonutPctChart
