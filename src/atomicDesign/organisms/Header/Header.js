import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { ButtonGroup } from 'reactstrap'
import LinkButton from 'atomicDesign/molecules/LinkButton/LinkButton'
import logo from 'projectAssets/Logo_header.svg'
import routes from 'projectData/routes'
import './Header.scss'

const { home, add } = routes

const RoutedHeader = props => {
  const { pathname } = props.location
  return (
    <header className='o__header'>
      <div className='o__header__titles'>
        <Link to={home}>
          <img src={logo} alt='Ninja RMM logo' />
        </Link>
        <h1>Device management tool</h1>
      </div>
      <ButtonGroup className='o__header__nav' size='sm'>
        {pathname !== home && <LinkButton to={home} content={'Device List'} />}
        {pathname !== add && <LinkButton to={add} content={'Add device'} />}
      </ButtonGroup>
    </header>
  )
}

const Header = withRouter(RoutedHeader)

RoutedHeader.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
}

export default Header
