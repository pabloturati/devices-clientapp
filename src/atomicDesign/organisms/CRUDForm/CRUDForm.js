import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { STATION_TYPES } from 'projectData/constants'
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
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from 'reactstrap'
import BaseButton from 'atomicDesign/atoms/BaseButton/BaseButton'

const CRUDForm = ({ initData }) => {
  // Form values state handler. Initialized empty if creating new.
  const { content: formValues, updateVal } = useObject({
    systemName: initData ? initData.system_name : '',
    systemType: initData ? initData.type : STATION_TYPES[0].type, // Defaults to Windows PC
    hddCapacity: initData ? initData.hdd_capacity : ''
  })

  const { systemName, systemType, hddCapacity } = formValues

  // Redirect state handler
  const { toRedirect, activateRedirect } = useRedirect()

  // Error modal handler
  const { viewStatus, toggleViewStatus: toggleModal } = useToggleView()

  const handleSubmit = event => {
    event.preventDefault()
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

  const fields = [
    {
      type: 'text',
      name: 'o__crud-form__input__system_name',
      id: 'o__crud-form__input__system_name',
      placeholder: 'Name',
      value: systemName,
      onChange: event => {
        updateVal('systemName', event.target.value.toUpperCase())
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
      type: 'number',
      name: 'o__crud-form__input__hdd-capacity',
      id: 'o__crud-form__input__hdd-capacity',
      placeholder: 'HDD Capacity',
      value: hddCapacity,
      onChange: event => {
        updateVal('hddCapacity', event.target.value)
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
          <FormFeedback>
            Invalid name. Provide a valid sysmtem name
          </FormFeedback>
          <FormText>
            System name can include letters from a-z, numbers (0-9) and
            hyphen(-).
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
            Only numbers in the 1 to 10,000 range are allowed
          </FormFeedback>
          <FormText>Provide the HDD Capacity of the system in GB</FormText>
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
