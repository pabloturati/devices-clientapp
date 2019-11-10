import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import CRUDForm from 'atomicDesign/organisms/CRUDForm/CRUDForm'
import BaseButton from 'atomicDesign/atoms/BaseButton/BaseButton'
import apiEndpoints from 'projectData/apiEndpoints'
import NotifyModal from 'atomicDesign/organisms/NotifyModal/NotifyModal'
import ConfirmModal from 'atomicDesign/organisms/ConfirmModal/ConfirmModal'
import { deleteData, getData } from 'sharedFunctions/apiRequest'
import { useRedirect, useToggleView } from 'sharedFunctions/customHooks'
import { parseToFrontData } from 'sharedFunctions/sharedFunctions'
import routes from 'projectData/routes'
import './CRUDPage.scss'

const CRUDPage = ({ match, location }) => {
  // Redirect state handler
  const { toRedirect, activateRedirect } = useRedirect()

  let deviceId = null
  if (match.params.deviceId) {
    deviceId = match.params.deviceId
  }

  // Loading state. It no deviceId, goes to false.
  const [loading, setLoading] = useState(!!deviceId)

  // Notify delete modal
  const {
    viewStatus: notifyModalState,
    toggleViewStatus: toggleDeleteNotifyModal
  } = useToggleView()

  // Confirm delete modal
  const {
    viewStatus: confirmDeleteModalState,
    toggleViewStatus: toggleConfirmDeleteModal
  } = useToggleView()

  // Device data state from API (Applies only for EDIT)
  const [initialDeviceData, setInitialData] = useState(null)

  /** Parse the initial device data to frontend data and create messages */
  const handleGetDeviceSuccess = rawData => {
    parseToFrontData([rawData], parseData => setInitialData(parseData[0]))
    setLoading(false)
  }

  /**
   * If a deviceId is passed get it's data. (Applies only for EDIT)
   */
  const requestDeviceData = () => {
    if (!deviceId) return
    getData(`${apiEndpoints.getDevices}/${deviceId}`, handleGetDeviceSuccess)
  }
  useEffect(requestDeviceData, [deviceId])

  // Request API DELETEs device
  const requestDelete = () => {
    deleteData(
      `${apiEndpoints.deleteDevice}/${deviceId}`,
      toggleDeleteNotifyModal
    )
  }

  let confirmDeleteMessage, notifyDeleteMessage
  if (initialDeviceData) {
    const {
      system_name: systemName,
      hdd_capacity: capacity,
      type
    } = initialDeviceData
    confirmDeleteMessage = `You are about to delete ${type} named ${systemName} with ${capacity} GB, this action cannot be undone. Do you wish to proceed?`
    notifyDeleteMessage = `${type} named ${systemName} with ${capacity} GB and has been deleted.`
  }

  /** Notify a device was deleted */
  const notifyModalProps = {
    isModalOpen: notifyModalState,
    toggleModal: () => activateRedirect(),
    header: 'Deleted!',
    message: notifyDeleteMessage
  }

  /** Confirm if user wishes to delete a device */
  const confirmModalProps = {
    isModalOpen: confirmDeleteModalState,
    onProceed: () => {
      toggleConfirmDeleteModal()
      requestDelete()
    },
    proceedLabel: 'Delete',
    cancelLabel: ' Cancel',
    onCancel: toggleConfirmDeleteModal,
    header: 'Careful there!',
    message: confirmDeleteMessage
  }

  // Clears edit device data if location changes to add route
  const clearEditData = () => {
    if (location.pathname === routes.add) {
      deviceId = null
      setInitialData(null)
    }
  }
  useEffect(clearEditData, [location])

  if (toRedirect) return <Redirect to={routes.home} />

  return (
    <div className='p__crud-page'>
      {!loading && <CRUDForm initData={initialDeviceData} />}
      {deviceId && (
        <BaseButton
          action={toggleConfirmDeleteModal}
          content={'Delete device'}
          size='lg'
          color={'warning'}
        />
      )}
      <NotifyModal {...notifyModalProps} />
      <ConfirmModal {...confirmModalProps} />
    </div>
  )
}

CRUDPage.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object])
  ),
  location: PropTypes.object.isRequired
}

export default CRUDPage
