import React from 'react'
import PropTypes from 'prop-types'
import CustomModal from 'atomicDesign/molecules/CustomModal/CustomModal'
import BaseButton from 'atomicDesign/atoms/BaseButton/BaseButton'
import './ConfirmModal.scss'

const ConfirmModal = ({
  isModalOpen,
  onCancel,
  onProceed,
  header,
  message,
  proceedLabel,
  cancelLabel
}) => (
  <CustomModal isModalOpen={isModalOpen} toggleModal={onCancel}>
    <div className='o__confirm-modal'>
      {header && <h1>{header}</h1>}
      <div className='o__confirm-modal__container'>
        {message && <p>{message}</p>}
        <div className='o__confirm-modal__container__button-box'>
          <BaseButton content={cancelLabel} size='md' action={onCancel} />
          <BaseButton
            content={proceedLabel}
            size='md'
            action={onProceed}
            color='warning'
          />
        </div>
      </div>
    </div>
  </CustomModal>
)

ConfirmModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  header: PropTypes.string,
  message: PropTypes.string,
  buttonLabel: PropTypes.string,
  proceedLabel: PropTypes.string,
  cancelLabel: PropTypes.string
}

ConfirmModal.defaultProps = {
  header: null,
  message: null,
  proceedLabel: 'Proceed',
  cancelLabel: 'Cancel'
}

export default ConfirmModal
