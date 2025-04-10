<template>
  <div class="container">
    <h1 class="headline">My Wish List</h1>
    <button class="create">Create WishList</button>
    <div class="list">
      <wishlist v-bind:wishlists="wishlists"></wishlist>
    </div>
  </div>
</template>

<script>
  import wishlistService from '../services/WishlistService';
  import Wishlist from '../components/Wishlist.vue';

  export default {
    components: {
      Wishlist
    },

    data() {
      return {
        wishlists: []
      }
    },

    methods: {
      getList() {
        wishlistService
          .list(this.$store.state.token)
          .then( response => {
            this.wishlists = response.data;
          });
      }
    },

    created() {
      this.getList();
    }
  }
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-template-areas: 
      "headline create"
      "list ."
    ;
  }

  .headline {
    grid-area: headline;
  }

  .create {
    grid-area: create;
  }

  .list {
    grid-area: list;
  }
</style>