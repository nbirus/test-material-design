<template>
  <div class="filter-bar">
    <form-builder
      :form="menuForm"
      v-bind="$attrs"
      hide-buttons
    />
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
