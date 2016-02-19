// utility methods adapted from angular-patternfly.js

export function getDefaultDonutConfig () {
  return {
    donut: {
      label: {
        show: false
      },
      width: 11
    },
    size: {
      height: 171 // produces a diameter of 150 and a centered chart
    },
    legend: {
      show: false
    },
    color: {
      pattern: ['#0088CE', '#D1D1D1']
    },
    tooltip: {
      show: false
    }
  }
}
