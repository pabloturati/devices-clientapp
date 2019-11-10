import { STATION_TYPES } from 'projectData/constants'

/**
 * Maps backend raw data to frontend data.
 * @function
 * @param {object} devices - Array of device data objects
 * @returns {void} - Actions:
 *  1. Parses Hdd_capacity from string to integer to be used for comparison.
 *  2. Matches system type to disk and system logos
 *  3. Updates devices object data and udpates component state.
 */
export const parseToFrontData = (devices, setDataCb) => {
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
  setDataCb(devices)
}
