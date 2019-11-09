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

/**
 * Performs HTTP request to create a new device using POST
 * @function
 * @param {string} url - REQUIRED.  Fetch request URL
 * @param {function} successCb - REQUIRED. Callback function if successful request.
 * @param {function} successCb - OPTIONAL. Callback function if error in request.
 * @returns {void} - calls success or error callback with the server response
 */

const config = {
  method: 'POST',
  header: {
    'Content-Type': 'application/json'
  }
}

export const postData = async (url, body, successCb, errorCb) => {
  await axios
    .post(url, body, config)
    .then(response => successCb(response.data))
    .catch(error => {
      console.error(error)
      if (errorCb) errorCb(error)
    })
}
