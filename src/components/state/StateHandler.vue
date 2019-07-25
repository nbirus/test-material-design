<template functional>
  <transition>

    <!-- LOADING: {{(!props.ignoreLoading && props.loading) || (props.keepAlive && props.data !== undefined)}} -->
    <!-- ERROR: {{(!props.ignoreError && props.error !== undefined)}} -->

    <!-- loading -->
    <component 
      :is="injections.components.DefaultLoading"
      v-if="(slots().default === undefined) && (!props.ignoreLoading && props.loading) || (props.keepAlive && props.data !== undefined)"
    />
    <slot name="loading" v-else-if="(!props.ignoreLoading && props.loading) || (props.keepAlive && props.data !== undefined)" ></slot>

    <!-- loading -->
    <component 
      :is="injections.components.DefaultError"
      v-else-if="(!props.ignoreError && props.error !== undefined) && (slots().error === undefined)"
    />
    <slot name="error" v-else-if="(!props.ignoreError && props.error !== undefined)"></slot>

    <!-- response -->
    <slot v-else></slot>

  </transition>
</template>

<script>
import DefaultLoading from './Loading'
import DefaultError from './Error'

export default {
  name: 'state-handler',
  inject: {
    components: {
      default: {
        DefaultLoading,
        DefaultError,
      }
    }
  },
  inheritAttrs: false,
  props: {
    data: [Object, Array],
    loading: Boolean,
    error: [String, Error],
    refresh: Function,
    ignoreLoading: Boolean,
    ignoreError: Boolean,
    keepAlive: Boolean,
    transitionName: {
      type: String,
      default: 'fade'
    },
  },
}
</script>





