<template>
  <section>
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

    <Container width="xl" class="rounded-lg pt-16 pb-20 h-screen">
      <div class="my-10">
        <div v-for="(oneyrke, index) in yrke" :key="index">
          <radio class="text-white" v-model="picked" :val="oneyrke" name="yrke">{{ oneyrke }}</radio>
        </div>
      </div>

      <InputComponent
        class="w-full md:w-1/2"
        placeholder="Years of experience"
        v-model="yearsOfExperience"
      />
      <!--  there is many way to aproch this number check I decided to go with this stupid simple way -->
      <div
        v-show="!!isNaN(yearsOfExperience)"
        class="mb-10 text-red-500 font-thin w-full md:w-1/2"
      >please enter a valid number between 0 and 50</div>
      <DropDown class="text-white font-black" v-model="selectedCity" :options="cityOption">Ort</DropDown>
      <DropDown
        class="text-white font-black"
        v-model="selectedYear"
        :options="yearsOption"
      >Inkomstår</DropDown>
      <!-- <div
        class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2"
      >Selected: {{ selectedYear }}</div>
      <div
        class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2"
      >Selected: {{ selectedCity }}</div>
      <div
        class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2"
      >Jag är en {{ picked }}</div>

      <div
        class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2"
      >number of years : {{ yearsOfExperience }}</div>-->
      <!-- <SubmitButton class="mx-4 py-2 px-6">Beräkna lön</SubmitButton> -->

      <div class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2">
        <span class="font-mono text-3xl">SEK {{ salary }}</span>
      </div>
      <div class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2">
        experiancePercentage
        <span class="font-mono text-3xl">SEK {{ experiancePercentage }}</span>
      </div>
      <div class="border rounded-lg p-3 text-center mt-10 text-white font-black w-full md:w-1/2">
        Tax rate
        <span class="font-mono text-3xl">SEK {{ taxRate }}</span>
      </div>
    </Container>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
// reason why I made index.ts in components folder for cleaner import as you can see here👇
import {
  SubmitButton,
  Container,
  AppHeader,
  DropDown,
  InputComponent,
  Radio
} from '@/components'

export default defineComponent({
  name: 'App',
  components: {
    SubmitButton,
    InputComponent,
    Container,
    AppHeader,
    DropDown,
    Radio
  },
  setup() {
    const selectedCity = ref('Stockholm')
    const selectedYear = ref('2020')
    const yearsOfExperience = ref('3')
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

    const salary = computed(() => {
      if (picked.value === 'Programmerare') {
        return 30000
      } else if (picked.value === 'Lärare') {
        return 27000
      } else if (picked.value === 'Kassabiträde') {
        return 25000
      } else return 0
    })

    const experiancePercentage = computed(() => {
      if (
        parseInt(yearsOfExperience.value) >= 0 &&
        parseInt(yearsOfExperience.value) <= 3
      ) {
        return salary.value
      } else if (
        parseInt(yearsOfExperience.value) > 3 &&
        parseInt(yearsOfExperience.value) <= 7
      ) {
        return (20 / 100) * salary.value + salary.value
      } else if (
        parseInt(yearsOfExperience.value) > 7 &&
        parseInt(yearsOfExperience.value) <= 10
      ) {
        return (40 / 100) * salary.value + salary.value
      } else if (
        parseInt(yearsOfExperience.value) > 10 &&
        parseInt(yearsOfExperience.value) < 50
      ) {
        return (60 / 100) * salary.value + salary.value
      } else return parseInt(yearsOfExperience.value)
    })

    const taxRate = computed(() => {
      if (
        experiancePercentage.value >= 36000 &&
        experiancePercentage.value <= 45000
      ) {
        return (
          experiancePercentage.value - (50 / 100) * experiancePercentage.value
        )
      } else if (experiancePercentage.value > 45000) {
        return (
          experiancePercentage.value - (70 / 100) * experiancePercentage.value
        )
      } else if (selectedCity.value === cityOption[0].value) {
        if (selectedYear.value === yearsOption[0].value) {
          return (
            experiancePercentage.value - (30 / 100) * experiancePercentage.value
          )
        } else if (selectedYear.value === yearsOption[1].value) {
          return (
            experiancePercentage.value - (29 / 100) * experiancePercentage.value
          )
        }
      } else if (selectedCity.value === cityOption[1].value) {
        if (selectedYear.value === yearsOption[0].value) {
          return (
            experiancePercentage.value - (25 / 100) * experiancePercentage.value
          )
        } else if (selectedYear.value === yearsOption[1].value) {
          return (
            experiancePercentage.value - (22 / 100) * experiancePercentage.value
          )
        }
      }
    })

    return {
      experiancePercentage,
      yearsOfExperience,
      selectedYear,
      selectedCity,
      yearsOption,
      cityOption,
      taxRate,
      salary,
      picked,
      yrke
    }
  }
})
</script>

