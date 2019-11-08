import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Header from 'atomicDesign/organisms/Header/Header'
import Controls from 'atomicDesign/organisms/Controls/Controls'
import Results from 'atomicDesign/organisms/Results/Results'
import apiEndpoints from 'projectData/apiEndpoints'
import {
  STATION_TYPES,
  BASE_FILTER_FLAGS,
  SORT_BY_OPTIONS
} from 'projectData/constants'
import { getData } from 'sharedFunctions/apiRequest'
import { useObject } from 'sharedFunctions/customHooks'

const { all, none } = BASE_FILTER_FLAGS

const Home = props => {
  // State handler for API device list
  const [allDevices, setDevices] = useState(null)
  const [visibleDevices, setVisibleDevices] = useState(null)
  const [deviceList, setDeviceList] = useState([])

  // State handler for filter status
  const { content: filterState, updateVal } = useObject({
    currDeviceValue: all,
    currSortValue: none
  })

  const fetchDevices = () => {
    getData(apiEndpoints.getDevices, devices =>
      configureData(devices, setDevices, setVisibleDevices, setDeviceList)
    )
  }

  // Fetch complete device data from API on component did mount.
  useEffect(fetchDevices, [])

  const updateVisibleDevices = () => {
    const { currDeviceValue, currSortValue } = filterState

    if (allDevices && allDevices.length > 0) {
      // Create a copy of the all devices to be initially visible
      let visibleDevices = [...allDevices]

      if (currDeviceValue !== all) {
        visibleDevices = filterDevices(allDevices, currDeviceValue)
      }
      if (currSortValue !== none) {
        sortDevices(visibleDevices, currSortValue)
      }
      setVisibleDevices([...visibleDevices])
    }
  }

  // Updates device list based on filter changes
  useEffect(updateVisibleDevices, [filterState])

  const controlProps = {
    deviceList,
    filterState,
    updateVal
  }

  return (
    <div className='p__home'>
      <Header />
      <Controls {...controlProps} />
      <Results devices={visibleDevices} />
    </div>
  )
}

/**
 * Maps backend raw data to frontend data.
 * @function
 * @param {object} devices - Array of device data objects
 * @returns {void} - Actions:
 *  1. Parses Hdd_capacity from string to integer to be used for comparison.
 *  2. Matches system type to disk and system logos
 *  3. Updates devices object data and udpates component state.
 */
function configureData (devices, setDevices, setVisibleDevices, setDeviceList) {
  // Maps backend data
  devices.forEach((device, idx) => {
    // Parse HDD data to int
    device.hdd_capacity = parseInt(device.hdd_capacity)

    // Matched type to logos
    const match = STATION_TYPES.filter(
      stationType => device.type === stationType.identifier
    )[0]

    devices[idx] = { ...devices[idx], ...match }
  })
  setDevices(devices)
  setVisibleDevices(devices)
  setDeviceList(createDeviceList(devices))
}

/**
 * Takes all of the device data and returns an array with only of those that meet the criteria
 * @function
 * @param {object} devices - Array of device data objects
 * @param {string} criteria - The device identifier
 * @returns {array} - Array of device data objects that meet the device type criteria
 */
function filterDevices (devices, criteria) {
  return devices.filter(devices => devices.type === criteria)
}

/**
 * Takes all visible data and returns an array with only of those that meet the criteria
 * @function
 * @param {object} devices - Array of devices data objects that are visible.
 * @param {string} criteria - The sort criteria
 * @returns {void} - sorts the original array passed according to specified criteria:
 *  - Alphabetica by system name
 *  - Increasing HDD capacity
 *  - Decreasing HDD capacity
 */

function sortDevices (devices, criteria) {
  const [, systemName, increasingCapacity, decreasingCapacity] = SORT_BY_OPTIONS
  if (criteria === systemName) {
    devices.sort((a, b) => {
      if (a.system_name === b.system_name) return 0
      return a.system_name > b.system_name ? 1 : -1
    })
  }
  if (criteria === increasingCapacity) {
    devices.sort((a, b) => {
      if (a.hdd_capacity === b.hdd_capacity) return 0
      return a.hdd_capacity > b.hdd_capacity ? -1 : 1
    })
  }
  if (criteria === decreasingCapacity) {
    devices.sort((a, b) => {
      if (a.hdd_capacity === b.hdd_capacity) return 0
      return a.hdd_capacity > b.hdd_capacity ? 1 : -1
    })
  }
}

/**
 * Create a unique array of system names based on the available devices
 * @function
 * @param {array} devices - Array of device objects
 * @returns {array} - Array of unique system names and an "All" key
 */

function createDeviceList (devices) {
  const typeArray = devices.map(device => device.type)
  return [all, ...new Set(typeArray)]
}

Home.propTypes = {}

export default Home
