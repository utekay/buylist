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
import { mapState, mapActions } from 'vuex'

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
      showForm: false
    }
  },

  computed: {
    ...mapState([
      'products'
    ])
  },

  methods: {
    ...mapActions([
      'setProducts'
    ]),

    addProduct (product) {
      const products = [...this.products, product]
      this.setProducts({ products })
    },

    removeProduct (date) {
      if (!confirm("Are you sure?")) {
        return
      }

      const products = [...this.products]
      const index = products.findIndex((p) => {
        return p.date === date
      })
      if (index === -1) {
        alert("Product not found")
        return
      }

      products.splice(index, 1)
      this.setProducts({ products })
    },

    editProduct (ev, productDate, fieldName) {
      const products = [...this.products]
      const product = products.find((p) => {
        return p.date === productDate
      })
      product[fieldName] = ev.target.value
      this.setProducts({ products })
    },

    toggleShowForm () {
      this.showForm = !this.showForm
    },

    getFields () {
      return FIELDS
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
