import { store } from '@/store'
export const requestSuccessInterceptor = config => {
  const tokenScope = store.state.tokenScope
  let token = window.localStorage.getItem(`${tokenScope}access_token`)

  if (token && token !== null) {
    config.headers.common['Authorization'] =
     `${token}`
  }
  config.headers.common['Accept-Language'] = 'fa'
  return config
}

export const requestErrorInterceptor = error => {
  return Promise.reject(error)
}
