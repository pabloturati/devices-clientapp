import React from 'react'
import PropTypes from 'prop-types'
import './ContentLabel.scss'

const ContentLabel = ({ label, content, customClass }) => (
  <div className='a__content-label'>
    <h5>{label}</h5>
    <span className={customClass ? `a__content-label__${customClass}` : ''}>
      {content}
    </span>
  </div>
)

ContentLabel.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  customClass: PropTypes.string
}

export default ContentLabel
