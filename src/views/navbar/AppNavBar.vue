<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-toolbar-title>
      
    </v-toolbar-title>
    <!-- <v-text-field
      flat
      solo-inverted
      hide-details
      label="Search"
    ></v-text-field> -->

    <v-btn color="red" @click="logout">Logout</v-btn>

  </v-app-bar>
</template>

<script>
export default {
  name: 'app-nav-bar',
  props: {
    drawer: Boolean
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>

</style>
