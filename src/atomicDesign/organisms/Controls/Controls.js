import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'atomicDesign/atoms/Dropdown/Dropdown'
import { sortByOptions } from 'projectData/constants'
import './Controls.scss'

const Controls = ({ devices }) => {
  // Device type
  const [device, setDevice] = useState('')

  // Sort
  const [sortBy, setSortBy] = useState('')

  const controls = [
    {
      label: 'Device type',
      value: device,
      onChange: setDevice,
      options: devices ? createDeviceList(devices) : []
    },
    {
      label: 'Sort by',
      value: sortBy,
      onChange: setSortBy,
      options: sortByOptions
    }
  ]

  return (
    <div className='o__controls'>
      <h2>Filter devices</h2>
      <div className='o__controls__drop-container'>
        {controls.map((device, idx) => (
          <Dropdown key={idx} {...device} />
        ))}
      </div>
    </div>
  )
}

/**
 * Create a unique array of system names based on the available devices
 * @function
 * @param {array} devices - Array of device objects
 * @returns {array} - Array of unique system names and an "All" key
 */

function createDeviceList (devices) {
  const typeArray = devices.map(device => device.type)
  return ['All', ...new Set(typeArray)]
}

Controls.propTypes = {
  devices: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired
  )
}

export default Controls
