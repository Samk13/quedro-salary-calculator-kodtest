import { ref, computed } from '@vue/composition-api'
import { Located, SalaryYear, Profession } from '@/types/salaryTypes'

export default function useSalary() {
  // I can fetch from an API but it's so simple that I will go with this dead-simple approach
  // I am not going to do testing here unless you will ask for it.
  const selectedCity = ref<Located>(Located.Stockholm)
  const selectedYear = ref<SalaryYear>(SalaryYear.ThisYear)
  const yearsOfExperience = ref<string>('4')
  const taxPercentage = ref<null | number>(null)
  const submitted = ref<boolean>(false)
  const userProfession = [
    Profession.Programmer,
    Profession.Teacher,
    Profession.Cashier
  ]
  const cityOption = [
    { value: Located.Stockholm, label: Located.Stockholm },
    { value: Located.Gothenburg, label: Located.Gothenburg }
  ]
  const yearsOption = [
    { value: SalaryYear.Lastyear, label: 'Last year' },
    { value: SalaryYear.ThisYear, label: 'This year' }
  ]
  const selectedProfession = ref(Profession.Programmer)
  const baseSalary = computed(() => {
    if (selectedProfession.value === userProfession[0]) {
      return 30000
    } else if (selectedProfession.value === userProfession[1]) {
      return 27000
    } else if (selectedProfession.value === userProfession[2]) {
      return 25000
    } else return 0
  })

  const experiancePercentage = computed(() => {
    if (isNaN(parseInt(yearsOfExperience.value))) {
      return baseSalary.value
    } else if (
      parseInt(yearsOfExperience.value) >= 0 &&
      parseInt(yearsOfExperience.value) <= 3
    ) {
      return baseSalary.value
    } else if (
      parseInt(yearsOfExperience.value) > 3 &&
      parseInt(yearsOfExperience.value) <= 7
    ) {
      return (20 / 100) * baseSalary.value + baseSalary.value
    } else if (
      parseInt(yearsOfExperience.value) > 7 &&
      parseInt(yearsOfExperience.value) <= 10
    ) {
      return (40 / 100) * baseSalary.value + baseSalary.value
    } else if (
      parseInt(yearsOfExperience.value) > 10 &&
      parseInt(yearsOfExperience.value) <= 65
    ) {
      return (60 / 100) * baseSalary.value + baseSalary.value
    } else return baseSalary.value
  })

  const taxRate = computed(() => {
    if (
      experiancePercentage.value >= 36000 &&
      experiancePercentage.value <= 45000
    ) {
      taxPercentage.value = 50
      return (
        experiancePercentage.value - (50 / 100) * experiancePercentage.value
      )
    } else if (experiancePercentage.value > 45000) {
      taxPercentage.value = 70
      return (
        experiancePercentage.value - (70 / 100) * experiancePercentage.value
      )
    } else if (selectedCity.value === cityOption[0].value) {
      if (selectedYear.value === yearsOption[0].value) {
        taxPercentage.value = 30
        return (
          experiancePercentage.value - (30 / 100) * experiancePercentage.value
        )
      } else if (selectedYear.value === yearsOption[1].value) {
        taxPercentage.value = 29
        return (
          experiancePercentage.value - (29 / 100) * experiancePercentage.value
        )
      }
    } else if (selectedCity.value === cityOption[1].value) {
      if (selectedYear.value === yearsOption[0].value) {
        taxPercentage.value = 25
        return (
          experiancePercentage.value - (25 / 100) * experiancePercentage.value
        )
      } else if (selectedYear.value === yearsOption[1].value) {
        taxPercentage.value = 22
        return (
          experiancePercentage.value - (22 / 100) * experiancePercentage.value
        )
      }
    }
  })

  const onFormSubmit = () => {
    const isSubmitted = ref({
      userProfession: selectedProfession.value,
      selectedYear: selectedYear.value,
      selectedCity: selectedCity.value,
      yearsOfExperience: yearsOfExperience.value,
      taxPercentage: taxPercentage.value + '%'
    })
    submitted.value = true
    return isSubmitted.value
  }

  return {
    experiancePercentage,
    selectedProfession,
    yearsOfExperience,
    userProfession,
    taxPercentage,
    selectedYear,
    selectedCity,
    onFormSubmit,
    yearsOption,
    cityOption,
    baseSalary,
    submitted,
    taxRate
  }
}
