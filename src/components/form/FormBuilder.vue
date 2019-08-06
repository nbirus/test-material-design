<template>
  <v-form ref="form" v-model="valid" lazy-validation>

    <component 
      v-for="field in form"
      :is="`v-${field.type}`"
      :id="`${id}-${field.id}-input`"
      :key="`${id}-${field.id}-input`"
      v-bind="field.props"
      v-model="modelReference[field.id]"
    />

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submit(modelReference)"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>

  </v-form>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions } from 'vuex'
import { VTextField } from 'vuetify/lib'

export default {
  name: 'form-builder',
  components: {
    VTextField,
  },
  props: {
    id: String,
    form: Array,
    model: Object,
    submitOnChange: Boolean,
    submitOnMount: Boolean,
    persist: Boolean,
  },
  data() {
    return {
      valid: false,
      modelReference: {},
    }
  },
  model: {
    prop: 'model',
    event: 'submit',
  },
  created() {
    if (this.persist) {
      let persistedModel = this.getModel(this.id)
      this.modelReference = cloneDeep(persistedModel || this.model)
    }
    else {
      this.modelReference = cloneDeep(this.model)
    }
  },
  mounted() {
    if (this.submitOnMount) {
      this.$nextTick(this.submit)
    }
  },
  computed: {
    ...mapGetters('form', ['getModel'])
  },
  methods: {
    ...mapActions('form', ['setModel']),
    submit(model = this.modelReference) {
      if (this.$refs.form.validate()) {

        // emmit result
        this.$emit('submit', cloneDeep(model))

        // set persisted model
        if (this.persist) {
          this.setModel({ id: this.id, model })
        }
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  watch: {
    'modelReference': {
      handler(model) {
        if (this.submitOnChange) {
          this.submit(model)
        }
      },
      deep: true,
    }
  }
}
</script>