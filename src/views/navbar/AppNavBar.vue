<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue"
    dark
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <v-app-bar-nav-icon @click.stop="$emit('update:drawer', !drawer)"></v-app-bar-nav-icon>
      <span class="hidden-sm-and-down">Pedmatch</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      label="Search"
      class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon></v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon></v-icon>
    </v-btn>
    <v-btn
      icon
      large
    >
      <v-avatar
        size="32px"
        item
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        >
        </v-img></v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'app-nav-bar',
  props: {
    drawer: Boolean
  }
}
</script>

<style>

</style>
