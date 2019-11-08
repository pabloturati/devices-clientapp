import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Header from 'atomicDesign/organisms/Header/Header'
import Controls from 'atomicDesign/organisms/Controls/Controls'
import Results from 'atomicDesign/organisms/Results/Results'
import apiEndpoints from 'projectData/apiEndpoints'
import { getData } from 'helperFunctions/apiRequest'
import { stationTypes } from 'projectData/constants'

const Home = props => {
  const [allDevices, setDevices] = useState(null)

  const fetchDevices = () => {
    getData(apiEndpoints.getDevices, configureData)
  }

  /**
   * Maps backend raw data to frontend data.
   * @function
   * @param {object} devices
   * @returns {void} - Actions:
   *  1. Parses Hdd_capacity from string to integer to be used for comparison.
   *  2. Matches system type to disk and system logos
   *  3. Updates devices object data and udpates component state.
   */
  const configureData = devices => {
    // Maps backend data
    devices.forEach((device, idx) => {
      // Parse HDD data to int
      device.hdd_capacity = parseInt(device.hdd_capacity)

      // Matched type to logos
      const match = stationTypes.filter(
        stationType => device.type === stationType.identifier
      )[0]

      devices[idx] = { ...devices[idx], ...match }
    })
    setDevices(devices)
  }

  // Fetch complete device data from API on component did mount.
  useEffect(fetchDevices, [])

  return (
    <div className='p__home'>
      <Header />
      <Controls devices={allDevices} />
      <Results devices={allDevices} />
    </div>
  )
}

Home.propTypes = {}

export default Home
