const axios = require('axios');
const setupCache = require('axios-cache-adapter').setupCache

const cache = setupCache({
    maxAge: 15 * 60 * 24 * 1000,
    debug: true,
    exclude: {
      query: false,
    }
  })

const cacheAxios = axios.create({
    adapter: cache.adapter
})

module.exports = cacheAxios;