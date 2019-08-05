<template>
  <div class="test">

    <form-builder 
      :form="form"
      v-model="formModel"
    />
    <form-builder 
      :form="form"
      v-model="formModel"
    />

    <pre>{{formModel}}</pre>

  <v-text-field v-model="name" outlined label="Keyword" style="width: 200px"/>

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
      >

        <div class="card-grid">
          <v-card class="card elevation-3" v-for="i in 9" :key="`${i}${color}`">
            
            <data-wrapper :data="model" :params="{ _keyword: name }" v-slot="{ _state }">
              <state-handler v-bind="_state" :loading="_state.loading" ignore-loading>
                <div key="error" slot="error">{{_state.error}}</div>
                <data-table 
                  class="elevation-3"
                  :headers="headers"
                  :model="_state.data"
                  :loading="_state.loading"
                  no-pagination
                  light
                />
              </state-handler>
            </data-wrapper>

          </v-card>
        </div>
        
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

    <!-- <state-handler :loading="loading" :error="''">
      <div key="loading" slot="loading">LOADING</div>
      <div slot="error">ERROR</div>
      <div key="response">RESPONSE</div>
    </state-handler> -->

    <data-wrapper :data="model" :params="{ _keyword: name }" v-slot="{ _state }">
      <state-handler v-bind="_state" :loading="_state.loading" ignore-loading>
        <div key="error" slot="error">{{_state.error}}</div>
        <data-table 
          class="elevation-1"
          :headers="headers"
          :model="_state.data"
          :loading="_state.loading"
          no-pagination
        />
      </state-handler>
    </data-wrapper>

  </div>
</template>

<script>
import DataTable from '../components/table/DataTable'
import FormBuilder from '../components/form/FormBuilder'

export default {
  components: {
    DataTable,
    FormBuilder,
  },
  data: () => ({
    form: [
      {
        type: 'text-field',
        id: 'email',
        props: {
          label: 'Email',
          placeholder: 'Enter a keyword',
          required: true,
          rules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
        },
      },
    ],
    formModel: {
      email: ''
    },
    loading: true,
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
    
    model: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
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
    height: 200px;
    overflow: hidden;
  }
}
</style>
