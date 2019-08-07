
// timings
const warningMinutes = 28
const expirationMinutes = 2

// callbacks
let warningCallback = null
let expirationCallback = null

// timeouts
let warningTimeout = null
let expirationTimeout = null


export function initSession(onWarning, onExpiration) {

  // set up callbacks
  warningCallback = onWarning 
  expirationCallback = onExpiration
  window.addEventListener('mousedown', onInteraction)
  window.addEventListener('keydown', onInteraction)

  // eslint-disable no-constant-condition
  if (/*@cc_on!@*/false) {
    document.onfocusin = onInteraction
  } else {
    window.onfocus = onInteraction
  }

  // begin session
  startWarningCountDown()

}
export function destroySession() {

  clearTimeouts()

  window.removeEventListener('mousedown', onInteraction)
  window.removeEventListener('keydown', onInteraction)

  // eslint-disable no-constant-condition
  if (/*@cc_on!@*/false) {
    document.onfocusin = null
  } else {
    window.onfocus = null
  }
}
export function clearWarning() {
  startWarningCountDown()
}

function onInteraction() {
  if (interactionValid()) {

    // restart warning countdown
    startWarningCountDown()

    // check for session, expire if errored
    refreshSession().catch(expirationCallback)

  }
}
function startWarningCountDown() {
  clearTimeouts()
  // warningTimeout = setTimeout(startExpirationCountDown, warningMinutes * 1000 * 60)
  warningTimeout = setTimeout(startExpirationCountDown, 3000)
}
function startExpirationCountDown() {
  warningCallback()
  if (expirationTimeout !== null) {
    clearTimeout(expirationTimeout)
  }
  // expirationTimeout = setTimeout(expirationCallback, expirationMinutes * 1000 * 60)
  expirationTimeout = setTimeout(expirationCallback, 3000)
}
function clearTimeouts() {
  if (warningTimeout !== null) {
    clearTimeout(warningTimeout)
  }
  if (expirationTimeout !== null) {
    clearTimeout(expirationTimeout)
  }
}
function interactionValid() {
  console.log(window.localStorage.getItem('okta-token-storage'));
  return true
}

// refreshing session
function refreshSession() {
  const url = process.env.NODE_ENV === 'development' ? 'oktapreview' : 'okta'
  return new Promise(async (resolve, reject) => {
    try {
      await getSession(url)
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
      else {
        resolve(res.json())
      }
    })
  })
}