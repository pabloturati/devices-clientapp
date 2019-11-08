import axios from 'axios'

const getParams = {
  method: 'GET',
  mode: 'no-cors',
  cache: 'default'
}

/**
 * Performs HTTP request to obtain data using GET
 * @function
 * @param {string} url - REQUIRED.  Fetch request URL
 * @param {function} successCb - REQUIRED. Callback function if successful request.
 * @param {function} successCb - OPTIONAL. Callback function if error in request.
 * @returns {void} - calls success or error callback with the server response
 */

export const getData = async (url, successCb, errorCb) => {
  await axios
    .get(url, getParams)
    .then(response => successCb(response.data))
    .catch(error => {
      console.error(error)
      if (errorCb) errorCb(error)
    })
}
