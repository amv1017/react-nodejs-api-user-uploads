// @ts-ignore
const STORAGE_DATA_KEY = 'amv1017-react-nodejs-api-user-uploads-userid-token'

// @ts-ignore
export const getLocalData = () =>
  // @ts-ignore
  JSON.parse(window.localStorage.getItem(STORAGE_DATA_KEY))

export const setLocalData = (value: any) =>
  JSON.stringify(
    window.localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(value))
  )

export const removeLocalData = () =>
  window.localStorage.removeItem(STORAGE_DATA_KEY)
