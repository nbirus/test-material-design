import { truthy } from '@/services/CommonsService'
import { get, cloneDeep } from 'lodash'
import SWorker from 'simple-web-worker'
let searchWorker = SWorker.create()


////////////////////
// search
export function objectSearch(data, params) {
  return new Promise((resolve, reject) => {
    
    // get keys to search by
    const searchKeys = Object.keys(params).filter(key => truthy(params[key]))
    const message = 'search-worker'

    // set up and call service worker
    searchWorker.register({
      message,
      func: objectSearchWorker
    })

    searchWorker.postMessage(message, [JSON.stringify([data, params, searchKeys])])
      .then(resolve)
      .catch(reject)

    searchWorker.unregister(message)

  })
}
export function objectSearchWorker(args) {

  // get vars from json input
  let data = JSON.parse(args)[0]
  let params = JSON.parse(args)[1]
  let searchKeys = JSON.parse(args)[2]

  // loop over each key, and compare against corrisponding row value
  searchKeys.forEach(key => {
    if (!['include', 'size', 'from', 'to', 'sort', 'order'].includes(key)) {
      data = data.filter(row => {

        // get compare values
        const rowValue = row[key]
        const searchValue = params[key]


        // search
        if (searchValue === undefined) {
          return true
        }
        if (key === '_keyword') {
          return rowSearch(row, searchValue)
        } else if (rowValue === undefined) {
          return false
        } else if (isArray(searchValue)) {
          return searchValue.some(s => stringCompare(rowValue, s))
        } else if (isArray(rowValue)) {
          return rowValue.some(s => stringCompare(s, searchValue))
        } else {
          return stringCompare(rowValue, searchValue)
        }
      })
    }
  })

  return data

  // helper
  function rowSearch(row, searchValue) {
    return objectValues(row).some(value => {
      if (value === undefined) {
        return false
      } else if (isObject(value)) {
        return false
      } else if (isArray(value)) {
        return value.some(v => stringCompare(v, searchValue))
      } else {
        return stringCompare(value, searchValue)
      }
    })
  }
  function objectValues(obj) {
    var res = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        res.push(obj[i]);
      }
    }
    return res;
  }
  function isObject(value) {
    return (!!value) && (value.constructor === Object)
  }
  function isArray(value) {
    return !!value && value.constructor === Array
  }
  function stringCompare(value, searchValue) {
    if (value !== undefined) {
      return value.toString().toLowerCase().search(searchValue.toLowerCase()) !== -1
    } else {
      return false
    }
  }
}


////////////////////
// sort
export function objectSort(data, sort) {
  return new Promise((resolve, reject) => {

    const message = 'sort-worker'

    // set up and call service worker
    searchWorker.register({
      message,
      func: objectSortWorker
    })

    searchWorker.postMessage(message, [JSON.stringify([data, sort])])
      .then(resolve)
      .catch(reject)

    searchWorker.unregister(message)

  })
}
export function objectSortWorker(args) {
  let data = JSON.parse(args)[0]
  let sort = JSON.parse(args)[1]

  if (sort !== null) {
    let sortFunc = sort.order === 'ascending' ? sortAsc : sortDesc

    if (sort.key !== undefined) {
      data = data.sort(sortFunc)
    }
  }

  return data

  // helpers
  function sortAsc(a, b) {
    return isNaN(a[sort.key])
      ? stringCompare(a, b)
      : numberCompare(a, b)
  }
  function sortDesc(a, b) {
    return isNaN(a[sort.key]) 
      ? stringCompare(b, a) 
      : numberCompare(b, a)
  }
  function numberCompare(a, b) {
    return a[sort.key] - b[sort.key]
  }
  function stringCompare(a, b) {
    return ('' + a[sort.key]).localeCompare(b[sort.key]);    
  }
}


////////////////////
// paginate
export function objectPaginate(data, pagination) {
  return new Promise(resolve => {
    const from = get(pagination, 'from', 0)
    const size = get(pagination, 'size', 1000)
    const total = data.length

    resolve({
      data: cloneDeep(data).splice(from, size),
      total,
    })
  })
}
