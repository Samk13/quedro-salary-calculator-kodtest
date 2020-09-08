import { ref, computed } from '@vue/composition-api'
import { Located, SalaryYear, Profession } from '@/types/salaryTypes'

export default function useSalary() {
  const selectedCity = ref(Located.Stockholm)
  const selectedYear = ref(SalaryYear.ThisYear)
  const yearsOfExperience = ref('')
  const cityOption = [
    { value: Located.Stockholm, label: Located.Stockholm },
    { value: Located.Gothenburg, label: Located.Gothenburg }
  ]
  const yearsOption = [
    { value: SalaryYear.Lastyear, label: SalaryYear.Lastyear },
    { value: SalaryYear.ThisYear, label: SalaryYear.ThisYear }
  ]
  const picked = ref(Profession.Programmer)
  const userProfession = [
    Profession.Programmer,
    Profession.Teacher,
    Profession.Cashier
  ]
  const baseSalary = computed(() => {
    if (picked.value === userProfession[0]) {
      return 30000
    } else if (picked.value === userProfession[1]) {
      return 27000
    } else if (picked.value === userProfession[2]) {
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
    selectedCity,
    selectedYear,
    yearsOfExperience,
    cityOption,
    yearsOption,
    picked,
    userProfession,
    baseSalary,
    experiancePercentage,
    taxRate
  }
}
