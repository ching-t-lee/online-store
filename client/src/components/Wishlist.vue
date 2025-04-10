<template>
  <div class="wishlist-list" v-for="wishlist in wishlists" v-bind:key="wishlist.wishlistId">
    <router-link tag="div" v-bind:to="{ name: 'wishlistItemsView', params: { wishlistId: wishlist.wishlistId } }" >
      <div>{{ wishlist.name }}</div>
    </router-link>
  </div>
</template>

<script>
  import wishlistService from '../services/WishlistService';

  export default {
    props: {
      wishlists: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        wishlist: {},
      }
    },

    methods: {
      getItems(id, authToken) {
        if(this.$route.params.wishlistId){
          wishlistService
            .get(this.$route.params.wishlistId, this.$store.state.token)
            .then( response => {
              this.product = response.data;
            })          
        }

      },
    },

    created() {
      this.getItems(this.$route.params.wishlistId);
    }
  }
</script>

<style scoped>
  .wishlist-list{
    
  }
</style>