<template>
  <v-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="model"
    :items-per-page="10000"
  ></v-data-table>
</template>

<script>
export default {
  name: 'data-table',
  inheritAttrs: false,
  props: {
    headers: Array,
    model: Array,
  }
}
</script>

<style>

</style>
