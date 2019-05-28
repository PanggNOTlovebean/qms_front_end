import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'

import htmlToPdf from './components/utils/htmlToPdf'
Vue.use(htmlToPdf)
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://127.0.0.1:5000/';

Vue.use(VueAxios,axios);
Vue.config.productionTip = false

import VueWangeditor from 'vue-wangeditor-simple'
Vue.use(VueWangeditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
