<template>
  <v-form ref="form" v-model="valid" lazy-validation>

    <!-- wrapper -->
    <component
      v-for="field in schema"
      :is="`${field.wrapper || 'default'}-wrapper`"
      :key="`${id}-${field.id}-wrapper`"
      :active="activeFieldsComputed.includes(field.id)"
      v-bind="field.props"
    >

      <!-- field -->
      <component 
        :is="`v-${field.type}`"
        :id="`${id}-${field.id}-input`"
        :key="`${id}-${field.id}-input`"
        v-bind="field.props"
        v-model="modelRef[field.id]"
      />

    </component>

  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Fields from './fields'
import Wrappers from './wrappers'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'form-builder',
  components: {
    ...Fields,
    ...Wrappers,
  },
  props: {
    id: String,
    form: Object,
    model: Object,
    activeFields: Array,
    submitOnChange: Boolean,
    submitOnMount: Boolean,
    isFormValid: Boolean,
    persist: Boolean,
  },
  data() {
    return {
      valid: false,
      schema: [],
      modelRef: {},
    }
  },
  model: {
    prop: 'model',
    event: 'change',
  },
  created() {

    // create schema and model
    this.modelRef = this.createModel()
    this.schema = this.createSchema()

    // init model change to parent
    this.$emit('change', this.modelRef)

  },
  mounted() {
    if (this.submitOnMount) {
      this.$nextTick(this.submit)
    }
  },
  computed: {
    ...mapGetters('form', ['getModel']),

    // use this computed property to keep track of active fields (see watcher)
    activeFieldsComputed() {
      return Object.keys(this.modelRef).filter(modelKey => {

        const schemaField = this.getSchemaField(modelKey)
        const value = this.modelRef[modelKey]

        if (schemaField.hasOwnProperty('isActive')) {
          return schemaField.isActive(value)
        }
        else {
          return this.$h.truthy(value)
        }
      })
    },

  },
  methods: {
    ...mapActions('form', ['setModel', 'clearForms']),

    // init
    createSchema() {
      return this.$h.get(this.form, 'schema', [])
    },
    createModel() {
      const defaultModel = cloneDeep(this.$h.get(this.form, 'model', {}))
      if (this.persist) {
        let persistedModel = this.getModel(this.id)
        return cloneDeep(persistedModel || defaultModel)
      }
      else {
        return defaultModel
      }
    },

    // actions
    submit() {
      if (this.$refs.form.validate()) {

        // get valid model
        const model = cloneDeep(this.modelRef)
        const transform = this.$h.get(this.form, 'transform', m => m)

        // emit transformed result
        this.$emit('submit', transform(model))

        // set persisted model
        if (this.persist) {
          this.setModel({ id: this.id, model })
        }

      }
    },
    reset() {
      this.$refs.form.reset()
      this.modelRef = cloneDeep(this.$h.get(this.form, 'model', {}))
      this.$emit('change', this.modelRef)
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },

    // utils
    getSchemaField(id) {
      return this.schema.find(field => field.id === id)
    },

  },
  watch: {
    'modelRef': {
      handler() {
        if (this.submitOnChange) {
          this.submit()
        }
      },
      deep: true,
    },
    'valid': {
      handler(valid) {
        this.$emit('update:isFormValid', valid)
      },
      immediate: true,
    },
    'activeFieldsComputed': {
      handler(activeFields) {
        this.$emit('update:activeFields', activeFields)
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>