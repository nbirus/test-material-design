import Resources from '@/resources'
import SWorker from 'simple-web-worker'
import { get, camelCase } from 'lodash'
let resourceWorker = SWorker.create()

/**
 * @param {string} resource
 * @param {object} params
 */
export function getResourceConfig(resource, params) {
  const query = get(Resources, `${camelCase(resource)}.query`, () => {})
  return query(params)
}

/**
 * Finds a resource formatter for the passed in resource
 * @param {string} resource
 */
export function getResourceFormatter(resource) {
  return get(Resources, `${camelCase(resource)}.formatter`, defaultFormatter)
}


// used if no default formatter is set
function defaultFormatter(response) {
  return response
}
