import React, { PropTypes } from 'react'
const { string, node } = PropTypes
import $ from 'jquery'
import { msg } from '../../intl_messages'

// TODO(vs) Bootstrap suggests to put modal's HTML right under document's body
// It's probably better to have a reusable function implemented using jQuery
// to show modal dialogs, making sure that modal's <div> gets appended to the
// right document's body (e.g. `parent.document.body`)

class ModalDialog extends React.Component {

  render () {
    return (
      <div className={`modal fade ${this.props.modalContainerClass}`} role='dialog' ref={(e) => { this._modalContainer = e }}>
        <div className='modal-dialog'>
          <div className='modal-content'>

            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{this.props.title}</h4>
            </div>

            <div className='modal-body'>{this.props.children}</div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' data-dismiss='modal'>{msg.closeButton()}</button>
            </div>

          </div>
        </div>
      </div>
    )
  }

  show () {
    $(this._modalContainer).modal()
  }

}

ModalDialog.propTypes = {
  children: node,
  title: string.isRequired,
  modalContainerClass: string
}

ModalDialog.defaultProps = {
  modalContainerClass: ''
}

export default ModalDialog
