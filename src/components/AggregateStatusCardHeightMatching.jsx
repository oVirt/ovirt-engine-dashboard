import React, { PropTypes } from 'react'
import HeightMatchingGroup from 'react-height-matching-group'

class AggregateStatusCardHeightMatching extends React.Component {
  render () {
    return (
      <HeightMatchingGroup className={this.props.className} tagName='div' selector='.card-pf-aggregate-status .card-pf-title'>
        <HeightMatchingGroup tagName='div' selector='.card-pf-aggregate-status .card-pf-body'>
          {this.props.children}
        </HeightMatchingGroup>
      </HeightMatchingGroup>
    )
  }
}

AggregateStatusCardHeightMatching.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default AggregateStatusCardHeightMatching
