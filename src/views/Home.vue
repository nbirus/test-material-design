<template>
  <div class="test">

    <v-text-field v-model="name" />

    <!-- <data-wrapper :data="model" v-slot="{ _state: _asyncState }"> -->
      <data-wrapper :data="model" :params="{ name }" v-slot="{ _state }">
        <state-handler v-bind="_state">
          <div key="loading" slot="loading">load</div>
          <div key="error" slot="error">{{_state.error}}</div>
          <data-table 
            :headers="headers"
            :model="_state.data"
            hide-default-footer
          />
        </state-handler>
      </data-wrapper>
    <!-- </data-wrapper> -->

  </div>
</template>

<script>
import DataTable from '../components/table/DataTable';

export default {
  components: {
    DataTable,
  },
  data: () => ({
    headers: [
      { text: 'Carbs', value: 'name' },
      { text: 'Protein', value: 'protein' },
      { text: 'Iron', value: 'iron' },
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
  })
};
</script>

<style lang="scss" scoped>
.test {
  padding: 3rem;
}
</style>
