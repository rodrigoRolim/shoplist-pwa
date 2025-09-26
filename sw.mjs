const dynamicCacheName = 'dynamic-cache-v1'
const assets = [
  '/',
  'index.html',
  'UI/styles/main.css',
  'UI/js/Item.model.mjs',
  'UI/js/Item.presenter.mjs',
  'UI/js/Item.view.mjs',
  'modules/item/repository/Item.repository.mjs',
  'modules/item/service/AddItem.service.mjs',
  'modules/item/service/ListItems.service.mjs',
  'utils/either.mjs',
  'app.mjs'
]

const openCache = async (cacheName) => {
  try {
    const data = await caches.open(cacheName)
    return { success: true, data }
  } catch(error) {
    return { success: false, data: null, error }
  }
}
const getKeysFromCache = async (cache) => {
  try {
    return { success: true, data:cache.keys() }
  } catch(error) {
    return { success: false, data: null, error }
  }
}
const deleteCache = async (cache, key) => {
  try {
    return { success: true, data: cache.delete(key) }
  } catch(error) {
    return { success: false, data: null, error }
  }
}

const initCache = async (cacheName) => {
  try {
    const keys = await caches.keys()
    const successList = await Promise.all(
      keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
    )
    return { success: true, data: successList }
  } catch(error) {
    return { success: false, data: null, error }
  }
}
const findRequestOnCache = async (request) => {
  try {
    const data = await caches.match(request)
    return { success: true, data }
  } catch(error) {
    return { success: false, data: null, error }
  }
}
const cacheResponse = async (cacheName, response, url) => {
  try {
    const { data: cache } = await openCache(cacheName)
    const resultFromCaching = await cache.put(url, response.clone())
    return { success: true, data: resultFromCaching }
  } catch (error) {
    return { success: false, data: null, error }
  }
}
const interceptFetchResponse = async (request) => {
  try {
    const response = await fetch(request)
    cacheResponse(dynamicCacheName, response, request.url)
    limitCacheSize(dynamicCacheName, 5)
    return { success: true, data: response }
  } catch(error) {
    return { success: false, data: null, origin: 'interceptResponse', error }
  }
}
const addAssetsToCache = async (cacheName, list) => {
  try {
    const { data: cache } = await openCache(cacheName)
    const resultFromAddingOnCache = await cache.addAll(list)
    return { success: true, data: resultFromAddingOnCache }
  } catch(error) {
    return { success: false, data: null, error }
  }
}
const limitCacheSize = async (cacheName, size) => {
  try {
    const { data: cache } = await openCache(cacheName)
    const keys = await getKeysFromCache(cache)
    if (keys.lenght > size) {
      deleteCache(cache, keys[0])
    }
    return { success: true, data: true }
  } catch(error) {
    return { success: false, data: null }
  }
}
const getDataFromLocalOrRemote = async (request) => {
  try {
    const data = (await findRequestOnCache(request)).data ?? (await interceptFetchResponse(request)).data
    return data
  } catch(error) {
    return error
  }
}
self.addEventListener('install', event => {
  event.waitUntil(
    addAssetsToCache(dynamicCacheName, assets)
  )
})
self.addEventListener('activate', event => {
  event.waitUntil(
    initCache(dynamicCacheName)
  )
})
self.addEventListener('fetch', event => {
  const getData = event.request.url.startsWith('http') ? getDataFromLocalOrRemote : fetch
  event.respondWith(getData(event.request))
})

