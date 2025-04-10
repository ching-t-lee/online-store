<template>
  <div class="detail">
    <div class="headline">
      <h1 class="title-name">{{ product.name }}</h1>
      <button v-if="this.$store.state.token" class="btn-add" v-on:click="addToCart">
        <i class="fa-solid fa-cart-plus icon action" title="Add item to cart"></i>
        Add to Cart
      </button>
    </div>

    <div class="product-description">{{ product.description }}</div>

    <div class="sku-price">
      <div class="sku">{{ product.productSku }}</div> 
      <div class="price">{{ formatCurrency(product.price) }}</div>
    </div>

    <div class="product-name">{{ product.name }}</div>

    <div class="product-image">
      <img src="../../img/product_350x250.jpg">
    </div>
  </div>
</template>

<script>
  import cartService from '../services/CartService';

  export default {
    props: {
      changeMessage: Function,

      product: {
        type: Object,
        required: true
      }
    },

    methods: {
      addToCart(){
        cartService
          .create({
            "productId": this.product.productId,
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
  .detail {
    padding-left: 20px;
  }

  .headline {
    display: grid;
    grid-template-columns: 7fr 10rem;
    grid-template-areas: 
        "name cart"
    ;
  }

  .title-name {
    grid-area: name;
    font-size: xx-large;
    padding-left: 20px;
  }

  .btn-add {
    grid-area: cart;
    height: 50%;
    margin-top: 10px;
  }

  .fa-solid.fa-cart-plus.icon.action {
    padding-right: 10px;
  }

  .product-description {
    padding-bottom: 10px;
    font-size: large;
    padding-left: 30px;
  }

  .sku-price {
    display: grid;
    grid-template-columns: 5rem 5rem;
    grid-template-areas: 
        "sku price"
    ;
    padding-left: 30px;
  }

  .sku {
    grid-area: sku;
    padding-bottom: 10px;
  }

  .price {
    grid-area: price;
    padding-bottom: 10px;
    padding-left: 30px;
  }
  
  .product-name {
    padding-bottom: 20px;
    padding-left: 30px;
    font-weight: bolder;
    padding-top: 30px;
  }

  .product-image > img {
    padding-right: 10px;
    border-radius: 50px;
    padding-left: 20px;
  }
</style>