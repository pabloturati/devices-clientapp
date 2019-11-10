import React from 'react'
import PropTypes from 'prop-types'
import CustomModal from 'atomicDesign/molecules/CustomModal/CustomModal'
import BaseButton from 'atomicDesign/atoms/BaseButton/BaseButton'
import './NotifyModal.scss'

const NotifyModal = ({
  isModalOpen,
  toggleModal,
  header,
  message,
  buttonLabel
}) => (
  <CustomModal isModalOpen={isModalOpen} toggleModal={toggleModal}>
    <div className='o__notify-modal'>
      {header && <h1>{header}</h1>}
      {message && <p>{message}</p>}
      <div className='o__notify-modal__button'>
        <BaseButton content={buttonLabel} size='md' action={toggleModal} />
      </div>
    </div>
  </CustomModal>
)

NotifyModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  header: PropTypes.string,
  message: PropTypes.string,
  buttonLabel: PropTypes.string
}

NotifyModal.defaultProps = {
  header: null,
  message: null,
  buttonLabel: 'OK'
}

export default NotifyModal
