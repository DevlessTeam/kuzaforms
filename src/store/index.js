import Vue from "vue";
import Vuex from "vuex";
import Devless from "@/utils/devless";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authState: false
  },
  mutations: {
    changeAuthState(state) {
      state.authState = !state.authState;
    }
  },
  actions: {
    login (context, payload) {
      context.commit('changeAuthState')
    },
    register (context, payload) {
      context.commit('changeAuthState')
    },
    async logout(context, payload) {
      const res = await Devless.call('devless', 'logout')
      if (res.payload.result) {
        context.commit('changeAuthState')
        return true
      }
      return false
    }
  }
});

export default store;