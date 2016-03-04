// utility methods adapted from angular-patternfly.js

// TODO(vs) these should be taken out of 'patternfly.charts' Angular module

export function getDefaultDonutConfig () {
  return {
    donut: {
      label: {
        show: false
      },
      width: 11
    },
    size: {
      height: 171
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

export function getDefaultSparklineConfig () {
  return {
    area: {
      zerobased: true
    },
    size: {
      height: 60
    },
    axis: {
      x: {
        show: false
      },
      y: {
        show: false
      }
    },
    color: {
      pattern: ['#0088CE', '#00659C', '#3F9C35', '#EC7A08', '#CC0000']
    },
    legend: {
      show: false
    },
    point: {
      r: 1,
      focus: {
        expand: {
          r: 4
        }
      }
    },
    tooltip: {
      contents (d) {
        return `<span class='c3-tooltip-sparkline'>${d[0].value} ${d[0].name}</span>`
      }
    }
  }
}
