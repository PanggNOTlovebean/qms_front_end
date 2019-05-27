import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Entryer from  './views/Entryer.vue'
import Newquestion from './components/Newquestion/Newquestion.vue'
import Newpaper from './components/Newpaper/Newpaper.vue'
import Singlechoose from './components/Singlechoose/Singlechoose.vue'
import Multiplechoose from './components/Multiplechoose/Multiplechoose.vue'
import Judge from './components/Judge/Judge.vue'
import Blank from './components/Blank/Blank.vue'
import Discuss from './components/Discuss/Discuss.vue'
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
          path: 'Newpaper',
          name: 'Newpaper',
          component: Newpaper
        },
        {
          path: 'Singlechoose/:id',
          name: 'Singlechoose',
          component: Singlechoose
        },
        {
          path: 'Multiplechoose/:id',
          name: 'Multiplechoose',
          component: Multiplechoose
        },
        {
          path: 'Judge/:id',
          name: 'Judge',
          component: Judge
        },
        {
          path: 'Blank/:id',
          name: 'Blank',
          component: Blank
        },
        {
          path: 'Discuss/:id',
          name: 'Discuss',
          component: Discuss
        },
      ]
    },
   
  ]
})
