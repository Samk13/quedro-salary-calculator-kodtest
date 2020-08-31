<template>
  <!-- don't forget symantic html -->
  <section class="bg-gray-900 h-screen">
    <Container width="xl" class="bg-red-200">
      <HelloWorld class="bg-green-200 font-normal" msg="Sam prop Test🎅" />
    </Container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// reason why I made index.ts in components folder for cleaner import as you can see here👇
import { HelloWorld, Container } from '@/components'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Container
  }
})
</script>
