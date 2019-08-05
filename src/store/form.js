export default {
  namespaced: true,
  state() {
    return {
      model: {}
    }
  },
  getters: {
    getModel: state => state.model
  },
  mutations: {
    setModel(state, model) {
      state.model = model
    },
  },
  actions: {
    setModel({ commit }, model) {
      commit('setModel', model)
    },
  },
};