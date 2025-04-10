<template>
  <h1>{{ wishlist.name }}</h1>
  <div>
    <wishlist-items v-bind:wishlist="wishlist" />
  </div>
</template>

<script>
  import WishlistItems from '../components/WishlistItems.vue'
  import wishlistService from '../services/WishlistService';

  export default {
    components: {
      WishlistItems
    },

    data() {
      return {
        wishlist: {}
      }
    },

    methods: {
      getItems(id, authToken) {
        if(this.$route.params.wishlistId) {
          wishlistService
            .get(this.$route.params.wishlistId, this.$store.state.token)
            .then( response => {
              this.wishlist = response.data;
            });
        }
      }
    },

    created() {
      this.getItems(this.$route.params.wishlistId);
    }
  }
</script>