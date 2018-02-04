import React from 'react'
import { node, instanceOf } from 'prop-types'
import ReactDOM from 'react-dom'

// Use <RenderInto> to control where (into which DOM node) its children
// will be rendered, overriding the default component render hierarchy.

// This component effectively creates a "wormhole" that funnels React's
// DOM updates through to the target DOM node.

// For example:
//
//   <RenderInto targetElement={window.document.body}>
//     <ModalDialog />
//   </RenderInto>
//
// causes <ModalDialog> to be rendered as following:
//
// <body>
//   <div> <!-- RenderInto mount container -->
//     <!-- ModalDialog render output -->
//   </div>
// </body>

// Reference:
//   jamesknelson.com/rendering-react-components-to-the-document-body/

class RenderInto extends React.Component {
  componentDidMount () {
    this._container = document.createElement('div')
    this.props.targetElement.appendChild(this._container)
    ReactDOM.render(this.props.children, this._container)
  }

  componentDidUpdate () {
    ReactDOM.render(this.props.children, this._container)
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this._container)
    this.props.targetElement.removeChild(this._container)
  }

  render () {
    return null
  }
}

RenderInto.propTypes = {
  children: node,
  targetElement: instanceOf(HTMLElement).isRequired
}

export default RenderInto
