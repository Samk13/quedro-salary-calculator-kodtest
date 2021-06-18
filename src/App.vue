<template>
  <section>
    <!-- <AppHeader class="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"> -->
    <AppHeader class="bg-blue-900">
      <template v-slot:left>
        <a class="skip-link" href="https://docs.paymentiq.io/europe" target="_blank">
          <img
            class="inline-block w-auto h-6"
            src=".\assets\quedro_logo-white.png"
            alt="quedro logo"
          />
        </a>
      </template>
      <template v-slot:middle>
        <div class="text-lg font-medium text-gray-400">Lönekalkylator</div>
      </template>
      <template v-slot:right>
        <a
          class="ml-auto cursor-pointer select-none text-gray-400"
          href="https://github.com/Samk13/quedro-salary-calculator-kodtest"
          target="_blank"
        >About</a>
      </template>
    </AppHeader>

    <Container width="xl">
      <form
        @submit.prevent="onFormSubmit()"
        class="text-white mt-10 pt-16 flex flex-col md:flex-row justify-center rounded-lg"
      >
        <section class="w-full md:w-1/2 md:mr-10">
          <label class="text-3xl text-white font-hairline uppercase">Yrke</label>
          <div class="flex flex-col xl:flex-row xl:space-x-2 mb-5">
            <div v-for="(profession, index) in userProfession" :key="index">
              <radio
                class="min-w-20 inline-flex w-full items-center border rounded-lg my-2"
                v-model="selectedProfession"
                :val="profession"
                name="userProfession"
              >{{ profession }}</radio>
            </div>
          </div>
          <div class="h-30">
            <label for="exyears" class="text-3xl text-white font-hairline uppercase">Erfarenhet</label>
            <InputComponent
              id="exyears"
              class="w-full"
              placeholder="Enter your Years of experience between 0 - 65"
              v-model="yearsOfExperience"
            />
            <div
              v-if="isNaN(yearsOfExperience)"
              class="text-orange-700 font-thin h-5 transition-all duration-500"
            >please enter a valid number between 0 and 65</div>
            <div v-else class="h-0"></div>
          </div>
          <!--  there is many way to aproch this number check I decided to go with this stupid simple way -->
          <DropDown
            class="text-3xl text-white font-hairline uppercase mt-5"
            v-model="selectedCity"
            :options="cityOption"
          >Ort</DropDown>
          <DropDown
            class="text-3xl text-white font-hairline uppercase mt-5"
            v-model="selectedYear"
            :options="yearsOption"
          >Inkomstår</DropDown>
        </section>

        <section class="w-full md:w-1/2 text-white mt-10">
          <div class="border rounded-lg p-5 md:mx-0 my-2 my-2 bg-blue-600 font-medium shadow-lg">
            <h1 class="text-3xl text-white font-hairline uppercase">Lön specifikation</h1>
            <div id="month" class="font-hairline text-6xl flex">
              <span class="text-xl mr-2 w-1/2 m-auto">Lön efter skatt</span>
              <span class="text-xs font-hairline font-light mr-1 mt-4">SEK</span>
              <span class="text-4xl w-1/2 m-auto font-black">{{ taxRate }}</span>
            </div>
            <hr />
            <div id="month" class="font-hairline text-6xl flex">
              <span class="text-lg mr-2 w-1/2 m-auto">Månadslön</span>
              <span class="text-xs font-hairline font-light mr-1 mt-1">SEK</span>
              <span class="text-base w-1/2 m-auto">{{ baseSalary }}</span>
            </div>
            <hr />
            <div id="month" class="font-hairline text-6xl flex">
              <span class="text-xl mr-2 w-1/2 m-auto">Erfarenhet</span>
              <span class="text-xs font-hairline font-light mr-1 mt-1">SEK</span>
              <span class="text-base w-1/2 m-auto">
                {{
                experiancePercentage
                }}
              </span>
            </div>
            <hr />
            <div id="month" class="font-hairline text-6xl flex">
              <span class="text-xl mr-2 w-1/2 m-auto">Skatt</span>
              <span class="text-base w-1/2 m-auto ml-6">
                {{
                taxPercentage
                }} %
              </span>
            </div>
            <submit-button
              class="hover:text-gray-900 font-bold uppercase text-xs mt-8 py-2 px-4 min-w-20 rounded cursor-pointer"
              @click="onFormSubmit()"
            >submit</submit-button>
          </div>
          <div class="text-white mt-12 text-xs text-green-600" v-if="submitted">{{ onFormSubmit() }}</div>
        </section>
      </form>
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
      onFormSubmit,
      yearsOption,
      cityOption,
      taxPercentage,
      baseSalary,
      selectedProfession,
      submitted,
      taxRate
    } = useSalary()

    return {
      experiancePercentage,
      selectedProfession,
      yearsOfExperience,
      userProfession,
      taxPercentage,
      selectedYear,
      onFormSubmit,
      selectedCity,
      yearsOption,
      baseSalary,
      cityOption,
      submitted,
      taxRate
    }
  }
})
</script>
