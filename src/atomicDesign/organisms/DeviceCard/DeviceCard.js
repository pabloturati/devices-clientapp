import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ContentLabel from 'atomicDesign/molecules/ContentLabel/ContentLabel'
import routes from 'projectData/routes'
import './DeviceCard.scss'

const DeviceCard = ({
  id,
  hdd_capacity: capacity,
  system_name: systemName,
  type,
  logo,
  drive
}) => {
  const fields = [
    { label: 'Type: ', content: type, customClass: 'type' },
    { label: 'System name:', content: systemName, customClass: 'system_name' }
  ]
  const capacityLabel = {
    label: 'Capacity:',
    content: `${capacity} GB`,
    customClass: 'hdd_capacity'
  }

  return (
    <Link to={`${routes.edit}/${id}`} className='o__device-card'>
      <div>
        <div>
          {fields.map((field, idx) => (
            <ContentLabel key={idx} {...field} />
          ))}
        </div>
        <div className='o__device-card__capacity'>
          <img src={drive} alt='Disk' />
          <ContentLabel {...capacityLabel} />
        </div>
      </div>
      <img className='o__device-card__type-img' src={logo} alt='System logo' />
    </Link>
  )
}

DeviceCard.propTypes = {
  id: PropTypes.string.isRequired,
  hdd_capacity: PropTypes.number.isRequired,
  system_name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  drive: PropTypes.string.isRequired
}

DeviceCard.defaultProps = {
  logo: '',
  drive: ''
}

export default DeviceCard
