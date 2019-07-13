<template lang="html" functional>
  <table class="table">
    <thead>
      <tr>
        <th>
          #
        </th>
        <th v-for="field in props.fields"
          v-bind:key="field.name"
        >
          {{ field.label }}
        </th>
        <th>
          Date
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody v-if="props.products.length">
      <tr v-for="(product, index) in props.products"
        v-bind:key="product.date"
      >
        <td>
          {{ index + 1 }}
        </td>
        <td v-for="field in props.fields"
          v-bind:key="field.name"
        >
          <input v-bind:value="product[field.name]"
            v-on:input="listeners['editProduct']($event, product.date, field.name)"
            v-bind:type="field.type"
          />
        </td>
        <td>
          {{ new Date(product.date).toLocaleString() }}
        </td>
        <td>
          <button v-on:click="listeners['removeProduct'](product.date)"
            title="Remove product"
            type="button"
          >
            Remove
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot v-else>
      <tr>
        <td>
          No items
        </td>
      </tr>
    </tfoot>
  </table>
</template>
