<template>
  <section class="bg-gray-900 h-screen">
    <AppHeader class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
      <template v-slot:left>
        <img class="inline-block w-auto h-6" src=".\assets\quedro_logo-dark.png" alt="quedro logo" />
      </template>
      <template v-slot:middle>
        <div class="text-lg font-black">Lönekalkylator</div>
      </template>
      <template v-slot:right>
        <a
          class="ml-auto cursor-pointer select-none"
          href="https://github.com/Samk13"
          target="_blank"
        >About</a>
      </template>
    </AppHeader>
    <br />
    <!-- <Container width="xl" class="mt-16 bg-white rounded-lg shadow-md rounded px-8 pt-10 pb-8"> -->
    <Container width="xl" class="rounded-lg pt-16 pb-20 h-screen">
      <div class="my-10">
        <div v-for="(oneyrke, index) in yrke" :key="index">
          <radio class="text-white" v-model="picked" :val="oneyrke" name="yrke">{{ oneyrke }}</radio>
        </div>
        <div
          class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2"
        >Jag är en {{ picked }}</div>
      </div>

      <DropDown class="text-white font-black" v-model="selectedCity" :options="cityOption">Ort</DropDown>
      <div
        class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2"
      >Selected: {{ selectedCity }}</div>
      <DropDown
        class="text-white font-black"
        v-model="selectedYear"
        :options="yearsOption"
      >Inkomstår</DropDown>
      <div
        class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2"
      >Selected: {{ selectedYear }}</div>
      <SubmitButton class="mx-4 py-2 px-6">Beräkna lön</SubmitButton>
    </Container>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
// reason why I made index.ts in components folder for cleaner import as you can see here👇
import {
  SubmitButton,
  Container,
  AppHeader,
  DropDown,
  Radio
} from '@/components'

export default defineComponent({
  name: 'App',
  components: {
    SubmitButton,
    Container,
    AppHeader,
    DropDown,
    Radio
  },
  setup() {
    const selectedCity = ref('')
    const selectedYear = ref('')
    const cityOption = [
      { value: 'Stockholm', label: 'Stockholm' },
      { value: 'Gothenburg', label: 'Gothenburg' }
    ]
    const yearsOption = [
      { value: '2019', label: '2019' },
      { value: '2020', label: '2020' }
    ]
    const picked = ref('Programmerare')
    const yrke = ['Programmerare', 'Lärare', 'Kassabiträde']

    return {
      selectedCity,
      cityOption,
      yearsOption,
      selectedYear,
      picked,
      yrke
    }
  }
})
</script>
