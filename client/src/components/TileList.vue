<template>
  <div class="tile-list">
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product</th>
          <th class="th-price">Price</th>
        </tr>
      </thead>

      <tbody id="product-card" v-for="product in products" v-bind:key="product.productId">
        <tr>
          <td>
            <div class="sku">{{ product.productSku }}</div> 
          </td>

          <td>
            <div class="product-name action">{{ product.name }}</div>
          </td>

          <td>
            <div class="price">{{ formatCurrency(product.price) }}</div>
          </td>

          <td>
            <button class="cart" v-if="this.$store.state.token" v-on:click="addToCart(product.productId)">
              <i class="fa-solid fa-cart-plus icon action" title="Add item to cart"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
  import cartService from '../services/CartService';
  
  export default {
    props: {
      changeMessage: Function,
      products: {
        type: Array,
        required: true
      }
    },
    
    methods: {
      addToCart(productId){
        cartService
          .create({
            "productId": productId,
            "quantity": 1
          }, this.$store.state.token)
          .then( response => {
            if (response.status === 200) {
              this.changeMessage("Item Added!");
              this.$router.push( {name: 'cart'} );
            }
          })    
      },

      formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      }
    }
  }
</script>

<style scoped>
  table {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-bottom: 20px;
    width: 250%;
    padding-top: 10px;
    padding-left: 50px;
  }

  th {
    text-align: left;
    font-style: italic;
  }

  td {
    padding-top: 20px;
    text-align: left;
  }

  .th-price {
    text-align: right;
  }

  .price {
    text-align: right;
  }

  .cart {
    background: none;
    color: inherit;
    border: none;
  }
</style>