const initialState = { text: '', style: '' }

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case 'SHOW_ERROR':
    return { text: payload.text, style: payload.style }
  case 'REMOVE_MESSAGE':
    return initialState
  case 'SHOW_NOTIFICATION':
    return { text: payload.text, style: payload.style }
  default:
    return state
  }
}

export default reducer

export const showError = (text) => {
  return async dispatch => {

    await setTimeout(() => {dispatch({ type: 'REMOVE_MESSAGE' })}, 3000)

    dispatch({
      type: 'SHOW_ERROR',
      payload: {
        text: text,
        style: 'error'
      }
    })

  }
}

export const showNotification = (text) => {

  return async dispatch => {

    await setTimeout(() => {dispatch({ type: 'REMOVE_MESSAGE' })}, 1000)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: {
        text: text,
        style: 'notification'
      }
    })
  }
}

export const clearNotification = () => {

  return ({ type: 'REMOVE_MESSAGE' })
}


