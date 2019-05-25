import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
Vue.config.productionTip = false

import VueWangeditor from 'vue-wangeditor-simple'
Vue.use(VueWangeditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
