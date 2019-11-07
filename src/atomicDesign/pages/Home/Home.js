import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Header from 'atomicDesign/organisms/Header/Header'
import Controls from 'atomicDesign/organisms/Controls/Controls'
import Results from 'atomicDesign/organisms/Results/Results'
// import apiEndpoints from 'projectData/apiEndpoints'
// import { getData } from 'helperFunctions/apiRequest'

const Home = props => {
  const [devices, setDevices] = useState(null)

  const fetchDevices = () =>
    getData(apiEndpoints.getDevices, devices => setDevices(devices))

  useEffect(fetchDevices, [])

  console.log(devices)

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
