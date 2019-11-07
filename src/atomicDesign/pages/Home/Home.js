import React from 'react'
import PropTypes from 'prop-types'
import Header from 'App/node_modules/atomicDesign/organisms/Header'
import Controls from 'App/node_modules/atomicDesign/organisms/Controls'
import Results from 'App/node_modules/atomicDesign/organisms/Results'

const Home = props => {
  return (
    <div className='p__home'>
      <Header />
      <Controls />
      <Results />
    </div>
  )
}

Home.propTypes = {}

export default Home
