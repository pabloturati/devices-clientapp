import React from 'react'
import PropTypes from 'prop-types'
import './ContentLabel.scss'

const ContentLabel = ({ label, content }) => (
  <div className='a__content-label'>
    <h5>{label}</h5>
    <span>{content}</span>
  </div>
)

ContentLabel.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default ContentLabel
