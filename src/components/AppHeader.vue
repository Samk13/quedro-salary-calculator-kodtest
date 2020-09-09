<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow">
    <Container width="xl" class="h-16 flex items-center justify-between">
      <div class="font-black text-gray-900 w-1/3">
        <slot name="left" />
      </div>
      <div class="text-center text-sm  text-gray-900 w-1/3">
        <slot name="middle" />
      </div>
      <div class="text-right w-1/3">
        <slot name="right" />
      </div>
    </Container>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Container } from '@/components'
export default defineComponent({
  components: {
    Container
  }
})
</script>
