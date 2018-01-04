// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

// global.jQuery = jQuery
// global.$ = jQuery

Vue.config.productionTip = false
Vue.use(VeeValidate)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.state.authState) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
