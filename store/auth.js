export const state = () => ({
  user: null,
  isAuthenticated: false,
  token: null,
})

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
    state.isAuthenticated = true
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
}

export const getters = {
  getUser: (state) => state.user,
}
