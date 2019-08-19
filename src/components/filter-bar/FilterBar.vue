<template>
  <div class="filter-bar">

    <form-builder
      :form="form"
      v-bind="$attrs"
      hide-buttons
    />

    <!-- form -->
    <!-- <form-builder
      :form="menuForm"
      v-bind="$attrs"
      hide-buttons
    /> -->

    <!-- all filters toggle -->
    <!-- <v-btn 
      class="mr-3"
      depressed
      rounded
      @click="aside=true"
    >
      All Filters
    </v-btn> -->

    <!-- aside form -->
    <!-- <v-navigation-drawer
      class="pa-5"
      v-model="aside"
      absolute
      temporary
      right
      width="300"
    >

      <div class="header d-flex">
        <div class="title">Filter Samples</div>
        <v-spacer></v-spacer>
        <v-btn depressed rounded @click="aside=false">
          Close
        </v-btn>
      </div>

      <v-divider class="my-4" />

      <form-builder
        :form="form"
        v-bind="$attrs"
        hide-buttons
      />

    </v-navigation-drawer> -->

  </div>
</template>

<script>
import FormBuilder from '@/components/form/FormBuilder'

export default {
  name: 'filter-bar',
  components: {
    FormBuilder,
  },
  model: {
    prop: 'model',
    event: 'submit',
  },
  props: {
    form: Array,
    model: Object,
  },
  data() {
    return {
      aside: true,
      menuForm: [],
      value: {},
    }
  },
  created() {
    this.menuForm = this.form.map(field => ({
      ...field,
      wrapper: 'menu',
    }))
  },
}
</script>

<style>

</style>
