import API from '../api/api-class'
const protocol = 'http:'
// Smart api calls
const pangoolAPI = new API({ url: `${protocol}//aknarges.pythonanywhere.com` })

export const handleRequestResponse = async ({ commit }, { mutation, request }) => {
  commit(mutation, await request)
}

export const handleRequest = async ({ dispatch, commit }, params = {}) => {
  let { name, action, mutation, data, tokenScope } = params
  let match = name.match(/\bauth/g)
  if (match === null) {
    name = `${name}`
  }
  if (!data) {
    data = {}
  }
  if (!mutation) {
    mutation = null
  }
  if (!tokenScope) {
    tokenScope = ''
  }
  commit('SET_TOKEN_SCOPE', tokenScope)
  pangoolAPI.createEntity({ name })
  const request = pangoolAPI.endpoints[name][action](data)
  if (mutation !== null) {
    await dispatch('handleRequestResponse', { mutation, request })
  } else {
    return request
  }
}
// // End smart api calls
// export const setInboxID = async ({ commit }, inboxID) => {
//   commit('SET_INBOX_ID', inboxID)
// }







