import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { STATION_TYPES, FIELD_LENGTHS } from 'projectData/constants'
import apiEndpoints from 'projectData/apiEndpoints'
import NotifyModal from 'atomicDesign/organisms/NotifyModal/NotifyModal'
import './CRUDForm.scss'
import {
  useObject,
  useRedirect,
  useToggleView
} from 'sharedFunctions/customHooks'
import { postData, updateData } from 'sharedFunctions/apiRequest'
import routes from 'projectData/routes'
import REGEX from 'projectData/regex'
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from 'reactstrap'
import BaseButton from 'atomicDesign/atoms/BaseButton/BaseButton'

const deviceNameRegex = new RegExp(REGEX.deviceName, 'gi')
const numberRegex = new RegExp(REGEX.numbers, 'g')
const { deviceMaxLength, maxHddCapacity } = FIELD_LENGTHS

const CRUDForm = ({ initData }) => {
  const initialValues = {
    systemName: initData ? initData.system_name : '',
    systemType: initData ? initData.type : STATION_TYPES[0].type, // Defaults to Windows PC
    invalidSystemName: false,
    invalidHddCapacity: false,
    hddCapacity: initData ? initData.hdd_capacity : ''
  }

  // Form values state handler. Initialized empty if creating new.
  const { content: formValues, updateVal, mergeObj } = useObject(initialValues)

  const updateValues = () => {
    mergeObj(initialValues)
  }

  useEffect(updateValues, [initData])

  const {
    systemName,
    systemType,
    hddCapacity,
    invalidSystemName,
    invalidHddCapacity
  } = formValues

  // Redirect state handler
  const { toRedirect, activateRedirect } = useRedirect()

  // Error modal handler
  const { viewStatus, toggleViewStatus: toggleModal } = useToggleView()

  const validateForm = () => {
    const validation = {
      invalidSystemName: false,
      invalidHddCapacity: false
    }
    if (!systemName || systemName.length === 0) {
      validation.invalidSystemName = true
    }
    if (!hddCapacity || hddCapacity.length === 0) {
      validation.invalidHddCapacity = true
    }
    const { invalidSystemName, invalidHddCapacity } = validation
    mergeObj(validation)
    return invalidSystemName || invalidHddCapacity
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!validateForm()) {
      const body = {
        system_name: systemName,
        type: matchSystemType(systemType),
        hdd_capacity: `${hddCapacity}`
      }

      // Update the device or create a new one
      if (initData) {
        updateData(
          `${apiEndpoints.updateDevice}/${initData.id}`,
          body,
          toggleModal
        )
      } else {
        postData(apiEndpoints.postDevice, body, toggleModal)
      }
    }
  }

  const getValidatedValue = (value, regex) => {
    return value !== '' && value.match(regex) ? value.match(regex)[0] || '' : ''
  }

  const fields = [
    {
      type: 'text',
      name: 'o__crud-form__input__system_name',
      id: 'o__crud-form__input__system_name',
      placeholder: 'Name',
      value: systemName,
      invalid: invalidSystemName,
      onChange: event => {
        const { value } = event.target
        const validatedValue = getValidatedValue(
          event.target.value,
          deviceNameRegex
        )
        // Limit the number of characters
        if (value.length <= deviceMaxLength) {
          updateVal('systemName', validatedValue.toUpperCase())
        }
      }
    },
    {
      type: 'select',
      name: 'o__crud-form__input__type',
      id: 'o__crud-form__input__type',
      value: systemType,
      onChange: event => {
        updateVal('systemType', event.target.value)
      }
    },
    {
      type: 'text',
      name: 'o__crud-form__input__hdd-capacity',
      id: 'o__crud-form__input__hdd-capacity',
      placeholder: 'HDD Capacity',
      value: hddCapacity,
      invalid: invalidHddCapacity,
      onChange: event => {
        const { value } = event.target
        const validatedValue = value
          ? parseInt(getValidatedValue(event.target.value, numberRegex))
          : ''
        // Limit the numeric value
        if (validatedValue <= maxHddCapacity) {
          updateVal('hddCapacity', validatedValue)
        }
      }
    }
  ]

  const modalProps = {
    isModalOpen: viewStatus,
    toggleModal: () => activateRedirect(),
    header: 'Success!',
    message: `New ${systemName} with ${systemType} OS and ${hddCapacity} GB capacity was registered.`
  }

  if (toRedirect) return <Redirect to={routes.home} />

  return (
    <div className='o__crud-form'>
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label for={fields[0].id}>System Name</Label>
          <Input {...fields[0]} />
          <FormFeedback>Invalid name. Provide a valid system name</FormFeedback>
          <FormText>
            System name can include letters from a-z, numbers (0-9) and
            hyphen(-). Max 30 char.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for={fields[1].id}>Select</Label>
          <Input {...fields[1]}>
            {STATION_TYPES.map(station => (
              <option key={station.type}>{station.type}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for={fields[2].id}>Disk Capacity</Label>
          <Input {...fields[2]} />
          <FormFeedback>
            Only numbers in the 1 to 1,000,000 range are allowed
          </FormFeedback>
          <FormText>
            Provide the HDD Capacity of the system in GB. Maximum 1,000,000 GB.
          </FormText>
        </FormGroup>
        <BaseButton
          content={initData ? 'Update Device' : 'Create new device'}
          size='md'
          color='info'
          type='submit'
        />
      </Form>
      <NotifyModal {...modalProps} />
    </div>
  )
}

/**
 * Function to parse the system type from frontend (user friendly format)
 * to backend storage format.
 * @format
 * @param {string} systemType
 * @return - sytem type string in backend format.
 */

function matchSystemType (systemType) {
  return STATION_TYPES.filter(station => station.type === systemType)[0]
    .identifier
}

CRUDForm.propTypes = {
  initData: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
}

export default CRUDForm
