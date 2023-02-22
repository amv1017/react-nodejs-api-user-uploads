import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const initialState = {
  isLoading: false,
  users: [],
  isRegisterMode: false,
}

export const getUsers = (): any => {
  return async (dispatch: any) => {
    dispatch({ type: 'GET_USERS' })
    const response = await axios.get(API_URL + '/users')
    if (response) {
      dispatch({ type: 'GET_USERS_COMPLETED', payload: response.data })
    }
    if (!response) {
      dispatch({ type: 'GET_USERS_FAILED' })
    }
  }
}

export const setRegisterMode = (payload: boolean): any => {
  return (dispatch: any) => {
    dispatch({
      type: 'SET_REGISTER_MODE',
      payload,
    })
  }
}

export const registerUser = (payload: any): any => {
  return async (dispatch: any) => {
    dispatch({ type: 'REGISTER_USER' })

    const response = await axios.post(API_URL + '/users', payload)

    console.log('response: ',response)
    if (response) {
      dispatch({ type: 'GET_USERS_COMPLETED', payload: response.data })
    }
    if (!response) {
      dispatch({ type: 'GET_USERS_FAILED' })
    }

  }
}

const userReducer = (state = initialState, action: any): any => {
  if (action.type === 'GET_USERS') {
    return {
      isLoading: true,
    }
  }

  if (action.type === 'GET_USERS_COMPLETED') {
    return {
      isLoading: false,
      users: action.payload,
    }
  }

  if (action.type === 'GET_USERS_FAILED') {
    return {
      isLoading: false,
      users: [],
    }
  }

  if (action.type === 'SET_REGISTER_MODE') {
    return {
      isRegisterMode: action.payload,
    }
  }

  if (action.type === 'REGISTER_USER') {
    return {
      isLoading: true,
    }
  }

  return state
}

export default userReducer
