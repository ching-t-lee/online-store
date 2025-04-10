<template>
  <div class="loading" v-if="isLoading">
    <loading-spinner id="spinner" v-bind:spin="isLoading" />
  </div>

  <div class="shopping-cart" v-else>
    <div class="headline">
      <h1 class="title-display">Shopping Cart</h1>
      <button class="delete" v-on:click="clearCart">
        <i class="fa-solid fa-cart-plus icon action" title="Add item to cart"></i>
        Clear Cart
      </button>           
    </div>

    <table>
      <thead>
        <tr>
          <th class="th-qty">Qty</th>
          <th class="th-product">Product</th>
          <th class="th-price">Price</th>
          <th class="th-price">Amount</th>
        </tr>
      </thead>

      <tbody>
        <tr id="product-card" v-for="cartItem in products" v-bind:key="cartItem.productId">
          <td>
            <div class="qty">{{ cartItem.quantity }}</div> 
          </td>

          <td>
            <div class="product-name">{{ cartItem.product.name }}</div>
          </td>

          <td>
            <div class="price">{{ formatCurrency(cartItem.product.price) }}</div>
          </td>

          <td>
            <div class="amount">{{ formatCurrency(cartItem.product.price * cartItem.quantity) }}</div>
          </td>

          <td>
            <button class="delete-item" v-on:click="removeItem(cartItem.cartItemId)">
              X
            </button>            
          </td>
        </tr>
        
        <tr>
          <td class="border"></td>
          <td class="subtotal">Item Subtotal:</td>
          <td class="border"></td>
          <td class="border">{{ formatCurrency(subTotal) }}</td>
        </tr>

        <tr>
          <td></td>
          <td class="tax">Tax:</td>
          <td></td>
          <td>{{ formatCurrency(tax) }}</td>
        </tr>

        <tr>
          <td></td>
          <td class="total">Total:</td>
          <td></td>
          <td>{{ formatCurrency(total) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  import cartService from '../services/CartService';
  
  export default {
    components: {
      LoadingSpinner
    },

    data() {
      return {
        isLoading: true,
        products: [],
        subTotal: 0,
        tax: 0,
        total: 0
      }
    },

    methods: {
      getProducts() {
        cartService
          .list(this.$store.state.token)
          .then( response => {
            this.products = response.data.items;
            this.subTotal = response.data.itemSubtotal;
            this.tax = response.data.tax;
            this.total = response.data.total;
            this.isLoading = false;
          });
      },

      removeItem(cartItemId) {
        cartService
          .delete(cartItemId, this.$store.state.token)
          .then( response => {
            if (response.status === 204) {
              this.getProducts();
            }
          })
      },

      clearCart() {
        cartService
          .clear(this.$store.state.token)
          .then( response => {
            this.products = [];
            this.subTotal = 0;
            this.tax = 0;
            this.total = 0;
          });
      },

      formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      }
    },

    created() {
      this.getProducts();
    }
  }
</script>

<style scoped>
  #spinner {
    color: green;
    width: 100px;
    height: 100px;
    display: flex;
    justify-self: center;
    margin-top: 100px;
  }

  td {
    padding-bottom: 10px;
  }

  .shopping-cart {
    padding-left: 20px;
  }

  .headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1.title-display {
    font-size: xx-large;
    padding-left: 20px;
  }

  thead {
    padding-left: 20px;
    text-align: left;
  }

  th {
    padding-bottom: 15px;
  }

  h1 {
    font-size: x-large;
  }

  table {
    width: 70%;
    padding-left: 15px;
  }
  
  .subtotal {
    border-top: solid;
    padding-top: 10px;
    text-align: right;
    width: 60%;
    padding-top: 20px;
  }

  .tax, .total {
    text-align: right;
  }

  .border {
    border-top: solid;
    padding-top: 10px;
  }

  .delete-item {
    background: none;
    color: inherit;
    border: none;
  }
</style>