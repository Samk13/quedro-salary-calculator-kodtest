<template>
  <section>
    <AppHeader class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
      <template v-slot:left>
        <a class="skip-link" href="#maincontent">
          <img
            class="inline-block w-auto h-6"
            src=".\assets\quedro_logo-dark.png"
            alt="quedro logo"
          />
        </a>
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

    <Container
      width="xl"
      class="text-white mt-10 pt-16 flex flex-col md:flex-row justify-center rounded-lg"
    >
      <!-- input start -->
      <section class="w-full md:w-1/2 md:mr-10">
        <form>
          <label class="text-2xl font-bold">Yrke</label>
          <div class="flex flex-col xl:flex-row xl:space-x-2 ml-2">
            <div v-for="(oneyrke, index) in yrke" :key="index">
              <radio
                class="min-w-20 text-white inline-flex w-full items-center border rounded-lg my-2 px-3"
                v-model="picked"
                :val="oneyrke"
                name="yrke"
              >{{ oneyrke }}</radio>
            </div>
          </div>
          <div class="h-30">
            <label for="exyears" class="text-2xl font-bold">Erfarenhet</label>
            <InputComponent
              id="exyears"
              class="w-full"
              placeholder="Enter your Years of experience between 0 - 65"
              v-model="yearsOfExperience"
            />
            <div
              v-if="isNaN(yearsOfExperience)"
              class="mb-10 text-red-500 font-thin w-full md:w-1/2"
            >please enter a valid number between 0 and 65</div>
            <div v-else class="h-10"></div>
          </div>
          <!--  there is many way to aproch this number check I decided to go with this stupid simple way -->
          <DropDown class="text-2xl font-bold" v-model="selectedCity" :options="cityOption">Ort</DropDown>
          <DropDown
            class="text-white font-black"
            v-model="selectedYear"
            :options="yearsOption"
          >Inkomstår</DropDown>
        </form>
      </section>

      <!-- input end -->
      <section class="w-full md:w-1/2 text-white">
        <div
          class="border rounded-lg text-center p-5 md:mx-0 my-2 my-2 bg-blue-600 font-medium shadow-lg"
        >
          <h1 class="text-5xl text-white">Lön specifikation</h1>
          <div id="month" class="font-bold text-6xl flex">
            <span class="text-2xl mr-2 w-1/2 m-auto">SEK</span>
            <span class="text-4xl w-1/2 m-auto">{{ taxRate }}</span>
          </div>
          <hr />
          <div class="text-sm my-3">base sallary {{ salary }}</div>
          <hr />
          <div class="text-sm my-3">after Your years of experience {{ experiancePercentage }}</div>
          <hr />
          <div class="text-sm my-3">after tax {{ taxRate }}</div>
          <hr />
          <a href="#" target="_blank">
            <div
              class="bg-gradient-base border border-blue-600 hover:bg-white text-white hover:text-blue-600 font-bold uppercase text-xs mt-5 py-2 px-4 rounded cursor-pointer"
            >submit</div>
          </a>
        </div>
      </section>
    </Container>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
// reason why I made index.ts in components folder for cleaner import
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
    const yearsOfExperience = ref('')
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
      if (picked.value === yrke[0]) {
        return 30000
      } else if (picked.value === yrke[1]) {
        return 27000
      } else if (picked.value === yrke[2]) {
        return 25000
      } else return 0
    })

    const experiancePercentage = computed(() => {
      if (isNaN(parseInt(yearsOfExperience.value))) {
        return salary.value
      } else if (
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
        parseInt(yearsOfExperience.value) < 65
      ) {
        return (60 / 100) * salary.value + salary.value
      } else return salary.value
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

