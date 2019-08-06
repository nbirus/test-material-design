<template>
  <div class="date-table-wrapper" :class="{ dense, loading }" :style="`min-height: ${defaultMinHeight}`">

    <!-- data table -->
    <v-data-table
      v-bind="$attrs"
      :headers="headers"
      :items="model"
      :loading="loading"
      :dense="dense"
      loading-text=""
      hide-default-footer
      :page="page"
      :items-per-page="itemsPerPage"
      @page-count="$emit('page-count', $event)"
    ></v-data-table>

    <!-- loading overlay -->
    <v-overlay color="white" light absolute :value="loading">
      <v-progress-circular
        v-if="!$h.truthy(model)"
        color="light-blue"
        indeterminate
        :size="42"
        :width="2"
      />
    </v-overlay>

  </div>
</template>

<script>
export default {
  name: 'data-table',
  inheritAttrs: false,
  props: {
    headers: Array,
    model: Array,
    loading: Boolean,
    dense: Boolean,
    minHeight: String,
    noPagination: Boolean,
    page: Number,
    itemsPerPage: Number,
  },
  data(){
    return {
      defaultMinHeight: this.dense ? '320px' : '500px',
    } 
  }
}
</script>

<style lang="scss">
.date-table-wrapper {
  position: relative;

  &.loading {
    .v-data-footer, tbody tr {
      visibility: hidden;
    }
  }

  // remove table header from loading overlay
  &:not(.dense) {
    >.v-overlay {
      margin-top: 43px;
    }
  }
  &.dense {
    >.v-overlay {
      margin-top: 34px;
    }
  }
}
</style>
