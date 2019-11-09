import React from 'react'
import PropTypes from 'prop-types'
import CRUDForm from 'atomicDesign/organisms/CRUDForm/CRUDForm'

const CRUDPage = props => {
  return (
    <div className='p__crud-page'>
      <CRUDForm />
    </div>
  )
}

CRUDPage.propTypes = {}

export default CRUDPage
