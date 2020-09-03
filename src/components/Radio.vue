<template>
  <label class="inline-flex items-center">
    <input
      @change="$emit('input', $event.target.value)"
      :checked="val == value"
      class="form-radio h-8 w-8 text-purple-600"
      :value="val"
      :name="name"
      type="radio"
    />
    <span class="ml-2 font-black p-5 border rounded-lg my-5 px-10">
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
