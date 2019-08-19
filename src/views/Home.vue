<template>
  <div class="test">

  <filter-bar
    id="home-form"
    :form="form"
    @submit="onSubmit"
  /> 

  <!-- <form-builder 
    id="home-form"
    ref="form"
    :form="form"
    persist
    :is-form-valid.sync="isFormValid"
    :activeFields.sync="activeFields"
    v-model="formModel"
  /> -->

  <!-- <v-btn
    :disabled="!isFormValid"
    color="success"
    class="mr-4"
    @click="$refs.form.submit()"
  >
    Submit
  </v-btn>

  <v-btn color="error" class="mr-4" @click="$refs.form.reset()">
    Reset Form
  </v-btn> -->

  <!-- <form-builder 
    id="home-form"
    :form="form"
    v-model="formModel"
    :submitOnMount="false"
    :submitOnChange="false"
    @submit="onSubmit"
    @change="onChange"
  /> -->

  <br>
  <br>

  <pre>
    {{formModel}}
  </pre>

  <!-- <v-text-field v-model="name" outlined label="Keyword" style="width: 200px"/>
  <v-carousel 
    :height="800" 
    class="carousel" 
    show-arrows
    show-arrows-on-hover
    progress-color="white"
  >
    <v-carousel-item
      v-for="color in colors"
      :key="color"
      :height="800" 
    >
      <v-sheet
        color="white"
        height="100%"
        tile
        light
      >

        <div class="card-grid">
          <v-card class="card elevation-3" v-for="i in 6" :key="`${i}${color}`">
            <data-table-wrapper
              :data="model"
              :params="{ _keyword: name, ...formModel }"
              :headers="headers"
              :page-size="5"
              dense
            />
          </v-card>
        </div>
        
      </v-sheet>
    </v-carousel-item>
  </v-carousel> -->

  <!-- <data-table-wrapper
    :data="model"
    :params="{ _keyword: name, ...formModel }"
    :headers="headers"
  /> -->
  
    <!-- <state-handler :loading="loading" :error="''">
      <div key="loading" slot="loading">LOADING</div>
      <div slot="error">ERROR</div>
      <div key="response">RESPONSE</div>
    </state-handler> -->

  </div>
</template>

<script>
import DataTableWrapper from '../components/table/wrappers/DataTableWrapper'
import FormBuilder from '@/components/form/FormBuilder'
import FilterBar from '@/components/filter-bar/FilterBar'
import { mapGetters, mapActions } from 'vuex'

import Test from '@/data/forms/Test'
import TestColumns from '@/data/columns/Test'

export default {
  components: {
    DataTableWrapper,
    FormBuilder,
    FilterBar,
  },
  data: () => ({
    form: Test,
    formModel: {},
    loading: true,
    isFormValid: true,
    activeFields: [],
    headers: [
      { text: 'Carbs', value: 'name' },
      { text: 'Protein', value: 'protein' },
      { text: 'Iron', value: 'iron' },
    ],
    colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
    name: '',
    model: TestColumns,
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  },
  methods: {
    onSubmit(model) {
      this.formModel = model
      console.log('submit', JSON.stringify(model));
    },
    onChange() {
      console.log('change');
    },
  }
};
</script>

<style lang="scss" scoped>

// Get Colors
/*

  // theme colors
  map-get($primary, 'base')
  map-get($secondary, 'base')

  // colors
  map-get($blue, 'base')
  map-get($blue, 'lighten-1')
  ...

*/

.test {
  padding: 3rem;
}

.carousel {
  margin-bottom: 2rem;
}
.card-grid {
  display: grid;
  height: 100%;
  grid-template-rows: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 2rem 2rem 5rem;

  .card {
    background-color: white;
    height: 100%;
    overflow: hidden;
  }
}
</style>
