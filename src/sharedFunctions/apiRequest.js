import axios from 'axios'

const getParams = {
  method: 'GET',
  mode: 'no-cors',
  cache: 'default'
}

/**
 * Performs HTTP GET request to obtain data
 * @function
 * @param {string} url - REQUIRED.  Fetch request URL
 * @param {function} successCb - REQUIRED. Callback function if successful request.
 * @param {function} errorCb - OPTIONAL. Callback function if error in request.
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
 * Performs HTTP POST request to create a new device
 * @function
 * @param {string} url - REQUIRED.  Fetch request URL
 * @param {function} successCb - REQUIRED. Callback function if successful request.
 * @param {function} errorCb - OPTIONAL. Callback function if error in request.
 * @returns {void} - calls success or error callback with the server response
 */

const postConfig = {
  method: 'POST',
  header: {
    'Content-Type': 'application/json'
  }
}

export const postData = async (url, body, successCb, errorCb) => {
  await axios
    .post(url, body, postConfig)
    .then(response => successCb(response.data))
    .catch(error => {
      console.error(error)
      if (errorCb) errorCb(error)
    })
}

/**
 * Performs HTTP PUT request to update an existing device
 * @function
 * @param {string} url - REQUIRED.  Fetch request URL
 * @param {function} successCb - REQUIRED. Callback function if successful request.
 * @param {function} errorCb - OPTIONAL. Callback function if error in request.
 * @returns {void} - calls success or error callback with the server response
 */

const putConfig = {
  method: 'PUT',
  header: {
    'Content-Type': 'application/json'
  }
}

export const updateData = async (url, body, successCb, errorCb) => {
  await axios
    .put(url, body, putConfig)
    .then(response => successCb(response.data))
    .catch(error => {
      console.error(error)
      if (errorCb) errorCb(error)
    })
}

/**
 * Performs HTTP DELETE request to remove an existing device
 * @function
 * @param {string} url - REQUIRED.  Delete request URL. Must include the device id to DELETE.
 * @param {function} successCb - REQUIRED. Callback function if successful request.
 * @param {function} errorCb - OPTIONAL. Callback function if error in request.
 * @returns {void} - calls success or error callback with the server response
 */

export const deleteData = async (url, successCb, errorCb) => {
  await axios
    .delete(url)
    .then(response => successCb(response.data))
    .catch(error => {
      console.error(error)
      if (errorCb) errorCb(error)
    })
}
