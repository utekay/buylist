<template lang="html">
  <form v-on:submit.prevent="onSubmit">
    <div v-for="field in fields"
      class="form__item"
    >
      <label v-bind:for="getIdFor(field)"
        class="form__label"
      >
        {{ field.label }}
      </label>
      <input v-model="product[field.name]"
        v-bind:id="getIdFor(field)"
        v-bind:type="field.type"
      />
    </div>
    <div class="form__item">
      <button>
        Save
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TheForm',
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      product: this.getEmptyProduct()
    }
  },

  methods: {
    onInput (ev, fieldName) {
      console.log(ev, fieldName)
    },

    validate () {
      const errors = []

      for (let field of this.fields) {
        let value = this.product[field.name].trim()

        if (
          field.type === 'text' && !value
          || field.type === 'number' && +value <= 0
        ) {
          errors.push(field.label)
        }
      }

      return errors
    },

    onSubmit (ev) {
      const errors = this.validate()

      if (errors.length) {
        alert(`Fill ${errors.join(', ').toLowerCase()} with valid data`)
        return
      }

      const product = { date: +new Date(), ...this.product }

      this.$emit('addProduct', product)
      this.$emit('toggleShowForm')

      this.product = this.getEmptyProduct()
    },

    getIdFor (field) {
      return `field_${field.name}`
    },

    getEmptyProduct () {
      return {
        title: '',
        description: '',
        price: ''
      }
    }
  }
}
</script>

<style lang="css">
.form__item {
  margin: 15px 0;
}
.form__label {
  display: block;
}
</style>
