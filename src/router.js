import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'

Vue.use(Router)
Vue.use(Auth, {
  issuer: process.env.VUE_APP_OKTA_CLIENT_ISSUER,
  client_id: process.env.VUE_APP_OKTA_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_SERVER_URL,
  scope: 'openid profile email roles',
})

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/implicit/callback', 
      component: Auth.handleCallback() 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "DashboardPage" */ '@/views/Home.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "DashboardPage" */ '@/views/session/LoginPage.vue'),
      meta: {
        title: 'Login',
      },
    },
  ]
})

// protect routes
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router