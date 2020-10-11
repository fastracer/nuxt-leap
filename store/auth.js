export const state = () => ({
  user: null,
  isAuthenticated: false,
})

export const mutations = {
  SETE_AUTHENTICATED: (state) => {
    state.isAuthenticated = true
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
  authenticated({ commit }) {
    commit('SETE_AUTHENTICATED')
  },
}

export const getters = {
  getUser: (state) => state.user,
}
