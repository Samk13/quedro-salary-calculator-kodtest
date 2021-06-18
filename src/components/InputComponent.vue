<template>
  <div class="rounded-lg shadow">
    <input
      @input="onInput($event)"
      :value="val"
      :placeholder="placeholder"
      class="p-3 rounded-lg text-gray-900 font-bold focus:outline-none block w-full"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

interface Props {
  placeholder: string
  label: string
}

export default defineComponent({
  props: {
    placeholder: {
      required: false,
      type: String
    },
    label: {
      required: false,
      type: String
    }
  },
  setup(props: Props, context) {
    const val = ref<unknown>(context.attrs.value)
    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      val.value = target.value
      context.emit('input', target.value)
    }
    return {
      val,
      onInput
    }
  }
})
</script>
