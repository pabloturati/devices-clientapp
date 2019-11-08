import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'atomicDesign/atoms/Dropdown/Dropdown'
import './Controls.scss'

const Controls = props => {
  return (
    <div className='o__controls'>
      <h2>Controls</h2>
      <div className='o__controls__drop-container'>
        <Dropdown />
        <Dropdown />
        <Dropdown />
      </div>
    </div>
  )
}

Controls.propTypes = {}

export default Controls
