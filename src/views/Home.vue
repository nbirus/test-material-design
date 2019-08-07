<template>
  <div class="test">

    <v-btn @click="logout">Logout</v-btn>

    <!-- <form-builder 
      id="home-form"
      :form="form"
      v-model="formModel"
      persist
      submitOnMount
      submitOnChange
    /> -->

  <br>
  <br>
  <br>

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

  <data-table-wrapper
    :data="model"
    :params="{ _keyword: name, ...formModel }"
    :headers="headers"
  />
  
    <!-- <state-handler :loading="loading" :error="''">
      <div key="loading" slot="loading">LOADING</div>
      <div slot="error">ERROR</div>
      <div key="response">RESPONSE</div>
    </state-handler> -->

  </div>
</template>

<script>
import DataTableWrapper from '../components/table/wrappers/DataTableWrapper'
import FormBuilder from '../components/form/FormBuilder'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DataTableWrapper,
    FormBuilder,
  },
  data: () => ({
    form: [
      {
        type: 'text-field',
        id: 'name',
        props: {
          label: 'Email',
          placeholder: 'Enter a keyword',
          rules: [
            v => (v.length <= 10) || 'Name must be less than 10 characters',
          ],
        },
      },
    ],
    formModel: {
      name: '',
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
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({ path: '/login' })
    }
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
    height: 100%;
    overflow: hidden;
  }
}
</style>
