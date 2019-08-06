<template>
  <data-wrapper v-bind="$attrs" v-slot="{ _state }">
    <state-handler v-bind="_state" :loading="_state.loading" ignore-loading>
      <div key="error" slot="error">{{_state.error}}</div>
      <div>

        <!-- table -->
        <data-table 
          v-bind="$attrs"
          :model="_state.data"
          :loading="_state.loading"
          :page="pagination.page"
          :items-per-page="pagination.itemsPerPage"
          @page-count="pagination.pageCount=$event"
        />

        <!-- custom footer -->
        <data-table-pagination 
          v-if="!noPagination" 
          v-bind="pagination" 
          @page-change="pagination.page=$event"
          @per-page-change="pagination.itemsPerPage=$event"
        />

      </div>
    </state-handler>
  </data-wrapper>
</template>

<script>
import DataTable from '@/components/table/base/DataTable'
import DataTablePagination from '@/components/table/base/DataTablePagination'

export default {
  name: 'data-table-wrapper',
  inheritAttrs: false,
  components: {
    DataTable,
    DataTablePagination,
  },
  props: {
    noPagination: Boolean,
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      pagination: {
        page: 1,
        pageCount: 0,
        itemsPerPage: !this.noPagination ? this.pageSize : 10000,
      }
    }
  }
}
</script>

<style>

</style>
