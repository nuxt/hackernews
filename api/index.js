// This is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API
let api = {}

let _api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com'
  }
}).then(_api => {
  api = _api
  // warm the front page cache every 15 min
  // make sure to do this only once across all requests
  if (api.onServer) {
    warmCache()
  }
})



function warmCache() {
  if (!api.cachedIds) return
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}

async function fetch(child) {
  logRequests && console.log(`fetching ${child}...`)
  await _api
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return cache.get(child)
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType(type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem(id) {
  return fetch(`item/${id}`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
  return fetch(`user/${id}`)
}

export async function watchList(type, cb) {
  let first = true
  await _api
  const ref = api.child(`${type}stories`)
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}
