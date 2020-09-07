<template>
  <label class="block">
    <span>
      <slot />
    </span>
    <select
      @change="$emit('input', $event.target.value)"
      class="form-select mt-1 block w-full border border-gray-500 text-xl rounded-lg cursor-pointer text-black-600 h-10 pl-5 pr-10 bg-gray-900 hover:border-gray-400 hover:bg-gray-900"
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