import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 24 * 1000
  })

const cacheAxios = axios.create({
    adapter: cache.adapter
})

export default cacheAxios;