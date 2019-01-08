// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './script/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { getCookie , setCookie } from 'tiny-cookie'
import  VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
Vue.use(VueAxios, axios)

// Vue.use(getCookie,setCookie)


axios.defaults
Vue.config.productionTip = false
axios.defaults.withCredentials = true;

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   // if (to.matched.some(record => record.meta.requiresAuth)) {
//     if(!getCookie("userId")){
//       next("/Login")
//     }else{
//       next();
//     }
//   // if(!getCookie("userId")){
//   //   next()
//   // } elss {
//   //   next('/')
//   // }
//   // }
// })



/* eslint-disable no-new */
new Vue({
  el: '#app',   //先找vue的实例
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
