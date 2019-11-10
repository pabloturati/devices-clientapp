import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'atomicDesign/atoms/Dropdown/Dropdown'
import BaseButton from 'atomicDesign/atoms/BaseButton/BaseButton'
import { SORT_BY_OPTIONS } from 'projectData/constants'
import './Controls.scss'

const Controls = ({ filterState, updateVal, deviceList, clearFilter }) => {
  const controls = [
    {
      label: 'Device type',
      value: filterState.currDeviceValue,
      onChange: newValue => updateVal('currDeviceValue', newValue),
      options: deviceList
    },
    {
      label: 'Sort by',
      value: filterState.currSortValue,
      onChange: newValue => updateVal('currSortValue', newValue),
      options: SORT_BY_OPTIONS
    }
  ]
  return (
    <div className='o__controls'>
      <h2>Filter devices</h2>
      <div className='o__controls__drop-container'>
        {controls.map((control, idx) => (
          <Dropdown key={idx} {...control} />
        ))}
      </div>
      <BaseButton content='Clear' action={clearFilter} />
    </div>
  )
}

Controls.propTypes = {
  deviceList: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterState: PropTypes.objectOf(PropTypes.string).isRequired,
  updateVal: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired
}

export default Controls
