// @ts-ignore
const STORAGE_ITEM_TOKEN = 'amv1017-react-nodejs-api-user-uploads-token'

// @ts-ignore
export const getTokenFromLocalStorage = () =>
  // @ts-ignore
  JSON.parse(window.localStorage.getItem(STORAGE_ITEM_TOKEN))

export const setTokenToLocalStorage = (value: any) =>
  JSON.stringify(
    window.localStorage.setItem(STORAGE_ITEM_TOKEN, JSON.stringify(value))
  )
