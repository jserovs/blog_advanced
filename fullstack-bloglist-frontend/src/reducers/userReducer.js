const initialState = null

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case 'LOG_IN':    
    return payload
  case 'CLEAN_USER':
    return initialState
  default:
    return state
  }
}


export const logIn = (user)  => {

  return ({
    type: 'LOG_IN',
    payload: user
  })
}

export const logOut = ()  => {
  return ({
    type: 'CLEAN_USER',
    payload: ''
  })
}

export default reducer