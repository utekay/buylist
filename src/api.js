export default {
  getProducts () {
    let products
    try {
      const data = window.sessionStorage.getItem('products')
      products = JSON.parse(data)
    } catch (e) {
      console.error(e)
    }
    return products || []
  },

  saveProducts (products) {
    const data = JSON.stringify(products)
    window.sessionStorage.setItem('products', data)
  }
}
