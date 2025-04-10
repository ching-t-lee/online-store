import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:9000'
})

export default {
  
  list(authToken) {
    return http.get('/wishlists', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  },

  get(id, authToken) {
    return http.get(`/wishlists/${id}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

}
