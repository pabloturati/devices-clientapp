import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'

const CustomModal = ({ isModalOpen, toggleModal, children }) => (
  <Modal isOpen={isModalOpen} toggle={toggleModal} centered>
    <ModalBody>{children}</ModalBody>
  </Modal>
)

CustomModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default CustomModal
