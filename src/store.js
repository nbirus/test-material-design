import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import form from '@/store/modules/form'
import base from '@/store/base'

const vuexLocal = new VuexPersistence({
  key: 'vuex-badc',
  storage: window.localStorage,
  reducer: (state) => ({
    form: state.form,
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  ...base,
  modules: {
    form,
  },
})
