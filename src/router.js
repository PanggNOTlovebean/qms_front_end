import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Entryer from  './views/Entryer.vue'
import Newquestion from './components/Newquestion/Newquestion.vue'
import Choose from './components/Choose/Choose.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Entryer',
      name: 'Entryer',
      component: Entryer,
      children:[
        {
          path: 'Newquestion',
          name: 'Newquestion',
          component: Newquestion
        },
        {
          path: 'Choose',
          name: 'Choose',
          component: Choose
        },
      ]
    },
   
  ]
})
