<template>
  <v-app id="app">

    <!-- navigation and sidebar -->
    <app-nav-aside />
    <app-nav-bar />

    <!-- main site content -->
    <v-content>
      <router-view />
    </v-content>

  </v-app>
</template>

<script>
import AppNavBar from '@/views/navbar/AppNavBar'
import AppNavAside from '@/views/nav-aside/AppNavAside'

export default {
  name: 'app',
  components: { 
    AppNavBar,
    AppNavAside,
  },
}
</script>

