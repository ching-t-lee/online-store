<template>
  <div>
    <product-detail :changeMessage="changeMessage" v-bind:product="product" />
  </div>
</template>

<script>
  import ProductDetail from '../components/ProductDetail.vue'
  import productService from '../services/ProductService'

  export default {
    props: {
      changeMessage: Function
    },
    
    components: {
      ProductDetail
    },

    data() {
      return {
        product: {}
      }
    },

    methods: {
      getProduct(id) {
        if(this.$route.params.productId) {
          productService
            .get(this.$route.params.productId)
            .then( response => {
              this.product = response.data;
            })          
        }

      },
    },

    created() {
      this.getProduct(this.$route.params.productId);
    }
  }
</script>