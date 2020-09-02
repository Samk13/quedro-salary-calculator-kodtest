<template>
  <label class="block">
    <span>
      <slot />
    </span>
    <select
      @change="$emit('input', $event.target.value)"
      class="form-select mt-1 block w-full md:w-1/2 border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
    >
      <option
        v-for="(option, index) in options"
        :value="option.value"
        :key="index"
        :selected="option.value === value"
      >{{ option.label }}</option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
}

export default defineComponent({
  props: {
    options: {
      required: true,
      type: Array
    }
  },
  setup(props: Props, { attrs: { value } }) {
    return {
      value
    }
  }
})
</script>