<template>
  <div id="cart-app">
    <header>
      <img src="img/logo_400x70.png">
    </header>

    <nav>
      <ul>
        <router-link class="home" v-bind:to="{ name: 'products' }">Home</router-link>
        <router-link class="cart" v-bind:to="{ name: 'cart' }" v-if="$store.state.token">Cart</router-link>
        <router-link class="wishlist" v-bind:to="{ name: 'wishlists' }" v-if="$store.state.token">Wish List</router-link>
        <message-area class="nav-message" :style="{ visibility: message !== 'default' ? 'visible' : 'hidden' }">{{ message }}</message-area>
        <router-link class="logout" v-bind:to="{ name: 'logout' }" v-if="$store.state.token">Logout</router-link>
        <router-link class="login" v-bind:to="{ name: 'login' }" v-else>Login</router-link>
      </ul>
    </nav>

    <main>
      <router-view :changeMessage="changeMessage"/>
    </main>

    <footer>
      <div>©2025 All rights reserved</div>
    </footer>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        message: 'default',  
      };
    },
    
    methods: {
      changeMessage(message) {
        this.message = message;
        setTimeout(() => {
          this.message = 'default';
        }, 3000); 
      }
    }
  };
</script>

<style scoped>
  template {
    overflow-x: hidden;
    font-family: cursive;
  }

  #cart-app {
    height: 100%;
    margin: 0;
  }

  header {
    background-color: white;
    text-align: center;
    position: relative;
    padding: 10px;
    width: 100%;
  }

  nav {
    background-color: white;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    position: relative;
    justify-self: anchor-center;
    width: 100%;
    text-align: center;
    font-family: 'Tangerine', serif;
    font-size: 30px;
    font-weight: 500;

    .nav-message{
      color: green;
      text-decoration: underline;
      font-weight: bolder;
    }
  }

  nav a:link, nav a:visited {
    color: black;
  }

  nav a:hover {
    color: rgb(70, 70, 245);
    cursor: pointer;
  }

  .router-link-exact-active {
    background-color: #e0ffe0;
    font-size: large;
    font-style: oblique;
    border-radius: 20%;
    width: 8%;
  }

  ul {
    list-style-type: none;
  }

  ul > a {
    text-decoration: none;
  }

  a.home, a.cart {
    float: left;
    margin-right: 20px;
    width: 75px;
  }

  a.wishlist {
    float: left;
    width: 75px;
  }

  a.login, a.logout {
    float: right;
    width: 5%;
    margin-right: 30px;
  }

  main {
    width: 100%;
    margin-top: 5px;
    padding-top: 10px;
    overflow-y: auto;
    height: calc(92.5vh - 135px);
    overflow-x: hidden;
  }

  footer {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px;
    position: relative;
    width: 100%;
    margin-top: auto;
  }
</style>