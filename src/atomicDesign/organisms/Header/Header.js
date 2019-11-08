import React from 'react'
import PropTypes from 'prop-types'
import logo from 'projectAssets/Logo_header.svg'
import './Header.scss'

const Header = props => {
  return (
    <header className='o__header'>
      <img src={logo} alt='Ninja RMM logo' />
      <h1>Device management tool</h1>
    </header>
  )
}

Header.propTypes = {}

export default Header
