<template>
  <div class="data-table-pagination-bar">

    <v-pagination 
      :value="page" 
      :length="pageCount"
      @input="$emit('page-change', $event)"
    />

    <v-text-field
      :value="itemsPerPage"
      label="Items per page"
      type="number"
      min="-1"
      max="15"
      @input="$emit('per-page-change', $event)"
    ></v-text-field>
    
  </div>
</template>

<script>
export default {
  name: 'data-table-pagination',
  props: ['page', 'pageCount', 'itemsPerPage'],
  watch: {
    'page'(page) {
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style>

</style>
