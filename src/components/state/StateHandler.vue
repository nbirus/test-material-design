<script>
import DefaultLoading from './Loading'
import DefaultError from './Error'
import { truthy } from '@/services/CommonsService'

export default {
  name: 'state-handler',
  functional: true,
  inheritAttrs: false,
  props: {
    data: [Object, Array],
    loading: Boolean,
    error: [String, Error],
    refresh: Function,
    ignoreLoading: Boolean,
    ignoreError: Boolean,
    keepAlive: Boolean,
    noTransition: Boolean,
    transitionName: {
      type: String,
      default: 'fade'
    },
  },
  render(createElement, { injections, props, slots }) {

    let child = slots().default

    // loading 
    if ((!props.ignoreLoading && props.loading) || (props.keepAlive && truthy(props.data))) {
      child = slots().loading || createElement(DefaultLoading, { props: { key: 'loading' } } )
    }
    // error 
    else if (!props.ignoreError && truthy(props.error)) {
      child = slots().error || createElement(DefaultError, { props: { key: 'error' } } )
    }

    return createElement(
      'transition', 
      { 
        props: {
          name: props.transitionName,
          appear: !props.noTransition,
          mode: 'out-in',
        } 
      },
      [ child ],
    )
  },
}
</script>