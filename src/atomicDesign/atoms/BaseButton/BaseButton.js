import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const BaseButton = ({ size, content, action, color, type }) => (
  <Button
    className='a__base-button'
    size={size}
    onClick={action}
    color={color}
    type={type}
  >
    {content}
  </Button>
)

BaseButton.propTypes = {
  size: PropTypes.string,
  content: PropTypes.string.isRequired,
  action: PropTypes.func,
  color: PropTypes.string,
  type: PropTypes.string
}

BaseButton.defaultProps = {
  size: 'sm',
  action: () => null,
  color: 'secondary'
}

export default BaseButton
