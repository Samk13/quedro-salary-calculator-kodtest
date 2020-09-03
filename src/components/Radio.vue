<template>
  <label class="inline-flex items-center border rounded-full my-2 px-10 w-full md:w-1/2">
    <input
      @change="$emit('input', $event.target.value)"
      :checked="val == value"
      class="form-radio h-8 w-8 text-purple-600"
      :value="val"
      :name="name"
      type="radio"
    />
    <span class="m-auto text-lg font-black p-5">
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
