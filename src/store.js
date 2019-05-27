import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addList:{}
  },
  getters: {
    getAddList(state){
      return state.addList
    }
  },
  actions: {
    updateList({commit,state},dict){
      commit('setAddList',dict) 
    }
  },
  mutations:{
    setAddList(state,dict){
      state.addList=dict
    }
  }
})
