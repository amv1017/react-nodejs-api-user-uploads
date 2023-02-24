import axios from 'axios'
import { removeLocalData, setLocalData } from '../util'

const API_URL = import.meta.env.VITE_API_URL

const GET_USERS = 'GET_USERS'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const GET_USERS_FAILED = 'GET_USERS_FAILED'

const REGISTER_USER = 'REGISTER_USER'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILED = 'REGISTER_FAILED'

const LOGIN_USER = 'LOGIN_USER'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'

const EDIT_PROFILE = 'EDIT_PROFILE'
const EDIT_SUCCESS = 'EDIT_SUCCESS'
const EDIT_FAILED = 'EDIT_FAILED'

const SET_REGISTER_MODE = 'SET_REGISTER_MODE'

export const getUsers = (): any => {
  return async (dispatch: any) => {
    dispatch({ type: GET_USERS })
    const res = await axios.get(API_URL + '/users')
    if (res) {
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data })
    }
    if (!res) {
      dispatch({ type: GET_USERS_FAILED })
    }
  }
}

export const setRegisterMode = (payload: boolean): any => {
  return (dispatch: any) => {
    dispatch({
      type: SET_REGISTER_MODE,
      payload,
    })
  }
}

export const registerUser = (payload: any): any => {
  return async (dispatch: any) => {
    dispatch({ type: REGISTER_USER })

    const res = await axios.post(API_URL + '/users', payload)

    if (res) {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    }
    if (!res) {
      dispatch({ type: REGISTER_FAILED })
    }
  }
}

export const editProfile = (payload: any): any => {
  return async (dispatch: any) => {
    dispatch({ type: EDIT_PROFILE })

    const { data, id } = payload

    const res = await axios.put(API_URL + `/users/${id}`, data)

    if (res) {
      dispatch({ type: EDIT_SUCCESS, payload: res.data })
    }
    if (!res) {
      dispatch({ type: EDIT_FAILED })
    }
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
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
    case GET_USERS:
    case EDIT_PROFILE: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userData: action.payload,
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isRegisterMode: false,
      }

    case EDIT_SUCCESS: {
      return { ...state, isLoading: false, isError: false }
    }

    case LOGIN_FAILED:
    case REGISTER_FAILED:
    case EDIT_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    case GET_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        users: action.payload,
      }
    }

    case GET_USERS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        users: [],
      }
    }

    case SET_REGISTER_MODE: {
      return {
        ...state,
        isRegisterMode: action.payload,
      }
    }

    default:
      return state
  }
}

export default userReducer
