import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:9000'
})

export default {
  
  list(authToken) {
    return http.get('/cart', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  },

  create(cartItemId, authToken) {
    return http.post(`/cart/items`, cartItemId, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  },

  update(cartItemId) {
    return http.put(`/cart/items`, cartItemId,);
  },

  get(cartItemId) {
    return http.get(`/products/${cartItemId}`)
  },

  delete(cartItemId, authToken) {
    return http.delete(`/cart/items/${cartItemId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  },

  clear(authToken) {
    return http.delete('/cart', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

}
