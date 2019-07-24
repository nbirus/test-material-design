<template>
  <v-navigation-drawer :value="drawer" @input="$emit('update:input', $event)" :clipped="$vuetify.breakpoint.lgAndUp" app>
    
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'app-nav-aside',
  props: {
    drawer: Boolean
  }
}
</script>

<style>

</style>
