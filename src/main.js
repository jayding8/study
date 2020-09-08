// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as api from './utils/api'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.prototype.$api = api

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.fullPath === '/Login') {
//     // login页面关闭header
//     next({ path: to.path, query: { show_header: false, show_footer: false } })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
