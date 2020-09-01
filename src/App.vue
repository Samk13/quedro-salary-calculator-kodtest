<template>
  <!-- don't forget symantic html -->
  <section class="bg-gray-900 h-screen">
    <AppHeader class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
      <template v-slot:left>
        <img class="h-12 mr-2 min-w-20" src=".\assets\quedro_logo-dark.png" alt="quedro logo" />
      </template>
      <template v-slot:middle>
        <div class="m-auto text-xl font-black w-1/3">Lönekalkylator</div>
      </template>
      <template v-slot:right>
        <a
          class="ml-4 cursor-pointer select-none"
          href="https://www.linkedin.com/in/samarbid/"
          target="_blank"
        >About</a>
      </template>
    </AppHeader>
    <Container width="xl" class="bg-red-200 mt-16">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <SubmitButton class="m-4 p-4">Beräkna lön</SubmitButton>
      </div>
    </Container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// reason why I made index.ts in components folder for cleaner import as you can see here👇
import { SubmitButton, Container, AppHeader } from '@/components'

export default defineComponent({
  name: 'App',
  components: {
    SubmitButton,
    Container,
    AppHeader
  }
})
</script>
