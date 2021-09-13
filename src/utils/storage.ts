import _ from 'lodash'

const win = typeof window !== `undefined` ? window : {
  localStorage: undefined,
  sessionStorage: undefined
}

const LOCAL_STORAGE = win?.localStorage
const SESSION_STORAGE = win?.sessionStorage

const SESSION_STORAGE_KEY = '__ss_key__'
const LOCAL_STORAGE_KEY = '__ls_key__'

const isEmpty = (storage: Storage) => !storage

const getValue = (storage: Storage | undefined, key: string) => {
  if (!storage || isEmpty(storage)) return

  const rawData = storage.getItem(key)
  if (!rawData) return

  return JSON.parse(rawData)
}

const setValue = <T>(storage: Storage | undefined, key: string, data: T): void => {
  if (!storage || isEmpty(storage)) return
  return storage.setItem(key, JSON.stringify(data))
}

const setValueToLocalStorage = _.partial(setValue, LOCAL_STORAGE)

const getValueFromLocalStorage = _.partial(getValue, LOCAL_STORAGE)

const setValueToSessionStorage = _.partial(setValue, SESSION_STORAGE)

const getValueFromSessionStorage = _.partial(getValue, SESSION_STORAGE)


export const getCount = (defaultValue: any) => getValueFromSessionStorage(`${SESSION_STORAGE_KEY}/count`) || defaultValue

export const setCount = (val: any) => setValueToSessionStorage(`${SESSION_STORAGE_KEY}/count`, val)

export const getData = () => getValueFromLocalStorage(LOCAL_STORAGE_KEY)

export const setData = (val: any) => setValueToLocalStorage(LOCAL_STORAGE_KEY, val)


export const getTheme = () => getValueFromLocalStorage(`${LOCAL_STORAGE_KEY}/DARK`) || false

export const setTheme = (val: any) => setValueToLocalStorage(`${LOCAL_STORAGE_KEY}/DARK`, val)
