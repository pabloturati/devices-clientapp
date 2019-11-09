import { useState } from 'react'

/**
 * Custom hook to handle object data management with persistant react state
 * @function
 * @param {object} initial - Initial content state
 */

export const useObject = initial => {
  const [content, setObj] = useState(initial)
  return {
    content,
    addToObj: (key, value) => {
      const obj = { [key]: value, ...content }
      setObj(obj)
    },
    updateVal: (key, value) => {
      const obj = { ...content }
      if (obj[key] !== undefined) {
        obj[key] = value
      }
      setObj({ ...obj })
    },
    removeItem: key => {
      const obj = { ...content }
      if (obj[key] !== undefined) delete obj[key]
      setObj(obj)
    },
    mergeObj: newObj => {
      const obj = { ...content, ...newObj }
      setObj(obj)
    }
  }
}

/**
 * Custom setState hook to handle navigation redirect
 * @function
 * @param {object} initial - Initial content state
 */

export const useRedirect = (initialRedirectStatus = false) => {
  const [toRedirect, setRedirect] = useState(initialRedirectStatus)
  return {
    toRedirect,
    activateRedirect: () => setRedirect(true)
  }
}

/**
 * Custom setState hook to toggle values
 * @function
 * @param {bool} initial - Initial content state
 */

export const useToggleView = (initialState = false) => {
  const [viewStatus, toggleStatus] = useState(initialState)
  return {
    viewStatus,
    toggleViewStatus: () => toggleStatus(!viewStatus)
  }
}
