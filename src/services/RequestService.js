import axios from 'axios'
import { getResourceConfig, getResourceFormatter } from '@/services/ResourceService'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
})


/**
 * Base request, pass a valid config object.  
 * @param {object} config
 */
export function request(config, formatter = (r) => r) {
  return new Promise((resolve, reject) => {
    service.get(config.endpoint, config)
      .then(response => resolve(formatter(response)))
      .catch(reject)
  })
}

/**
 * Make a request using the `resource` service. Pass a resouce string
 * value that corresponds to a resouce file
 * @param {string} resource
 * @param {object} params
 */
export function requestResource(resource, params) {

  // get config and formatter for requested resource
  const config = getResourceConfig(resource, params)
  const formatter = getResourceFormatter(resource)

  // make request
  return request(config, formatter)

}
