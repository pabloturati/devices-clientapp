import React from 'react'
import PropTypes from 'prop-types'
import DeviceCard from 'atomicDesign/organisms/DeviceCard/DeviceCard'
import './Results.scss'

const Results = ({ devices }) => {
  return (
    <div className='o__results'>
      {devices &&
        devices.map(device => <DeviceCard key={device.id} {...device} />)}
    </div>
  )
}

Results.propTypes = {
  devices: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  )
}

Results.defaultProps = {
  devices: []
}

export default Results
