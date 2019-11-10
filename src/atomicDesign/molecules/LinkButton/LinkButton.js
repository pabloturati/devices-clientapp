import React from 'react'
import PropTypes from 'prop-types'
import BaseButton from 'atomicDesign/atoms/BaseButton/BaseButton'
import { Link } from 'react-router-dom'

const LinkButton = ({ to, content, size }) => (
  <Link to={to} className='m__link-button'>
    <BaseButton content={content} size={size} />
  </Link>
)

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  size: PropTypes.string
}

export default LinkButton
