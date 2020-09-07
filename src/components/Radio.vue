<template>
  <label>
    <input
      @change="$emit('input', $event.target.value)"
      :checked="val == value"
      class="h-4 w-4 text-purple-600"
      :value="val"
      :name="name"
      type="radio"
    />
    <span class="m-auto font-black p-2">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String
    },
    val: {
      required: true,
      type: String
    }
  },
  setup(props, { attrs: { value } }) {
    return {
      value
    }
  }
})
</script>
