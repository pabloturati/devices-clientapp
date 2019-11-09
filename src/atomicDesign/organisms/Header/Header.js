import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import logo from 'projectAssets/Logo_header.svg'
import { Button, ButtonGroup } from 'reactstrap'
import routes from 'projectData/routes'
import './Header.scss'

const { home, add } = routes

const RoutedHeader = props => {
  const { pathname } = props.location
  return (
    <header className='o__header'>
      <Link to={home}>
        <img src={logo} alt='Ninja RMM logo' />
      </Link>
      <h1>Device management tool</h1>
      <ButtonGroup className='o__header__nav' size='sm'>
        {pathname !== home && (
          <Link to={home} size='sm'>
            <Button size='sm'>Device List</Button>
          </Link>
        )}
        {pathname !== add && (
          <Link to={add}>
            <Button size='sm'>Add device</Button>
          </Link>
        )}
      </ButtonGroup>
    </header>
  )
}

const Header = withRouter(RoutedHeader)

RoutedHeader.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
}

export default Header
