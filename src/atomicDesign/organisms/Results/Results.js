import React from 'react'
import PropTypes from 'prop-types'
import DeviceCard from 'atomicDesign/organisms/DeviceCard/DeviceCard'
import { stationTypes } from 'projectData/constants'
import './Results.scss'

const Results = ({ devices }) => {
  /** Matches the station type to the logo and disk image data then merges both data objects in the same array */
  devices &&
    devices.forEach((device, idx) => {
      const match = stationTypes.filter(
        stationType => device.type === stationType.identifier
      )[0]
      devices[idx] = { ...devices[idx], ...match }
    })

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
