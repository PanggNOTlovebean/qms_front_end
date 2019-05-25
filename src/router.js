import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Entryer from  './views/Entryer.vue'
import Newquestion from './components/Newquestion/Newquestion.vue'
import Singlechoose from './components/Singlechoose/Singlechoose.vue'
import Multiplechoose from './components/Multiplechoose/Multiplechoose.vue'
import Judge from './components/Judge/Judge.vue'
import Blank from './components/Blank/Blank.vue'
import Answer from './components/Answer/Answer.vue'
import Comprehension from './components/Comprehension/Comprehension.vue'
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
          path: 'Singlechoose',
          name: 'Singlechoose',
          component: Singlechoose
        },
        {
          path: 'Multiplechoose',
          name: 'Multiplechoose',
          component: Multiplechoose
        },
        {
          path: 'Judge',
          name: 'Judge',
          component: Judge
        },
        {
          path: 'Blank',
          name: 'Blank',
          component: Blank
        },
        {
          path: 'Comprehension',
          name: 'Comprehension',
          component: Comprehension
        },
        {
          path: 'Answer',
          name: 'Answer',
          component: Answer
        },
      ]
    },
   
  ]
})
