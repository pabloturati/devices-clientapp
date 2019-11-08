import React from 'react'
import PropTypes from 'prop-types'
import ContentLabel from 'atomicDesign/molecules/ContentLabel/ContentLabel'
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
    { label: 'Type: ', content: type },
    { label: 'System name:', content: systemName }
  ]

  return (
    <div className='o__device-card'>
      <div>
        <div>
          {fields.map((field, idx) => (
            <ContentLabel key={idx} {...field} />
          ))}
        </div>
        <div className='o__device-card__capacity'>
          <img src={drive} alt='Disk' />
          <ContentLabel label='Capacity:' content={`${capacity} GB`} />
        </div>
      </div>
      <img className='o__device-card__type-img' src={logo} alt='System logo' />
    </div>
  )
}

DeviceCard.propTypes = {
  id: PropTypes.string.isRequired,
  hdd_capacity: PropTypes.string.isRequired,
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
