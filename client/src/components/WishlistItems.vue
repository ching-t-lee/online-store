<template>
  <div v-for="wishlistItem in wishlists" v-bind:key="wishlistItem.wishlistId">
      <div class="item">
        <div class="item-sku">{{ wishlistItem.product.productSku }}</div>
        <div class="item-name">{{ wishlistItem.product.name }}</div>
        <div class="item-description">{{ wishlistItem.product.description }}</div>
        <div class="item-price">{{ wishlistItem.product.price }}</div>
      </div>
  </div>
</template>

<script>
  import wishlistService from '../services/WishlistService';

  export default {
    data() {
      return {
        wishlists: []
      }
    },

    methods: {
      getItems(id, authToken) {
        if(this.$route.params.wishlistId) {
          wishlistService
            .get(this.$route.params.wishlistId, this.$store.state.token)
            .then( response => {
              this.wishlists = response.data.items;
            });
        }
      }
    },

    created() {
      this.getItems(this.$route.params.wishlistId);
    }
  }
</script>

<style scoped>
  .item {
    border: 1px solid black;
    margin: 10px;
  }
</style>