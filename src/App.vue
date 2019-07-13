<template>
  <div class="app">
    <div class="app__tools">
      <button v-on:click="toggleShowForm"
        title="Add product"
        type="button"
      >
        {{ showForm ? "Back" : "Add product" }}
      </button>
    </div>
    <div v-show="!showForm"
      class="app__table"
    >
      <TheTable v-bind:fields="getFields()"
        v-bind:products="products"
        v-on:editProduct="editProduct"
        v-on:removeProduct="removeProduct"
      />
    </div>
    <TheForm v-show="showForm"
      v-bind:fields="getFields()"
      v-on:addProduct="addProduct"
      v-on:toggleShowForm="toggleShowForm"
    />
  </div>
</template>

<script>
import TheTable from '@/components/TheTable'
import TheForm from '@/components/TheForm'

import { FIELDS } from '@/fields'

export default {
  name: 'App',
  components: {
    TheTable,
    TheForm
  },

  data () {
    return {
      showForm: false,
      products: this.getInitialProducts()
    }
  },

  methods: {
    getInitialProducts () {
      let products
      try {
        const data = window.sessionStorage.getItem('products')
        products = JSON.parse(data)
      } catch (e) {
        console.error(e)
      }
      return products || []
    },

    setProducts () {
      const data = JSON.stringify(this.products)
      window.sessionStorage.setItem('products', data)
    },

    addProduct (product) {
      this.products.push(product)
    },

    removeProduct (date) {
      if (!confirm("Are you sure?")) {
        return
      }
      const index = this.products.findIndex((product) => {
        return product.date === date
      })
      if (index === -1) {
        alert("Product not found")
        return
      }
      this.products.splice(index, 1)
    },

    editProduct (ev, productDate, fieldName) {
      const product = this.products.find((product) => {
        return product.date === productDate
      })
      product[fieldName] = ev.target.value
    },

    toggleShowForm () {
      this.showForm = !this.showForm
    },

    getFields () {
      return FIELDS
    }
  },

  watch: {
    'products': {
      handler: 'setProducts',
      deep: true
    }
  }
}
</script>

<style>
.app {
  padding: 0 15px;
  margin-top: 15px;
}
.app__tools,
.app__table {
  margin: 15px 0;
}
</style>
