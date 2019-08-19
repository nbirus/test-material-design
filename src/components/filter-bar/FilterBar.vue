<template>
  <div class="v-filter-bar">

    <!-- form chips -->
    <form-builder
      class="v-filter-bar-chip-form"
      :id="id"
      :key="aside"
      :form="chipForm"
      persist
      submit-on-change
      :active-fields.sync="activeFields"
      @submit="onSubmit"
    />

    <!-- all filters toggle -->
    <v-btn 
      class="v-filter-bar-aside-toggle chip-button"
      :class="{ active: activeFields.length }"
      depressed
      rounded
      @click="aside=true"
    >
      All Filters
      <span v-if="activeFields.length" v-html="activeFields.length"></span>
    </v-btn>

    <!-- aside -->
    <v-navigation-drawer
      class="pa-5"
      v-model="aside"
      absolute
      temporary
      right
      width="350"
    >

      <div class="header d-flex">
        <div class="title">Filter Samples</div>
        <v-spacer></v-spacer>
        <v-btn depressed rounded @click="aside=false">
          Close
        </v-btn>
      </div>

      <v-divider class="my-4" />

      <!-- aside form -->
      <form-builder
        :id="id"
        :key="aside"
        :form="form"
        persist
        submit-on-change
        @submit="onSubmit"
      />

    </v-navigation-drawer>

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
    id: String,
    form: Object,
  },
  data() {
    return {
      aside: false,
      chipForm: [],
      activeFields: [],
    }
  },
  created() {
    this.chipForm = this.$h.cloneDeep(this.form)
    this.chipForm.schema.forEach(field => {
      field.wrapper = 'chip'
    })
  },
  methods: {
    onSubmit(model) {
      this.$emit('submit', model)
    },
  },
}
</script>

<style lang="scss">

.v-filter-bar {
  display: flex;
}
.v-filter-bar-chip-form {
  flex: 0 0 auto;
}
.v-filter-bar-aside-toggle {
  flex: 0 0 auto;
}
.form-builder-field.active, .chip-button.active {
  border: solid thin red;
}

</style>
