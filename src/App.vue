<template>
  <section>
    <!-- <AppHeader class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"> -->
    <AppHeader class="bg-gray-200">
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
        <div class="text-lg font-medium">Lönekalkylator</div>
      </template>
      <template v-slot:right>
        <a
          class="ml-auto cursor-pointer select-none"
          href="https://github.com/Samk13"
          target="_blank"
          >About</a
        >
      </template>
    </AppHeader>

    <Container
      width="xl"
      class="text-white mt-10 pt-16 flex flex-col md:flex-row justify-center rounded-lg"
    >
      <!-- input start -->
      <section class="w-full md:w-1/2 md:mr-10">
        <form @submit.prevent="onFormSubmit()">
          <label class="text-2xl font-semibold">userProfession</label>
          <div class="flex flex-col xl:flex-row xl:space-x-2 mb-5">
            <div
              v-for="(oneuserProfession, index) in userProfession"
              :key="index"
            >
              <radio
                class="min-w-20 inline-flex w-full items-center border rounded-lg my-2"
                v-model="picked"
                :val="oneuserProfession"
                name="userProfession"
                >{{ oneuserProfession }}</radio
              >
            </div>
          </div>
          <div class="h-30">
            <label for="exyears" class="text-2xl font-semibold"
              >Erfarenhet</label
            >
            <InputComponent
              id="exyears"
              class="w-full"
              placeholder="Enter your Years of experience between 0 - 65"
              v-model="yearsOfExperience"
            />
            <div
              v-if="isNaN(yearsOfExperience)"
              class="mb-10 text-red-500 font-thin transition transition-all"
            >
              please enter a valid number between 0 and 65
            </div>
            <div v-else class="h-10"></div>
          </div>
          <!--  there is many way to aproch this number check I decided to go with this stupid simple way -->
          <DropDown
            class="text-2xl font-semibold"
            v-model="selectedCity"
            :options="cityOption"
            >Ort</DropDown
          >
          <DropDown
            class="text-white font-black"
            v-model="selectedYear"
            :options="yearsOption"
            >Inkomstår</DropDown
          >
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
          <div class="text-sm my-3">base sallary {{ baseSalary }}</div>
          <hr />
          <div class="text-sm my-3">
            after Your years of experience {{ experiancePercentage }}
          </div>
          <hr />
          <div class="text-sm my-3">after tax {{ taxRate }}</div>
          <hr />
          <a href="#" target="_blank">
            <div
              class="bg-gradient-base border border-blue-600 hover:bg-white text-white hover:text-blue-600 font-bold uppercase text-xs mt-5 py-2 px-4 rounded cursor-pointer"
            >
              submit
            </div>
          </a>
        </div>
      </section>
    </Container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useSalary from '@/modules/salary'
// reason why I made index.ts in components folder for cleaner import
import {
  InputComponent,
  SubmitButton,
  Container,
  AppHeader,
  DropDown,
  Radio
} from '@/components'

export default defineComponent({
  name: 'App',
  components: {
    InputComponent,
    SubmitButton,
    Container,
    AppHeader,
    DropDown,
    Radio
  },
  setup() {
    const {
      experiancePercentage,
      yearsOfExperience,
      userProfession,
      selectedCity,
      selectedYear,
      yearsOption,
      cityOption,
      baseSalary,
      picked,
      taxRate
    } = useSalary()

    const onFormSubmit = () => {
      return console.log('submitted')
    }

    return {
      experiancePercentage,
      yearsOfExperience,
      userProfession,
      selectedYear,
      onFormSubmit,
      selectedCity,
      yearsOption,
      baseSalary,
      cityOption,
      taxRate,
      picked
    }
  }
})
</script>
