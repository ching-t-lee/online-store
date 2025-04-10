<template>
  <div class="loading" v-if="isLoading">
    <loading-spinner id="spinner" v-bind:spin="isLoading" />
  </div>

  <div v-else class="home">
    <div id="heading-line">
      <h1 class="title-display">Products</h1>

      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: !cardView }"
        v-on:click="cardView = false"
        icon="fa-solid fa-grip"
        title="View tiles"
      />

      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: cardView }"
        v-on:click="cardView = true"
        icon="fa-solid fa-table"
        title="View table"
      />

      <div class="input-container">
        <input
          v-model="searchTerm"
          id="search-bar"
          class="fa-solid fa-magnifying-glass"
          type="text"
          placeholder="Enter Product Name"
        >
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>

    <div class="welcome-msg" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,
      but you must 
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </div>

    <div class="welcome-msg" v-else>
      Welcome back! Happy shopping!
    </div>

    <div id="product-cards">
      <table-list v-bind:products="searchProducts" :changeMessage="changeMessage" v-if="cardView"></table-list>
      <tile-list v-bind:products="searchProducts" :changeMessage="changeMessage" v-else></tile-list>
    </div>
  </div>
</template>

<script>
  import LoadingSpinner from "../components/LoadingSpinner.vue";
  import productService from "../services/ProductService.js";
  import TableList from "../components/TableList.vue";
  import TileList from "../components/TileList.vue";

  export default {
    props: {
      changeMessage: Function,
    },

    components: {
      LoadingSpinner,
      TableList,
      TileList
    },

    data() {
      return {
        isLoading: true,
        cardView: true,

        searchTerm:'',
        products: []
      };
    },

    computed: {
      isLoggedIn() {
        return this.$store.state.token.length > 0;
      },

      searchProducts(searchTerm) {
        if (!searchTerm) {
          return this.products;
        }
      
        return this.products.filter( product => {
          return product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        });
      }
    },

    methods: {
      getProducts() {
        productService
          .list()
          .then( response => {
            this.products = response.data;
            this.isLoading = false;
          })
      }
    },

    created() {
      this.getProducts();
    }
  };
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

  .view-icon {
    font-size: 1.2rem;
    margin-right: 7px;
    padding: 3px;
    color: #444;
    border-radius: 3px;
  }

  .view-icon.active {
    background-color: lightgreen;
  }

  .view-icon:not(.active) {
    font-size: 1.2rem;
    margin-right: 7px;
    cursor: pointer;
  }

  .view-icon:not(.active):hover {
    color: blue;
    background-color: rgba(255, 255, 255, 0.7);
  }

  #heading-line {
    display: grid;
    grid-template-columns: 7fr 3rem 3rem 12rem;
    grid-template-areas: 
        "productName tableView tileView search"
    ;
    padding: 0 25px;
    padding-right: 100px;
  }

  h1.title-display {
    grid-area: productName;
    font-size: xx-large;
    padding-left: 20px;
  }

  svg.svg-inline--fa.fa-table.view-icon {
    grid-area: tableView;
    align-self: center;
    height: 30px;
    margin-bottom: 40px;
  }

  svg.svg-inline--fa.fa-grip.view-icon {
    grid-area: tileView;
    align-self: center;
    height: 30px;
    margin-bottom: 40px;
  }

  input {
    grid-area: search;
    height: 30%;
  }

  div.product-description-display {
    grid-area: description;
  }

  .input-container {
    position: relative;
    width: 250px;
  }

  .input-container i {
    position: absolute;
    right: 3px;
    top: 40%;
    transform: translateY(-110%);
    pointer-events: none;
  }

  .input-container input {
    padding-left: 30px;
    padding: 8px;
  }

  .welcome-msg {
    grid-area: welcomeMsg;
    padding-top: 10px;
    padding-left: 40px;
    padding-bottom: 30px;
    height: 30%;
    width: 100%;
    font-size: large;
  }

  #product-cards {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding-left: 30px;
  }
</style>
