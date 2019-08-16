import idleTimeout from 'idle-timeout'
import router from '@/router'
import { truthy } from '@/services/CommonsService'
import { get } from 'lodash'

let componentIdleCallback = null
let componentExpiredCallback = null
let componentOutsideExpired = null
let sessionOptions = {
  element: document,
  timeout: 28 * 60 * 1000,
  loop: false,
}


/////////////////////
// create idle session
const session = idleTimeout(onSessionIdle, sessionOptions)


/////////////////////
// exposed functions
export function createSession(idleCb, expiredCb, outsideCb) {
  componentIdleCallback = idleCb
  componentExpiredCallback = expiredCb
  componentExpiredCallback = expiredCb
  componentOutsideExpired = outsideCb

  if (/*@cc_on!@*/false) { // check for Internet Explorer
    document.onfocusin = onTabFocus
  } else {
    window.onfocus = onTabFocus
  }

  session.reset()
}
export function resetSession() {
  refreshSession().catch(componentExpiredCallback)
}
export function destroySession() {
  session.destroy()
}


/////////////////////
// events
function onSessionIdle() {
  if (shouldShowWarning()) {
    componentIdleCallback()
  }
}
function onTabFocus() {
  if (getLocalToken() === null && routeRequiresAuth()) {
    componentOutsideExpired()
  }
}


/////////////////////
// helpers
function shouldShowWarning() {
  return getLocalToken() !== null && routeRequiresAuth()
}
function refreshSession() {
  const url = process.env.NODE_ENV === 'development' ? 'oktapreview' : 'okta'
  return new Promise(async (resolve, reject) => {
    try {
      await getSession(url) // due to a bug in okta, '/me' alone will refresh the token
    }
    catch(error) {
      reject(error);
    }
  })
}
async function getSession(url) {
  return new Promise((resolve, reject) => {
    fetch(`https://bioappdev.${url}.com/api/v1/sessions/me`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      if (!res.ok) {
        reject()
      }
    })
  })
}
function getLocalToken() {
  let token = JSON.parse(window.localStorage.getItem('okta-token-storage'))
  return truthy(token) ? token : null
}
function routeRequiresAuth() {
  return get(router, 'app.$route.meta.requiresAuth', false)
}
