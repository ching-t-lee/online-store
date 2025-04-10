<template>
  <div id="product-card" v-for="product in products" v-bind:key="product.productId">
    <div class="sku">{{ product.productSku }}</div> 
    <div class="price">{{ formatCurrency(product.price) }}</div>

    <router-link tag="div" v-bind:to="{ name: 'productDetailView', params: { productId: product.productId } }" >
      <div class="product-name">{{ product.name }}</div>
    </router-link>

    <div class="product-image">
      <img src="img/product_350x250.jpg">
    </div>

    <button class="cart" v-if="this.$store.state.token" v-on:click="addToCart(product.productId)">
      <i class="fa-solid fa-cart-plus icon" title="Add item to cart"></i>
    </button>
  </div>

</template>

<script>
  import productService from '../services/ProductService';
  import cartService from '../services/CartService';

  export default {
    props: {
      changeMessage: Function,

      products: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        product: {},
      }
    },

    methods: {
      getProduct(id) {
        if(this.$route.params.productId){
          productService
            .get(this.$route.params.productId)
            .then( response => {
              this.product = response.data;
            })          
        }
      },
      
      addToCart(productId){
        cartService
          .create({
            "productId": productId,
            "quantity": 1
          }, this.$store.state.token)
          .then( response => {
            if (response.status === 200) {
              this.changeMessage("Item added!")
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
    },

    created() {
      this.getProduct(this.$route.params.productId);
    }
  }
</script>

<style scoped>
  div#product-card {
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 10px;
    width: 300px;
    height: 320px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
        "sku    price"
        "name   name"
        "image  image"
        ".      cart"
    ;
  }

  .sku {
    grid-area: sku;
    padding-top: 10px;
    padding-left: 20px;
    font-family: 'BD super';
    font-weight: bold;
  }

  .price {
    grid-area: price;
    padding-top: 10px;
    padding-right: 20px;
    text-align: right;
  }

  .product-name {
    grid-area: name;
    padding-left: 20px;
    width: 120%;
  }

  .product-image {
    grid-area: image;
    text-align: center;
    height: 80%;
  }

  .product-image > img {
    width: 90%;
    border-radius: 50px;
  }

  .cart {
    grid-area: cart;
    padding-bottom: 10px;
    padding-right: 25px;
    justify-self: right;
    width: 15px;
    height: 30px;
    background: none;
    color: inherit;
    border: none;
  }
  
  i.fa-solid.fa-cart-plus.icon {
    padding-bottom: 10px;
  }
</style>