<template>
  <button type="submite" :class="classList">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

interface Props {
  disabled: boolean
}

export default defineComponent({
  props: {
    disabeld: {
      type: Boolean,
      required: false,
      default: false
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props: Props) {
    const classList = computed(() => {
      const classes = [
        'rounded-lg',
        'uppercase',
        'font-black',
        'bg-gradient-to-l from-orange-400 via-red-500 to-pink-500',
        'transition-all',
        'duration-150',
        'shadow'
      ]
      if (props.disabled) {
        classes.push('opacity-75', 'cursor-not-allowed')
      }
      return classes.join(' ')
    })

    return {
      classList
    }
  }
})
</script>
