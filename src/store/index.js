import Vue from "vue";
import Vuex from "vuex";

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
    logout(context, payload) {
      context.commit('changeAuthState')
      return true
    }
  }
});

export default store;