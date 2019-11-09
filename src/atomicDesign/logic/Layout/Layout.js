import React from 'react'
import PropTypes from 'prop-types'
import Header from 'atomicDesign/organisms/Header/Header'
import './Layout.scss'

const Layout = ({ children }) => (
  <div className='l__layout'>
    <Header />
    {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
}

export default Layout
