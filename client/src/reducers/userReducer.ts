import axios from 'axios'
import { removeLocalData, setLocalData } from '../util'

const API_URL = import.meta.env.VITE_API_URL

const GET_USERS = 'GET_USERS'
const REGISTER_USER = 'REGISTER_USER'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILED = 'REGISTER_FAILED'
const LOGIN_USER = 'LOGIN_USER'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'

export const getUsers = (): any => {
  return async (dispatch: any) => {
    dispatch({ type: GET_USERS })
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

    if (response) {
      dispatch({ type: 'GET_USERS_COMPLETED', payload: response.data })
    }
    if (!response) {
      dispatch({ type: 'GET_USERS_FAILED' })
    }
  }
}

export const editUser = (payload: any): any => {
  return async (dispatch: any) => {
    dispatch({ type: 'EDIT_USER' })
  }
}

export const loginUser = (payload: any): any => {
  return async (dispatch: any) => {
    dispatch({ type: LOGIN_USER })

    const res = await axios.post(API_URL + '/login', payload)

    if (res.status === 200) {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    } else {
      dispatch({ type: LOGIN_FAILED, payload: res.data })
    }
  }
}

export const logoutUser = (): any => {
  removeLocalData()
}

const userReducer = (
  state = {
    isLoading: false,
    isError: false,
    users: [],
    isRegisterMode: false,
    userData: null,
  },
  action: any
): any => {
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      userData: action.payload,
    }
  }

  if (action.type === GET_USERS) {
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

  if (action.type === 'LOGIN_USER') {
    return {
      isLoading: true,
    }
  }

  return state
}

export default userReducer
