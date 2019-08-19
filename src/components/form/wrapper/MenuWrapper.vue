<template>
  <v-menu
    bottom
    origin="center center"
    transition="scale-transition"
    :close-on-content-click="false"
  >
  
    <!-- pill button -->
    <template v-slot:activator="{ on }">
      <v-btn 
        class="mr-3"
        depressed
        rounded
        v-on="on" 
        v-html="label"
      />
    </template>

    <!-- input slot -->
    <v-card class="pa-4 pb-1" width="300px">
      <slot/>
    </v-card>

  </v-menu>
</template>

<script>
export default {
  name: 'menu-wrapper',
  inheritAttrs: false,
  props: {
    label: String,
  }
}
</script>

<style>

</style>
