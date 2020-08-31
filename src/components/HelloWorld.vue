<template>
  <div class="font-normal text-3xl font-black font-mono">
    <h1>Sam's compoenet message</h1>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  }
})
</script>
