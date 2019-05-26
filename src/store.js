import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questionInfoId:0
  },
  mutations: {
    getQuestionInfoId(state){
      return state.questionInfoId
    }
  },
  actions: {
    setQuestionInfoId({commit,state},id){
      state.questionInfoId=id
    }

  }
})
