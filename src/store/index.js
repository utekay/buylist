import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '@/api'
import { SET_PRODUCTS } from './mutations'

export default new Vuex.Store({
  state: {
    products: api.getProducts()
  },
  mutations: {
    [SET_PRODUCTS]: (state, { products }) => {
      state.products = products
    }
  },
  actions: {
    setProducts ({ commit }, { products }) {
      commit(SET_PRODUCTS, { products })
      api.saveProducts(products)
    }
  }
})
