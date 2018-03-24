// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import Cookies from "js-cookie";
import VueClipboard from "vue-clipboard2";
import VueGoodTable from "vue-good-table";

Vue.use(VueGoodTable);

Vue.use(VueClipboard);

import Devless from "./utils/devless";

// global.jQuery = jQuery
// global.$ = jQuery

Vue.config.productionTip = false;
Vue.use(VeeValidate);

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.authState) {
      const logn = await checkAuth();
      if (logn) {
        store.commit("changeAuthState");
        next({
          path: to.path
        });
      } else {
        next({
          path: "login"
        });
      }
    } else {
      console.log("log");
      next();
    }
  } else {
    next();
  }
});

async function checkAuth() {
  Devless.setToken(Cookies.get("token"));
  const res = await Devless.call("devless", "profile");
  if (res.payload.result) {
    return res.payload.result;
  }
  return false;
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
