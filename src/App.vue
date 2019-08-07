<template>
  <v-app id="app">

    <!-- navigation and sidebar -->
    <app-nav-aside />
    <app-nav-bar />

    <!-- main site content -->
    <v-content>
      <router-view />
    </v-content>

    <!-- top level components -->
    <session-modal />

  </v-app>
</template>

<script>
import AppNavBar from '@/views/navbar/AppNavBar'
import AppNavAside from '@/views/nav-aside/AppNavAside'
import SessionModal from '@/views/session/SessionModal'

export default {
  name: 'app',
  components: { 
    AppNavBar,
    AppNavAside,
    SessionModal,
  },
}
</script>

